import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async (req, resp) => {
    const { signInEmail, signInPassword } = req.body;
    const email=signInEmail;
    try {
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return resp.status(404).json({ message: 'Invalid Credentials' });
        }
        const isPassword = await bcrypt.compare(signInPassword, existingUser.password);
        if (!isPassword) {
            return resp.status(404).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ email: existingUser.email, userId: existingUser._id }, 'transaction', { expiresIn: "1h" });
        resp.status(200).json({ profile: existingUser, token });
    }
    catch (err) {
        console.log(err.message);
        resp.status(500).json({message:'Something went wrong'});
    }
}

export const signUp = async(req,resp)=>{
    const {email,password,userName,cnfPassword}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser)
        return resp.status(400).json({message:'User already Exists'});
        
        if(password!== cnfPassword)
        return resp.status(400).json({message:'Passwords do not match'});

        const hashPassword = await bcrypt.hash(password,12);
        
        const profile = await User.create({email,password:hashPassword,userName:userName});
        const token = jwt.sign({email:profile.email,userId:profile._id},'transaction',{expiresIn:"1h"});
        resp.status(200).json({profile:profile,token});
    }
    catch(err)
    {
        console.log(err);
        resp.status(500).json({message:err.message});
    }
}