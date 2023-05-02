const userController = {};

const { dbKey } = require("../../config/db.config");

const User = require("../models/user");

const jwt = require("jsonwebtoken");

// POST register usuario

userController.registerUser = async (req, res) => {
  const { name, tipoDocumento, numDocumento, password } = req.body;

  const newUser = new User({ name, tipoDocumento, numDocumento, password });

  const token = await jwt.sign({ _id: newUser._id }, dbKey);

  await newUser.save();

  res.status(200).json({ token });
};

// POST login usuario

userController.loginUser = async (req, res) => {
  const { numDocumento, password } = req.body;

  const user = await User.findOne({ numDocumento });

  if (!user) {
    res.status(401).send({ message: "Usuario no registrado" });
  }

  if (user.password !== password) {
    res.status(401).send({ message: "Contraseña incorrecta" });
  }

  const token = await jwt.sign({ _id: user._id }, dbKey);
  return res.status(200).json({ token });
};

// GET información usuario

userController.getInfoUser = async (req, res) => {
  const { name, numDocumento } = await User.findById(req.userId);
  if (!name) {
    res.status(401).send({ message: "No puedes ingresar a esta pagina" });
  }

  const infoToSend = {
    name,
    numDocumento,
  };

  return res.status(200).json(infoToSend);
};

//GET Balance

userController.getBalance = async (req, res) => {
  const { balance } = await User.findById(req.userId);
  if (!balance) {
    res.status(401).send({ message: "No puedes ingresar a esta pagina" });
  }

  const infoToSend = {
    balance,
  };

  return res.status(200).json(infoToSend);
};

//GET Transacciones

userController.getTransacciones = async (req, res) => {
  const { transacciones } = await User.findById(req.userId);
  if (!transacciones) {
    res.status(401).send({ message: "No puedes ingresar a esta pagina" });
  }

  const infoToSend = {
    transacciones,
  };

  return res.status(200).json(infoToSend);
};

//GET tarjetas

userController.getTarjetas = async (req, res) => {
  const { tarjetas } = await User.findById(req.userId);
  if (!tarjetas) {
    res.status(401).send({ message: "No puedes ingresar a esta pagina" });
  }

  const infoToSend = {
    tarjetas,
  };

  return res.status(200).json(infoToSend);
};

// PUT para agregar la información

userController.addInfoUser = async (req, res) => {
  const { tarjeta, balance, transacciones } = req.body;

  try {
    const infoUser = await User.findById(req.userId);

    if (!infoUser) {
      return res
        .status(401)
        .send({ message: "No puedes ingresar a esta página" });
    }

    if (tarjeta) {
      infoUser.tarjetas.push(tarjeta);
    } else if (balance) {
      infoUser.balance.push(balance);
    } else if (transacciones) {
      infoUser.transacciones.push(transacciones);
    }

    await infoUser.save();

    return res.status(200).json(infoUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al agregar la tarjeta" });
  }
};

module.exports = userController;
