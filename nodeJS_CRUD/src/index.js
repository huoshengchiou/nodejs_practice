const express = require('express');
const app = express();

const url = require('url');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})
const moment = require('moment-timezone');
const session = require('express-session');
const db = require(__dirname + '/_connect_db');
const multer = require('multer');
const uploadFolder = multer({dest: 'tmp_upLoads/'})

const fs = require('fs');
const cors = require('cors');






const whitelist = [
    // undefined是由於有時候3000會判斷成undefined
    'http://localhost:63342',
    'http://localhost:3000',
    'http://localhost:5500',
    // domain是認字串，不同就是不同台主機
    'http://127.0.0.1:5500',
    undefined,
];

const corsOptions = {
    credentials: true,
    origin: function(origin, callback){
        console.log('origin:', origin);
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true); // 允許
        } else {
            callback(null, false); // 不允許
        }
    }
};
app.use(cors(corsOptions));








// 設定ejs及其路徑
app.set('view engine', 'ejs');
// app.set('views', __dirname + '../views');

console.log(__dirname);


// top-level middle

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(session({
    // 定義儲存位置
    saveUninitialized: false,
    // 沒變更內容是否強制回存 
    resave: false,
    // 自訂加密字串
    secret: 'skdfjhdksfj',
    // cookie存活時間
    cookie: {
        maxAge: 1200000,
        sameSite: false
    }
}));



app.use((req, res, next)=>{
    res.locals.loginEmail = req.session.loginEmail || false;
    res.locals.loginNick = req.session.loginNick || false;
    res.locals.loginData = req.session.loginData || false;
    next();
});

app.use('/tandem-login', require(__dirname+'/routers/login.js') );




// app.use('/tandem/login', require(__dirname+'/routers/login-test') );


app.get('/', (req, res) => {

    console.log(req.body);
    const a = {name:"sheng"};
     res.json(a);
    // res.render('test.ejs',{name:'sheng'});

});


app.use(express.static(__dirname + '/../public'));


// 404
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - 找不到網頁');
});


app.listen(3000, () => {
    console.log('Sever 3000 start!');
});