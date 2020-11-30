const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.static('css'));

app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'r11044645',
  database: 'list_app'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM talks',
    (error, results) => {
      console.log(results);
      res.render('index.ejs',{talks: results});
    }
  );
});

app.get('/',(req,res)=>{
  res.render('top.ejs');
});

app.get('/main',(req,res)=>{
  res.render('main.ejs');
});

app.post('/create', (req,res) => {
  connection.query(
  'insert into talks (talk) values (?)',
  [req.body.talksTalk],
  (error, results) => {
    res.redirect('/index');
    }
  );
});

app.listen(3000);
