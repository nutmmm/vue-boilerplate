import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";

import conf from "./conf";

const client = feathers();

const socket = io(`http://${conf.host}:${conf.port}`, {
	transports: ["websocket"],
	forceNew: true
});

client.configure(auth({ storage: localStorage }));
// Create the Feathers application with a `socketio` connection
client.configure(socketio(socket));

export default client;
