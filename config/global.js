module.exports = {
  'PROJECT_NAME': 'Test',
  'PORT': 7021,
  'apiVersion': 'v1',

  //'appHost': 'http://202.131.117.92:7021',
  //'apiHost': 'http://202.131.117.92:7021/v1',

  'appHost': 'http://localhost:3000',
  'apiHost': 'http://localhost:3000/v1',

  'setNewPasswordLink': 'http://202.131.117.92:7021/admin/#/setPassword/',

  'database': {
    'mongoURL': 'mongodb://localhost:27017/chess',
    'mySQLConfig': {
      'connectionLimit': 10, // Max. connection limit
      'host': 'localhost', // DB Hostname
      'user': 'root', // DB username
      'password': '', // DB Password
      'database': '' // DB name
    },
    'use': 'mongodb' // specify db =>  mongodb , mysql
  },

  'jwtTokenVerificationEnable': true, // true/false
  'secret': '#xCode*', // jwt secret key

  'cryptoEnable': false, // To enable this method
  'cryptoKey': 'xCode2017@!secureAcc$ess', // Secret encryption key
  'cryptoIV': 'a2xhcgAAAAAAAAAA', // Secret encryption IV

  'socket': {
    'enable': false
  },

  'mailOptions': {
    'host': 'smtp.1and1.com',
    'secureConnection': false, // use SSL
    'port': 587, // port for secure SMTP
    'auth': {
      'user': '',
      'pass': ''
    }
  },

  'notification': { // Push Notificatoin
    'enable': false, // enable/disable notification
    'androidApiKey': '' // android api key
  },

  'adminEmail': '',

  'adminAuthentication': {
    'enable': true
  },
  'activityLevel': {
    'sedentory': 0,
    'active': 10000,
    'veryActive': 13000,
    'superActive': 15000
  }
}