import express from 'express';
import dotenv from 'dotenv';

dotenv.config();




 const app  = express();
const PORT = process.env.PORT;

 app.get('/api/auth/signup', (req, res) => {
    res.send('Signup Route');
 });
 app.get("/api/auth/login", (req, res) => {
   res.send("Login Route");
 });
 app.get("/api/auth/logout", (req, res) => {
   res.send("Logout Route");
 });
 app.get("/dashboard", (req, res) => {
   res.send("dashboard page");
 });
 app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
 });
