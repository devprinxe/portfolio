import { conn } from "../configuration/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  conn.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json({ "success": false, "message": "User already exist" });

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    conn.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ "success": true, "message": "User registration successful" });
    });
  });
};

const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  conn.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "princemahmud");

    res
      .status(200)
      .json({'message': "Login Success","token": token});
  });
};

const profile = (req,res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, "princemahmud", (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      const q = "SELECT * FROM users WHERE id = ?";
      conn.query(q, [decoded.id], (err,results) => {
        if(err) throw err;
        const specificData = results.map((row) => ({
          id: row.id,
          username: row.username,
          email: row.email
        }));

        res.status(200).json({"sucsess": true,"message": "Profile get successfully","data": specificData});
      })
      
    });
  } else {
    res.sendStatus(401);
  }
  
}

const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
};

export { register, login, logout, profile };