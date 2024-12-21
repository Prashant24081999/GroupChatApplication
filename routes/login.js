const express = require("express");
const fs = require("fs");

const app = express();
const router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    `<html><body><form action="/login" method="POST" onsubmit="localStorage.setItem('username',document.getElementById('username').value)"><label for="username">Username: </label><input type="text" name="username" id="username"><button type="submit">Submit</form></body></html>`
  );
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  console.log(username);
  res.redirect("/");
});

module.exports = router;
