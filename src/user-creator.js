const User = require("./models/user");

const createUsers = (usersDetails, idGenerator) => {
  return usersDetails.map(({ name, password}) => {
    const userId = idGenerator.generateUserId();
    return new User(name, password, userId);
  });
};

module.exports = { createUsers };
