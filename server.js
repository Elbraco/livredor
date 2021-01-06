let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');

//Moteur de template
app.set('view engine', 'ejs');

//Middleware

//Dosser static
app.use('/assets', express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(session({
    secret: 'coucout',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(require('./middlewares/flash'));



app.get('/', (req, res) => {
    let Message = require('./models/message')
Message.all(function (messages) {
    res.render('pages/index', {messages: messages} )


})
    // console.log(req.session.error);
    //  res.render('pages/index', {test : 'salut les boug'} )
});

// Routes
app.post('/', (req,res) => {
    if(req.body.message === undefined || req.body.message === '') {
        req.flash("error", " vous n'avez pas posté de message");
        res.redirect('/');
    } else {
        let Message = require('./models/message')
        Message.create(req.body.message, function() {
            req.flash('success', 'Merci')
            res.redirect('/')

        })
    }


    console.log(req.body);
})

app.listen(8080);