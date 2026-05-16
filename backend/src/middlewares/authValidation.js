import HTTPError from "../utils/HTTPError.js";
export const validateRegister =(req,res,next)=>{
    const {name,email,password,confirmPassword} = req.body;
    if(!name||!email||!password){
        return next(new HTTPError("All fields are required",400));
    }
    if(password.length<8){
        return next(new HTTPError("Password must be at least 8 characters long",400));
    }
    if(password!==confirmPassword){
        return next(new HTTPError("password and confirm password do not match",400));
    }
    next();
};

export const validateLogin =(req,res,next)=>{
    const{email,password} = req.body;
    if(!email||!password){
        return next(new HTTPError("Email and password are required",400));
    }
    next();
};