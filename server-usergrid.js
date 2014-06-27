var express = require('express');
var request = require('request');
var token_generator = require('./token_generator');
var config = require('./config');

// Apigee library
var usergrid = require('usergrid');

// Set up Apigee client
var apigee = new usergrid.client(
  {
	orgName : config.organization,
	appName : config.application,
	authType : "CLIENT_ID",
	clientId : config.clientId,
	clientSecret : config.clientSecret
  }
);

var app = express();
// For local server
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies

// For Apigee server
//app.use(express.bodyParser());


// This API function accepts a Meetup token, verifies the user with Meetup,
// verifies whether the user is already registered with WhereYouAt server,
// and if not then creates a new user.
// The function returns a JSON object. When everything goes well, this object will
// contain the user Meetup ID and the unexpiring token that can be used for 
// validation with WhereYouAt server in the future.
app.post('/login', function(req, res) {
   	console.log(req.body);
	verifyWithMeetup(req.body, function(errorMsg, data) {
		if(data==null) {
			res.jsonp(500, { 'error' : errorMsg });
			return;
		}
		
		if(!data.success) {
			res.jsonp(500, {'error' : "Meetup verification failed"});
			return;
		}
		
		apigeeGetUser(data.id, function(err, apiData){
    		if (err) {
    			// User doesn't exist (trusting that Apigee doesn't fail)
    			// so we need to create a new one
        		console.log("Failed to GET user");
        		// Generate token to be used in creating the new user
				var token = token_generator.generate(32);
				
				// Make an asynchronous call to create a user
				apigeeCreateUser(data.id, data.name, token, function(err, apiData) {
					if (err) {
					    //error — POST failed
						console.log("Apigee user creation failed");
						res.jsonp(500, {'error' : "Apigee user creation failed"});
					} else {
						//success — data will contain raw results from API call
						console.log("Apigee user created successfully");
						res.jsonp(200, {success : true, id : data.id, token : token});
					}
					console.log(apiData);
				});
    		} else {
	        	console.log("Was able to GET user");
				// Get the user object from the response data
				var user = apiData.entities[0];
				res.jsonp(200, {success : true, id : user.username, token : user.token});
	    	}
		});
	});
});


// This API function accepts a Meetup token, verifies the user with Meetup
app.post('/verify', function(req, res) {
   	console.log(req.body);
	verifyWithMeetup(req.body, function(errorMsg, data) {
		if(data==null) {
			res.jsonp(500, { 'error' : errorMsg });
			return;
		}
		
		res.jsonp(200, data);
	});
});


// Verify user validity with Meetup and perform callback with the results
// First argument is an object with two fields: user_id and token
// Second argument is the callback function with two arguments: error message string and data JSON object
function verifyWithMeetup(userPost, callback) {
	if(!userPost.hasOwnProperty('token')) {
		callback("Abnormal verification request", null);
		return;
	}
	
	// Request from Meetup only the specified fields of the profile of the OAuth'd user
	var requestUrl = "https://api.meetup.com/2/member/self?only=name,id&access_token=" + userPost.token;

	request(requestUrl, function(error, response, body) {
		// Create a JS object out of the string 'body'
		jsonResponse = JSON.parse(body);
				
		// jsonResponse will only have property 'id' if Meetup found the user for the provided token
		// Just in case also make sure that user ID returned by Meetup matches that provided by user
		if(jsonResponse.hasOwnProperty('id')) {
			// User verification with Meetup was successful. Pass user id and name to callback.
			callback(null, { "success" : true, "id" : jsonResponse.id, "name" : jsonResponse.name });
		}
		else {
			// User verification failed.
			callback(null, { "success" : false });
		}
	});
}


// Function making a call to Apigee to attempt to GET an existing user
// based on the Meetup user ID AKA Apigee username.
// At this point the user ID is known from verification with Meetup.
function apigeeGetUser(userId, callback) {
	var options = {
    	method:'GET',
    	endpoint:'users/' + userId
	};
	
	apigee.request(options, function (err, data) {
		callback(err, data);
	});	
}


// Function making a call to Apigee to create a new user.
// The first argument is the Meetup user ID. It will be used as Apigee username.
// The second argument is user's actual name.
// Third argument is the random token to be saved as part of the user object,
// to be later used for validating the user.
// Last argument is the callback that takes two arguments.
function apigeeCreateUser(userId, name, token, callback) {
	console.log("Creating Apigee user");
	
	var options = {
		method:'POST',
		endpoint:'users',
		body:{ username:userId, name:name, token:token }
	};
	
	apigee.request(options, function (err, data) {
		callback(err, data);
	});
}


app.listen(1337);
console.log('Server running');

