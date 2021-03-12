const express = require('express');
const router = express.Router();

const db = require('../database/db')

// Returns true if its given a valid google access token
router.post('/details', (req, res) => {

  const id = req.body.id;

  let response = {
      id: '',
      valid: false,
      user: {},
      messages: {}
  }

  if(id === null || id === undefined)
    res.send(response)

  var query = db.query('select * from Users where userUID = ?;', id,  (err, result) => {
    if(err)
      res.send(response);
    else{

      var rows = JSON.parse(JSON.stringify(result))

      //if length is zero then didnt find anything
      if( rows.length === 0){
        res.send(response)
      } else {

        response.id = id
        response.valid = true
        response.user = rows[0]

        //res.send(response)

        //use this to send data after 5 second
        setTimeout(function () {
            res.send(response)
        }, 5000);
        
      }

    }

  })

  //console.log(query);

})

module.exports = router