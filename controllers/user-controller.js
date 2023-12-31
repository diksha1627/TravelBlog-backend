const User  = require("../model/User");
const bycrpt = require( "bcryptjs");
module.exports.getAllUsers = async(req,res,next)=> {
    let users;
    try{
        users = await User.find();
    } catch(err) {
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message: "No Users Found"});
    }

    return res.status(200).json({users});
}

module.exports.signup = async (req,res,next) =>{

    const { name, email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
      return  console.log(err);
    }

    if(existingUser){
        return res.status(200).json({message: "User Already Exists! Login Instead"});
    }
    const hashedPassword = bycrpt.hashSync(password);

    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs: [],
    });
     

    try {
       await user.save()
    } catch (err) {
       return console.log(err);
    }

    return res.status(201).json({user})
}

module.exports.login = async (req,res,next)=>{

    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
      return  console.log(err);
    }

    if(!existingUser){
  return res.status(200).json({message: "Coudnt find user by this email"});
    }
     
    const isPasswordCorrect = bycrpt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(200).json({message: "Incorrect Password"});
    }
    return res.status(200).json({message: "Login Successfull" , user: existingUser } );
}