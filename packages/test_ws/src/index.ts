import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.TEST_PORT;
const userList = new Map();

app.use(cors());

//#region Express Server
app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

const httpServer = app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//#endregion

//#region Web Socket Server with Socket.io
const io = new Server(httpServer, {
	cors: {
		origin: `http://localhost:${process.env.FRONT_PORT}`, // Allow requests from your React client
		methods: ["GET", "POST"],
	},
});

/**
 * This function let you get public room list with user list in each room
 */
function getPublicRoomList(clientSocketId:string) {
	const {rooms} = io.sockets.adapter;

	const publicRooms = {};
	
	rooms.forEach((ids, roomName) => {
		// choice only public room && not him self(in this moment, current client is not in userList)
		if (!userList.has(roomName) && roomName !== clientSocketId) {
			// update object with {roomName: userList}
			publicRooms[roomName] = Array.from(ids).map((id) => userList.get(id));
		}
	})
	return publicRooms
}

io.on('connection', (socket) => {
	socket.on('getRoomList', () => {
		socket.emit('roomList', getPublicRoomList(socket.id));
	})
	socket.on('joinRoom', (data) => {
		const {roomName, userName} = data;

		// save userName with socket.id
		userList.set(socket.id, userName);
		// join room
		socket.join(roomName);

		console.log("joinRoom", socket.rooms, "userList", userList);
	})
});
//#endregion

