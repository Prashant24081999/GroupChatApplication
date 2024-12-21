const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const loginRoute = require("./routes/login");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readFile("messages.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat exists";
    }
    res.send(`
            
            <html>
                <body>
                ${data}
                <form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                    <label for="msg">Message:</label>
                    <input type="text" id="msg" name="msg">
                    <input type="hidden" id="username" name="username">
                    <button type="submit">Send</button>
                </form>    
                </body>
            </html>
        `);
  });
});

app.post("/", (req, res) => {
  const username = req.body.username;
  const msg = req.body.msg;
  console.log(username, msg);
  const data = `${username}: ${msg}, `;
  console.log(data);
  fs.writeFile("messages.txt", data, { flag: "a" }, (err) => {
    err ? console.log(err) : res.redirect("/");
  });
});

app.use(loginRoute);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000);
