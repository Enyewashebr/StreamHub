export function signup(req, res) {
    const { FullName, UserName, Email, Password } = req.body;
 }

export function login(req, res) {
   res.send("Login Route");
 }  

export function logout(req, res) {
    res.send("Logout Route");
}
