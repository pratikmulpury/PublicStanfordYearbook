const express = require('express');
const router = express.Router();

const db = require('../database/db')



// set up google oauth2client
const {OAuth2Client} = require('google-auth-library');

// use to generate secret key
var crypto = require('crypto');

// client secret: big sus to store it here but w/e
const client = new OAuth2Client('481852567239-rnkn002124j78ii2ibtrcu9b44rnvrh1.apps.googleusercontent.com');

// set up json web token used for authentication
var jwt = require('jsonwebtoken');
//const secretKey = crypto.randomBytes(48).toString('hex');
//for dev purposes
const secretKey = 'hello';


// Api for logging in
router.post('/login', function(req, res) {

  var token = req.body.token;

  async function verify() {

    // use gapi to parse idtoken from succesful google account signin
    // change ticket to const later
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '481852567239-rnkn002124j78ii2ibtrcu9b44rnvrh1.apps.googleusercontent.com',  // CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    //check new user
    let newUser = true
    let user = null

    db.query('select * from Users where userUID = ?;', userid,  (err, result) => {
      if(err)
        res.status(500).send({error: 'Database Error'});
      else{

        var rows = JSON.parse(JSON.stringify(result))

        //if length is zero then didnt find anything
        if( rows.length === 0){
          newUser = true;
        } else {
          newUser = false;
          user = rows[0]
        }
      }
        
      // console.log(err)
      // console.log(result)

      const givenName = payload['given_name'];
      const familyName = payload['family_name']
      const email = payload['email'];
      const domain = email.split('@')[1];

      //const domain = payload['hd'];

      // if domain is stanford we're good, also alllowing gmail for now
      if(domain === 'stanford.com' || domain === 'gmail.com')
      {
        // jwt token expires in 1 hour
        var jwttoken = jwt.sign({
          data: userid
        }, secretKey, { expiresIn: 60*60  });

        if(newUser === true){
          user = {
            userUID: userid,
            firstName: givenName,
            lastName: familyName,
            email: email,
            dorm: '',
            major: '',
            imgBlob: ''
          }
        }
        
        //new is the parameter that will be checked by database to see if already loggedin or not
        res.send({token: jwttoken, newUser: newUser, user: user})
      }
      else{
        // no token issued for google users who are not member of correct google groups
        res.send(false)
      }

    })
    

  }
  verify().catch(console.error);
});





// Api for registering in
router.post('/register', function(req, res) {

    var jwttoken = req.body.token || req.query.token || req.headers['x-access-token'];

    if(jwttoken){
        //Decode the token
        jwt.verify(jwttoken,secretKey,(err,decoded)=>{
        if(err){
            // not a valid jwttoken
            res.send(false)
        }
        else{
            // valid jwttoken
            
            const user = req.body.user
            console.log(user);

            
            //insert into user query goes here. Send true or false based on database response
            if(user === null || user === undefined){

              res.send(false)

            }
            else{
              
              //create user
              db.query('INSERT INTO Users SET ?', user,  (error, result) => {
                if(err)
                  res.send(false)
                else {

                  //on success create board, avoiding multiple sql statements in one for SQL Injection attacks
                  const board = {
                    boardOwnerUID: user.userUID
                  }

                  //add to boards table
                  db.query('INSERT INTO Boards SET ?', board, (error, result) => {

                    if(error)
                      res.send(false)
                    else
                      res.send(true)

                  })

                }
                  
                //console.log(err)
                //console.log(result)
            });

          }
        }
        });
    }
    else{
        res.send(false);
    }

  });


// Api for registering in
router.post('/comment', function(req, res) {

    var jwttoken = req.body.token || req.query.token || req.headers['x-access-token'];

    if(jwttoken){

        const response = {
          posted: false,
          comment: {}
        }

        //Decode the token
        jwt.verify(jwttoken,secretKey,(err,decoded)=>{

            if(err){
                // not a valid jwttoken
                res.send(response)
            }
            else{
                // valid jwttoken
                
                let comment = req.body.comment

                // hacking check. should be fine if client is not tampered
                if(comment.messageContent === null || comment.messageContent === undefined || comment.messageContent === '') {
                  res.send(response)
                  return; //this return is important
                }

                const decoded = jwt.decode(jwttoken)
                const commenterUID = decoded.data

                // find user first based on commenterID
                db.query('select * from Users where userUID = ?;', commenterUID, (error, result) => {

                    if(error) {

                        res.send(response)

                    } else {

                        var rows = JSON.parse(JSON.stringify(result))

                        const commenter = rows[0]
                        const commenterName = commenter.firstName + ' ' + commenter.lastName.charAt(0) + '.'

                        //set commenter name here for safety. Honestly this is a big trap for hackers.
                        comment.commenterUID = commenterUID;
                        comment.commenterName = commenterName;

                        // insert into message based on comment
                        db.query('INSERT INTO Messages SET ?;', comment , (error, result) => {

                            if(error) {

                              res.send(response)

                            } else {

                              response.commenterName = ''; //not his own board so remove data

                              response.posted = true;
                              response.comment = comment;
                              
                              res.send(response);
            
                            }

                        })

                    }
                    

                })

                

            }
        });
    }
    else{
        res.send(false);
    }

});





// // Returns true if its given a valid google access token
// router.post('/isvalidtoken', (req, res) => {

//   var jwttoken = req.body.token || req.query.token || req.headers['x-access-token'];

//   if(jwttoken){
//     //Decode the token
//     jwt.verify(jwttoken,secretKey,(err,decoded)=>{
//       if(err){
//         // not a valid jwttoken
//         res.send(false)
//       }
//       else{
//         // valid jwttoken
//         res.send(true)
//       }
//     });
//   }
//   else{
//     res.send(false);
//   }

// })





router.get('/someApi', (req, res) => {
  var count = 0;
  var jwttoken =  req.body.token || req.query.token || req.headers['x-access-token'];
  if(jwttoken)
  {
    //decode the token
      jwt.verify(jwttoken,secretKey,(err,decod)=>{
      // invalid token

      if(err){
        res.status(403).json(
            {
                body:[],
                message: 'Invalid Token'
            }

        )
      }
      //
      else{
        res.status(200).json(
            {
                body:[],
                message: 'Success'
            }
        )
      }
  });
  }
  else{
    res.status(403).json({
        body:[],
      message:"No Token"
    });
  }
})


module.exports = router;