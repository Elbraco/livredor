let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'livredor'
});

connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql Connected');
})

module.exports = connection