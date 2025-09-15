import User from "../models/User.js";
import jwt from "jsonwebtoken";

export function signup(req, res) {
    const { FullName, UserName, Email, Password } = req.body;

    try {
        if (!email || !password || !FullName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (Password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }   
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser =  User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }  
        const index = Math.floor(Math.random()*100) + 1; //generate random number between 1 and 100 
        const profilePic = `https://avatar.iran.liara.run/public/${index}.png`;
        const newUser = new User({ FullName, UserName, Email, Password, ProfilePic: profilePic });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('jwt', token, {
          maxAge: 24 * 60 * 60 * 1000, // 1 day 
            httpOnly: true,//prevent xss attacks
             sameSite: 'strict', //csrf protection
             secure: process.env.NODE_ENV === 'production'//set secure flag in production
        })
        res.status(201).json({ success:true,  user: newUser, token });
    } catch (error) {
        
    }
 }

export function login(req, res) {
   res.send("Login Route");
 }  

export function logout(req, res) {
    res.send("Logout Route");
}
