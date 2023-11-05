import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import {RoomStatus, Player, Room, PlayerStatus} from "@red-tetris/common"

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

io.on('connection', (socket) => {
	socket.on('getRoomList', () => {
		socket.emit('roomList', getPublicRoomList());
	})
	socket.on('joinRoom', (data) => {
		const {roomName, userName} = data;

		// save userName with socket.id
		const currentPlayer = {
			name: userName,
			status: PlayerStatus.WAITING,
		}
		userList.set(socket.id, currentPlayer);

		// join room
		socket.join(roomName);
		io.emit('roomList', getPublicRoomList());

		// customDebug("joinRoom <<after>>", roomName, socket.id);
	})
	socket.on('leaveRoom', (data) => {
		const {roomName} = data;

		// customDebug("leaveRoom <<before>>", roomName, socket.id);

		socket.leave(roomName);
		userList.delete(socket.id);
		io.emit('roomList', getPublicRoomList());

		// customDebug("leaveRoom <<after>>", roomName, socket.id);
	})
	socket.on('disconnecting', (reason) => {
		// customDebug("Disconnecting <<before>>", undefined, socket.id);

		userList.delete(socket.id);
		io.emit('roomList', getPublicRoomList());

		// customDebug("Disconnecting <<after>>", undefined, socket.id);
	})
});
//#endregion


//#region Utils
/**
 * This function let you get a player by socket.id
 */
function getPlayerBySocketId(socketId:string):Player {
	return userList.get(socketId);
}

/**
 * This function let you get public room list with user list in each room
 */
function getPublicRoomList() {
	const {rooms} = io.sockets.adapter;
	const publicRooms:Room[] = [];
	
	rooms.forEach((ids, name) => {
		// Public room has a name not hashed and not in ids
		if (!isPrivateRoom(ids, name)) {
			const players = Array.from(ids)
				.filter((id) => userList.has(id))
				.map((id) => userList.get(id)) as Player[];
			if (players) {
				publicRooms.push({
					name,
					status: RoomStatus.WAITING,
					players
				});
			}
		}
	})
	return publicRooms
}


/**
 * This function let you know if a room is private or not
 * When a room is private, it has a name hashed and a socket.id in ids
 */
function isPrivateRoom(setInstance:Set<string>, roomName:string):boolean {
	const setIter = setInstance.values();

	return setIter.next().value === roomName;
}

/**
 * This function is used to debug
 */
function customDebug(eventName:string, roomName?:string, socketId?:string) {
		console.log("=====================================");
		console.log(`[${eventName}]`)
		console.log("Current RoomName:", roomName)
		console.log("Current user:", getPlayerBySocketId(socketId));
		console.log("UserList:", userList)
		console.log("Public room List:", JSON.stringify(getPublicRoomList()));
		console.log("=====================================");
}
//#endregion