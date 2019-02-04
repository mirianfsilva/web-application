var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Client  = require("./models/client")

mongoose.connect("mongodb://localhost:27017/bankdata",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// =========================
// PASSPORT CONFIGURATION 
// =========================
app.use(require("express-session")({
    secret: "Once again!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.get("/", function(req, res){
    res.render("main");
});

//INDEX - show all clients
app.get("/clients", function(req, res){
    // Get all clients from DB
    Client.find({}, function(err, allClients){
       if(err){
           console.log(err);
       } else {
          res.render("index",{clients:allClients});
       }
    });
});

//CREATE - add new client to DB
app.post("/clients", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var accountNumber = req.body.number;
    var newClient = {name: name, age: age, email:email, number: accountNumber}
    // Create a new campground and save to DB
    Client.create(newClient, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/clients");
        }
    });
});

//NEW - show form to create new client
app.get("/clients/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Bank Simulation has started!");
});