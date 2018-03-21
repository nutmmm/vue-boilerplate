const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');
const io = require('socket.io-client');
const client = feathers()
import conf from "./conf";

console.log(conf.host)
const socket = io(`http://${conf.host}:${conf.port}`, {
  transports: ['websocket'],
  forceNew: true
})

import store from "../store"

client.configure(auth({ storage: localStorage }))
// Create the Feathers application with a `socketio` connection
client.configure(socketio(socket))

export default client
