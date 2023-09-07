const router = require("express").Router();
// will need path for user model
const { User } = require();

// Create route to render view of signup page 

// Create new user
// make sure variables correspond with user model once created
router.get("/signup", async (req, res) => {
    try {
    const dbUserData = await User.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    });
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = db.UserData.id;
        res.status(200).json(dbUserData);
    });
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
});

// create view to render login page


// Login
router.post("/login", async(req,res)=>{
    try{
        const dbUserData = await User.findOne({
            where:{
                username: req.body.username
            }
        })
    }
})