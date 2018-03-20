const chat = require('./chat/chat.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(chat);
  app.configure(users);
};
