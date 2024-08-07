const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { error } = require("console");

app.use(bodyParser.json());

generatePassword = (
  length,
  includeNumbers,
  includeCapitals,
  includeSpecChar
) => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  let password = lowercase;
  if (includeNumbers) {
    password = password + "0123456789";
  }
  if (includeCapitals) {
    password = password + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeSpecChar) {
    password = password + "~`!@#$%^&*()_-=+{}[]:;',.<>?/";
  }
  let output = "";
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * password.length);
    output = output + password[index];
  }
  return output;
};

app.get(
  "/Getpassword/:length/:includeNum/:includeCaps/:includeSpec",
  (req, res) => {
    try {
      const len = req.params.length;
      const includeNumbers = req.params.includeNum;
      const includeCapitals = req.params.includeCaps;
      const includeSpecChar = req.params.includeSpec;

      if (len <= 0) {
        return res.status(400).json({ error: "Length not valid" });
      }

      const password = generatePassword(
        len,
        includeNumbers,
        includeCapitals,
        includeSpecChar
      );
      return res.status(200).json({
        password,
        len,
        includeNumbers,
        includeCapitals,
        includeSpecChar,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

app.listen(5000, (req, res) => {
  console.log("Server is connected");
});
