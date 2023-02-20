const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUKKESSI!!");
  });
});

router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    bcrypt.compare(password, user.password).then((same) => {
      if (!same) {
        return response.json({ error: "Väärä käyttäjänimi tai salasana!" });
      }

      return response.json("Oot kirjautunut onnistuneesti sisään!");
    });
  } else {
    return response.json({ error: "Käyttäjää ei ole olemassa!" });
  }
});

module.exports = router;
