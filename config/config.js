var path = require('path');
var rootPath = path.normalize(__dirname);

module.exports = {
    development: {
        rootPath: rootPath
        , db: 'mongodb://localhost/whereyouat2'
        , port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath
        , db: 'mongodb://whereyouat2:tvsd_20!4@ds050087.mongolab.com:50087/whereyouat2'
        , port: process.env.PORT || 80
    }



    // use below command to connect mongo shell to mongolab
    // mongo ds050087.mongolab.com:50087/whereyouat2 -u whereyouat2 -p tvsd_20!4

}