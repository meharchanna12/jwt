const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "mehar@gmail.com",
    password: "123",
    name: "mehar channa",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya"
  },
];

function userExists(username, password) {
  
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].username == username && ALL_USERS[i].password == password)
    {
        return true;
    }
  }
  return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, "123456");
  console.log(token);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  console.log(token);
  const decoded = jwt.verify(token, "123456");
  const username = decoded.username;
  res.json({
    users : ALL_USERS
  })
});

app.listen(3000);
