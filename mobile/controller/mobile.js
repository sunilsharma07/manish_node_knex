var crypto = require('crypto');
var util = require('util');
var async = require('async');
var multiparty = require("multiparty");
var fs = require('fs');
var http = require('http');
var url = require('url');
var mysql = require('mysql');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var md5 = require("MD5");
var dateTime = require('date-time');
var path = require('path');
var Promise = require('bluebird');
var _ = require('underscore');
var config_mysql = rootRequire('config/global_mysql.js');
var knex = require('knex')(config_mysql);



function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
// get host name
function get_hostname(req) {
    var hostname = req.headers.host;
    return hostname;
}

function findAndReplace(string, target, replacement) {
    var i = 0, length = string.length;
    for (i; i < length; i++) {
    string = string.replace(target, replacement);
    }
    return string;
}

function arrayToString(arr) {
  let str = '';
  arr.forEach(function(i, index) {
    str += i;
    if (index != (arr.length - 1)) {
      str += ',';
    };
  });
  return str;
}

var mobile = {

    login : function(req, res, next)
    {
        req.checkBody('email', 'Email does not appear to be valid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            return res.status(202).json({ success: '0', message: errors, data: {} });
        }

          var search_obj = {};
          search_obj.email = req.body.email;
          search_obj.password = crypto.createHash('md5').update(req.body.password).digest('hex');

          knex.select('id','email','mobile').from('users').where(search_obj).then(function(records){

             if (isEmpty(records))
             {
                return res.status(202).json({ success: '0', message: 'Invalid Email or Password.', data: {} });
             }

                        var manish_simple = {
                                id:records[0]['id'],
                                email:records[0]['email'],
                                mobile:records[0]['mobile']          
                           };

                    var token = jwt.sign(manish_simple,'manish_key', 
                    {
                         expiresIn: 24600
                    });  

                var current_user_id = records[0].id;    

               return res.status(200).json({ success: '1', message: 'Token generated',currUser:current_user_id,token:token});     
                    
          }).catch(function(err){   
             return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
          }); 
    },

    add_user : function(req,res,next)
    {
         var userData = {};

           async.series([
               function (callback) {
                var form = new multiparty.Form();
                 form.parse(req, function(err, fields, files) 
                 {

                          fields = fields || [];

                          for (var key in fields) {
                              if (fields[key].length === 1) 
                              {
                                  fields[key] = fields[key][0];
                              }
                          }

                          req.body = fields;
                          req.files = files;

                          req.checkBody('email', 'Email does not appear to be valid').isEmail();
                          req.checkBody('password', 'Password is required').notEmpty();
                          req.checkBody('gender', 'Gender is required').notEmpty();

                           if(req.body.password!='')
                           {
                             req.checkBody('password', 'Password is minimum lenght 5 is required').isLength({ min: 5 });  
                           }
                          

                      var err_check = req.validationErrors();                        
                      if(err_check)
                      {
                           return res.status(202).json({success:'0',message: err_check,data:{} });
                      }

                      userData.name = req.body.name;
                      userData.email = req.body.email;
                      userData.mobile = req.body.mobile;
                      userData.password = crypto.createHash('md5').update(req.body.password).digest('hex');
                      userData.device_id = req.body.device_id;
                      userData.device_type = req.body.device_type;

                      if(req.body.status=='')
                      {
                        userData.status = "0";  
                      }
                      else{
                         userData.status = req.body.status;  
                      } 
                      
                      userData.gender = req.body.gender;
                      userData.created = dateTime();
                      userData.modified = dateTime();


                     callback();
                });

               },
               function (callback) 
               {
                  var email_checker = userData.email;

                   knex('users').count('id as total_record').where('email',email_checker).then(function(record){
                        if(record[0]['total_record']==0)
                        {
                            callback();
                        } 
                        else{
                           return res.status(202).json({ success: '0', message: 'Email already registered', data: {} }); 
                        }

                  }).catch(function(err){           
                     return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                  });


               }, 
               function (callback) 
               {

                   if(!isEmpty(req.files))
                   {
                       var custom_image = req.files;

                       //var image_name_change = new Date().getTime() + findAndReplace(custom_image.file[0]['originalFilename']," ","_"); 
                       
                      var image_name_change = new Date().getTime()+path.extname(custom_image.file[0]['originalFilename']);
                       var image_temp_path = custom_image.file[0]['path'];

                       //console.log(path.extname(custom_image.file[0]['originalFilename']));

                          fs.readFile(image_temp_path,function(errr,data1){
                             var image_physical_path = './public/uploads/user/' + image_name_change;

                            fs.writeFile(image_physical_path,data1,function(error){
                                  if(error)
                                  {
                                     console.log(error);  
                                  }
                            }); 
                          }); 
                         userData.user_image =  image_name_change; 
                   }

                   callback(); 
               },
               function (callback) 
               {   
                    knex('users').insert(userData).then(function(record)
                    {
                        userData.last_inserted_id = record[0].toString(); 
                        callback();

                    }).catch(function(err){
                        return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                    });



               },
               function (callback) {
                  
                   if(!isEmpty(req.files))
                  {
                     userData.user_image_link = 'http://' + get_hostname(req) + '/uploads/user/' + userData.user_image;
                     delete userData.user_image;
                  }  
                  else{
                      userData.user_image_link = '';
                      delete userData.user_image;
                  } 
                 callback();
               },  

            ],
          function (err, result) 
          {
               return res.status(200).json({ success: '1', message: 'Registration Successfully',data:userData });
          });

    },
    
    edit_user : function(req,res,next)
    {
         var userData = {};
          async.series([

              function (callback)
              {
                var form = new multiparty.Form();
                
                form.parse(req, function(err, fields, files) {

                    fields = fields || [];

                    for (var key in fields) {
                        if (fields[key].length === 1) {
                            fields[key] = fields[key][0];
                        }
                    }

                    req.body = fields;
                    req.files = files;
                    req.checkBody('email', 'Email does not appear to be valid').isEmail();
                    req.checkBody('user_id','User Id is required').notEmpty();

                    var errors = req.validationErrors();

                    if (errors) 
                    {
                        return res.status(202).json({ success: '0', message: errors, data: {} });
                    }
                    callback();  

                });   
                

              },
              function (callback)
              {
                  
                 knex('users').count('id as total_record').where('id',req.body.user_id).then(function(record){
                        if(record[0]['total_record']==1)
                        {
                            callback();
                        } 
                        else{
                           return res.status(202).json({ success: '0', message: 'That User Id Not Exists Our System !', data: {} });
                        }

                  }).catch(function(err){           
                     return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                  });


              },             
              function(callback)
              { 
                  var unique_id = req.body.user_id; 

                    knex.select('user_image').from('users').where('id',unique_id).then(function(record)
                      {
                           userData.user_image_name = record[0]['user_image'];
                            callback();
                          
                      }).catch(function(err)
                      {           
                         return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                      });

              },
              function (callback)
              {

                  if(!isEmpty(req.files))
                  {
                      // it mean upload image also set it 
                      var custom_image = req.files;
                     
                     var image_name_change = new Date().getTime()+path.extname(custom_image.file[0]['originalFilename']); 
                     var image_temp_path = custom_image.file[0]['path'];

                        fs.readFile(image_temp_path,function(errr,data1)
                        {
                           var image_physical_path = './public/uploads/user/' + image_name_change;
                                
                          fs.writeFile(image_physical_path,data1,function(error){
                                if(error)
                                {
                                   console.log(error);  
                                }
                          }); 
                        }); 
                       userData.user_image =  image_name_change; 

                       // remove file 
                         if(userData.user_image_name!="")
                         {
                            var file_delete_path = './public/uploads/user/'+userData.user_image_name;

                              fs.unlink(file_delete_path, function(error) {
                                    if (error) {
                                        console.log(error);
                                    }                                  
                               });
                         }
                  }
                  else{
                       // It is we are not change anything.
                       userData.user_image =  userData.user_image_name; 
                  }
                  callback();
              },
               function (callback)
              {
                var unique_id = req.body.user_id; 
                userData.email = req.body.email;
                userData.mobile = req.body.mobile;
                userData.status = req.body.status;  
                userData.name = req.body.name;
                userData.gender = req.body.gender;
                userData.device_id = req.body.device_id;
                userData.device_type = req.body.device_type;                
                var image_name = userData.user_image;


                var update_record_only = {};

                update_record_only.email = req.body.email;
                update_record_only.mobile = req.body.mobile;
                update_record_only.status = req.body.status;  
                update_record_only.name = req.body.name;
                update_record_only.gender = req.body.gender;
                update_record_only.device_id = req.body.device_id;
                update_record_only.device_type = req.body.device_type; 
                update_record_only.user_image = image_name;


                knex('users').where('id',unique_id).update(update_record_only).then(function(record)
                  {
                       callback();

                  }).catch(function(err){
                     return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                  });


              },
          ],function(err,result){

              if(err)
              {
                  return res.status(202).json({success:'0',message:err,data:{}});
              }

              return res.status(200).json({ success: '1', message: "Profile has been update successfully"});               

          }); 
    },

    delete_user : function(req,res,next)
    {
         var unique_id = req.params.id;

          knex('users').where('id',unique_id).del().then(function(record){
                 if(record>0)
                 {
                    return res.status(200).json({ success: '1', message: 'Delete record Successfully'});      
                 }
                else{
                    return res.status(202).json({ success: '0', message: 'That record not exists !'});
                } 
              
          }).catch(function(err){
             return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
          }); 
    },
     
    
    list_user_search : function(req,res,next)
    {

          var numRows;
          var queryPagination;
          var numPerPage = parseInt(req.body.npp, 10) || 1;
          var page = parseInt(req.body.page, 10) || 0;
          var numPages;
          var skip = page * numPerPage;
           
          var limit = skip + ',' + numPerPage;

          knex('users').count('id as numRows').then(function(results)
            {
                  numRows = results[0].numRows;
                  numPages = Math.ceil(numRows / numPerPage);

                  var searchData = {};
                  var query = knex.select().from('users');

                  if(req.body.name!="")
                  {
                     query.orWhere('name','=',req.body.name);
                  } 

                  if(req.body.email!="")
                  {
                     query.orWhere('email','=',req.body.email);
                  }

                  if(req.body.mobile!="")
                  {
                     query.orWhere('mobile','=',req.body.mobile);
                  }

                  query.orderBy('id','desc').limit(numPerPage).offset(skip);

                 query.then(function(custom_record){

                      _.each(custom_record, function(value,key)
                          {
                             if(value['user_image']!="")
                              {
                                    var path = 'http://' + get_hostname(req) + '/uploads/user/' + value['user_image'];    
                                    var image_physical_path = './public/uploads/user/' + value['user_image'];
                                    value['user_image'] = path;
                              }
                          });

                  var responsePayload = {
                          results: custom_record
                        };

                      if (page < numPages) 
                        {
                          responsePayload.pagination = {
                            current: page,
                            perPage: numPerPage,
                            previous: page > 0 ? page - 1 : undefined,
                            next: page < numPages - 1 ? page + 1 : undefined
                          }
                        }
                        else responsePayload.pagination = {
                          err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                        }
                        return res.json(responsePayload);    


                 }).catch(function(err){
                        return res.json({ err: err });
                 });   

                }).catch(function(err){           
                   return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                });

    },

    list_user_pagination:function(req,res,next)
    {
          var numRows;
          var queryPagination;
          var numPerPage = parseInt(req.query.npp, 10) || 1;
          var page = parseInt(req.query.page, 10) || 0;
          var numPages;
          var skip = page * numPerPage;
           
           var limit = skip + ',' + numPerPage;

             knex('users').count('id as numRows').then(function(results)
              {
                  numRows = results[0].numRows;
                  numPages = Math.ceil(numRows / numPerPage);

                  knex.select().from('users').orderBy('id','desc').limit(numPerPage).offset(skip).then(function(custom_record){

                     _.each(custom_record, function(value,key)
                      {
                         if(value['user_image']!="")
                          {
                                var path = 'http://' + get_hostname(req) + '/uploads/user/' + value['user_image'];    
                                var image_physical_path = './public/uploads/user/' + value['user_image'];
                                value['user_image'] = path;
                          }
                      }); 


                   var responsePayload = {
                          results: custom_record
                        };


                     if (page < numPages) 
                        {
                          responsePayload.pagination = {
                            current: page,
                            perPage: numPerPage,
                            previous: page > 0 ? page - 1 : undefined,
                            next: page < numPages - 1 ? page + 1 : undefined
                          }
                        }
                        else responsePayload.pagination = {
                          err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                        }
                        return res.json(responsePayload);   

                  }).catch(function(err){
                        //console.log(err);
                        return res.json({ err: err });
                  });


                }).catch(function(err){           
                   return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                });

    },

    list_user_search_example : function(req,res,next)
    {

        var searchData = {};
        var query = knex.select().from('users');
        if(req.body.name!="")
        {
           query.orWhere('name','=',req.body.name);
        } 

        if(req.body.email!="")
        {
           query.orWhere('email','=',req.body.email);
        }

        if(req.body.mobile!="")
        {
           query.orWhere('mobile','=',req.body.mobile);
        } 


          query.then(function(record)
           {  
                return res.status(202).json({ success: '1', data:record});

          }).catch(function(err){
             return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: err });
          });


    }, 

    emp_add : function(req,res,next)
    {

        console.log(req.body);

         var employee = {};
         employee.full_name = req.body.FullName;
         employee.position = req.body.Position;
         employee.emp_code = req.body.EMPCode;
         employee.mobile = req.body.Mobile;
         employee.created = dateTime();


            knex('employee').insert(employee).then(function(record){

                   var last_id = record[0].toString(); 

                 return res.status(200).json({ success: '0', message: 'added record successfully', data: {'last_id':last_id}});

             }).catch(function(err){
                 return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
             });

              

    },

    emp_list : function(req,res,next)
    {

         var query = knex.select().from('employee');
           query.then(function(record){
              return res.json(record); 
           }).catch(function(err){

             return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });

           });
    },
    emp_update : function(req,res,next)
    {
         var unique_id = req.body.Emp_id;
          var update_record = {};

           update_record.full_name = req.body.FullName;
           update_record.position = req.body.Position;
           update_record.emp_code = req.body.EMPCode;
           update_record.mobile = req.body.Mobile;
           update_record.created = dateTime();

            knex('employee').where('id',unique_id).update(update_record).then(function(record)
                  {
                      return res.status(200).json({ success: '0', message: 'Update record successfully', data: {}}); 

                  }).catch(function(err){
                     return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
                  });

    },
    emp_delete : function(req,res,next)
    {

        var unique_id = req.params.id;

          knex('employee').where('id',unique_id).del().then(function(record){
                 if(record>0)
                 {
                    return res.status(200).json({ success: '1', message: 'Delete record Successfully'});      
                 }
                else{
                    return res.status(202).json({ success: '0', message: 'That record not exists !'});
                } 
              
          }).catch(function(err){
             return res.status(202).json({ success: '0', message: 'Something Went Wrong', data: {} });
          }); 

    }
 
};

module.exports = mobile;
