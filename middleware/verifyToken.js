//var jwt = require('jsonwebtoken'); 

import jwt from "jsonwebtoken";

const verifyToken=function (req, res,next) 
{
	var token = req.body.token || req.query.token || req.headers['token'];

	 if (token) 
	 {
		// verify secret and checks exp
		jwt.verify(token,'manish_key', function (err, currUser) 
		{
			if (err) 
			{
				//console.log('yes');
				res.send(err);
			} else {				
				req.currUser = currUser;
				next();
			}
		});
	}
	 else {
	    res.status(401).json({ success: '0', message: 'Invalid Access.. Token Expaired'});     
	}
};

//module.exports=verifyToken;

export default verifyToken;