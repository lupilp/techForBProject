const { Router } = require("express");
const router = Router();

const { dbKey } = require("../../config/db.config");

const jwt = require("jsonwebtoken");

const userController = require("../controllers/user.controller");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/getInfoUser", verifyToken, userController.getInfoUser);

router.get("/getBalance", verifyToken, userController.getBalance);

router.get("/getTransacciones", verifyToken, userController.getTransacciones);

router.get("/getTarjetas", verifyToken, userController.getTarjetas);

router.put("/info", verifyToken, userController.addInfoUser);

module.exports = router;

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("No puedes ingresar");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("No puedes ingresar");
    }

    const payload = await jwt.verify(token, dbKey);
    if (!payload) {
      return res.status(401).send("Unauhtorized Request 1");
    }

    req.userId = payload._id;
    next();
  } catch (e) {
    return res.status(401).send("Unauhtorized Request 2");
  }
}
