import { io } from "socket.io-client";

const socket = io(`http://localhost:9000`);
export function useSocket() {
	socket.on("error", function (e) {
		window.alert(e.message);
	});
	return {
		socket: socket,
		connected: socket.connected,
	};
}
