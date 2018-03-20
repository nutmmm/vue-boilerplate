import { authentication } from "@feathersjs/client"
const feathers = require('@feathersjs/feathers');
import conf from "./conf"
const socketio = require('@feathersjs/socketio-client');

const socket = socketio(`http://${conf.host}:${conf.port}`, {
  transports: ['websocket'],
  forceNew: true
})
const client = feathers()

client.configure(authentication({ storage: localStorage }))
// Create the Feathers application with a `socketio` connection
client.configure(socketio(socket))

export default client
