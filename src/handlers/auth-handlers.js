const User = require("../models/user");
const pwd = process.env.PWD;

const sendSignUpSuccessful = (_, res) => {
  const message = "Sign Up successful";

  res.status(201).location("/sign-in").json({ message });
};

const sendUsernameExists = (_, res) => {
  const message = "User name already exists";

  res.status(403).send({ message });
};

const sendValidLogin = (req, res) => {
  const { name } = req.body;
  res.cookie("name", name).redirect(303, "/");
};

const sendInvalidLoginCredentials = (_, res) => {
  res.status(403).send();
};

const handleGetSignUp = (_, res) => {
  console.log(pwd);
  res.sendFile(pwd + "/public/pages/sign-up.html");
};

const handleGetSignIn = (_, res) => {
  res.sendFile(pwd + "/public/pages/sign-in.html");
};

const handleSignUp = (req, res) => {
  const { dataStorage, idGenerator, users } = req.app;
  const { name, password } = req.body;

  if (users.isUsernameExists(name)) {
    sendUsernameExists(req, res);
    return;
  }

  const userId = idGenerator.generateUserId();
  const user = new User(name, password, userId);
  users.add(user);
  dataStorage.storeUsers(users.details, () => sendSignUpSuccessful(req, res));
};

const handleSignIn = (req, res) => {
  const { users } = req.app;
  const { name, password } = req.body;

  if (users.isValidLoginCredentials(name, password)) {
    sendValidLogin(req, res);
    return;
  }
  sendInvalidLoginCredentials(req, res);
};

const handleValidateUsername = (req, res) => {
  const { users } = req.app;
  const { name } = req.cookies;

  if (users.isUsernameExists(name)) {
    res.send({ name });
    return;
  }

  res.status(401).send();
};

const handleSignOut = (_, res) => {
  res.clearCookie("name").redirect(303, "/");
};

module.exports = {
  handleGetSignUp,
  handleGetSignIn,
  handleSignUp,
  handleSignIn,
  handleValidateUsername,
  handleSignOut,
};
