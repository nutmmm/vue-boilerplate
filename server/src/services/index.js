const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const messagesAuth = require('./messages-auth/messages-auth.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
    app.configure(messages);
};
