import Chat from "../models/chat.js";
import { Server } from "socket.io";
import server from "../server.js";

const io = new Server(server, {
	cors: {
		origin: process.env.URL_FRONTEND,
	},
});

export default () => {
	io.on("connection", (socket) => {
		socket.on("enviar", async (mensaje) => {
			await Chat.create(mensaje);

			socket.broadcast.emit("recibir", mensaje);
		});
	});
};
