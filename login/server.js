const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = 3000;
const usersFile = path.join(__dirname, "users.json");
app.use(express.json());
app.use(express.static(__dirname));
function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
  } catch {
    return [];
  }
}
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }
    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail,
    );
    if (emailExists) {
      return res
        .status(409)
        .json({ message: "This email is already registered." });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      email: normalizedEmail,
      password: passwordHash,
    };
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while registering." });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
