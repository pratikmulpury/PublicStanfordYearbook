const mysql = require('mysql')

// values are dummy stuff replace with your own DB :)))))
// need to run this for old SQL authentication. Nodejs authentication does not supoort it yet.
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
//
// Assuming root is the name of your user. (I think thats how it works) and password needs to be db password
// Next execute this command please
//
// flush privileges;
//
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'main'
});

connection.connect((err) => {
    if (err) 
        throw err;
    console.log('Database Connected!');
});

module.exports = connection;