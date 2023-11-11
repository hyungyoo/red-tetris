import { io } from "socket.io-client";

// FIXME: switch this next line until backend server is stabilised.
// const socket = io(`http://localhost:${process.env.REACT_APP_BACK_PORT}`);
const socket = io(`http://localhost:${process.env.REACT_APP_TEST_PORT}`);

export function useSocket() {
	socket.on("error", function (e) {
		window.alert(e.message);
	});
	return {
		socket: socket,
		connected: socket.connected,
	};
}
