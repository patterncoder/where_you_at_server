

# where_you_at_server
Chris is here.


## Usage

Run locally by typing "node server-usergrid.js". Or deploy to Apigee by creating all the js scripts in your Node.js-based API proxy.
When running locally you'll need to install the following Node modules: express, request, usergrid, body-parser, crypto. All of these modules are already pre-installed on Apigee Edge platform, so you don't need to care about them.

You'll need to add the file "config.js" into the root directory, which would contain the authorization info for the Apigee app used for data storage. The content of config.js should be as follows:

exports.organization = "YOUR_ORG_NAME"
exports.application = "YOUR_APP_NAME"
exports.clientId = "APP_SERVER_CLIENT_ID"
exports.clientSecret = "APP_SERVER_CLIENT_SECRET"



## Developing



### Tools
