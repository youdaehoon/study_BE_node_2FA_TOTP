const express = require("express");
const cor = require("cors");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

require("dotenv").config();

console.log();
const server = express();
const routes = express.Router();

server.use(cor());
server.use(express.json());
server.use(routes);

routes.get("/register", async (req, res) => {
  const { id, password } = req.body;
  // 회원이맞으면, 등록시켜준다.
  let result = {};

  var secret = speakeasy.generateSecret({
    length: 10,
    name: process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
  });
  console.log(secret);
  QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
    console.log(data_url);

    // Display this data URL to the user in an <img> tag
    // Example:
    res.send(data_url);
  });
});

routes.post("/verify", async (req, res) => {
  const { code } = req.body;
  console.log(code);
  var verify = speakeasy.totp.verify({
    secret: process.env.TWO_FACTOR_AUTHENTICATION_BASE32,
    encoding: "base32",
    token: code,
  });

  res.json({ verify });
});

server.listen(8000, () => {});
