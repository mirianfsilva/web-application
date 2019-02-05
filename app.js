var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user"),
    Client        = require("./models/client"),
    seedDB        = require("./seeds");

mongoose.connect("mongodb://localhost:27017/bank-data",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Ops!",
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

//INDEX - show all clients
app.get("/clients", isLoggedIn, function(req, res){
    // Get all clients from DB
    Client.find({}, function(err, allClients){
        if(err){
            console.log(err);
        } else {
            res.render("clients/index",{clients:allClients});
       }
    });
});

//CREATE - add new client to DB
app.post("/clients", isLoggedIn, function(req, res){
    // get data from form and add to clients array
    var name    = req.body.name;
    var age     = req.body.age;
    var email   = req.body.email;
    var account = req.body.account;
    var money   = req.body.money;
    
    var newClient = {name: name, age: age, email:email, account: account, money:money}
    // Create a new client and save to DB
    Client.create(newClient, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to clients page
            res.redirect("/clients");
        }
    });
});

//NEW - show form to create new client
app.get("/clients/new", isLoggedIn,  function(req, res){
   res.render("clients/new"); 
});

// SHOW - shows more info about one client
app.get("/clients/:id", function(req, res){
    //find the client with provided ID
    Client.findById(req.params.id).populate("info").exec(function(err, foundClient){
        if(err){
            console.log(err);
        } else {
            console.log(foundClient);
            //render show template with that campground
            res.render("clients/show", {client: foundClient});
        }
    });
});

//root route
app.get("/", function(req, res){
    res.render("main");
});

//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/clients"); 
        });
    });
});

//show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/clients",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Bank Simulation has started!");
});