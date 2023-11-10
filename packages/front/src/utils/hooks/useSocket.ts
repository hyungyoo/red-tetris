import { io } from "socket.io-client";

const socket = io(`http://localhost:${process.env.REACT_APP_BACK_PORT}/`);

export function useSocket() {
	socket.on("error", function (e) {
		window.alert(e.message);
	});
	return {
		socket: socket,
		connected: socket.connected,
	};
}
