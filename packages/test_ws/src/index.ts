import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { RoomStatus, Player, Room, PlayerStatus } from "@red-tetris/common"

dotenv.config();

const app: Express = express();
const port = process.env.REACT_APP_TEST_PORT;
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
		origin: `http://localhost:${process.env.REACT_APP_FRONT_PORT}`, // Allow requests from your React client
		methods: ["GET", "POST"],
	},
});

io.on('connection', (socket) => {
	socket.on('getRoomList', () => {
		socket.emit('roomList', getPublicRoomList());
	})
	socket.on('joinRoom', (data) => {
		const { roomName, userName } = data;

		// save userName with socket.id
		const currentPlayer = {
			name: userName,
			status: PlayerStatus.WAITING,
			//FIXME: create a enum for color in type.ts is better or use defined tailwinds color - ex: send color: 'red-500' to client
			tetrisMap:
			{
				'1-10': { color: '#333' },
				'1-11': { color: '#333' },
				'2-9': { color: '#333' },
				'2-11': { color: '#333' },
				'3-8': { color: '#333' },
				'3-11': { color: '#333' },
				'4-7': { color: '#333' },
				'4-11': { color: '#333' },
				'4-12': { color: '#333' },
				'6-7': { color: '#333' },
				'6-10': { color: '#333' },
				'6-11': { color: '#333' },
				'7-7': { color: '#333' },
				'7-9': { color: '#333' },
				'7-11': { color: '#333' },
				'8-7': { color: '#333' },
				'8-8': { color: '#333' },
				'8-11': { color: '#333' }
			}

		}
		userList.set(socket.id, currentPlayer);

		// join room
		socket.join(roomName);

		console.debug(`${getPlayerBySocketId(socket.id)?.name}(${socket.id}) has joined the room: ${roomName}\n`);
		// customDebug('JOIN', roomName, socket.id);

		io.to(roomName).emit('roomInfo', getRoomInfo(roomName));
		io.emit('roomList', getPublicRoomList());

		// customDebug("joinRoom <<after>>", roomName, socket.id);
	})
	socket.on('leaveRoom', (data) => {
		const { roomName } = data;

		// customDebug("leaveRoom <<before>>", roomName, socket.id);

		socket.leave(roomName);
		console.debug(`${getPlayerBySocketId(socket.id)?.name}(${socket.id}) has left the room: ${roomName}\n`);
		io.to(roomName).emit('roomInfo', getRoomInfo(roomName));
		userList.delete(socket.id);
		io.emit('roomList', getPublicRoomList());

		// customDebug("leaveRoom <<after>>", roomName, socket.id);
	})
	socket.on('disconnecting', (reason) => {
		// customDebug("Disconnecting <<before>>", undefined, socket.id);

		console.debug(`${getPlayerBySocketId(socket.id)?.name}(${socket.id}) has disconnected\n`);

		// leave all rooms
		for (const roomName of socket.rooms) {
			if (roomName !== socket.id) {
				socket.leave(roomName)
				io.to(roomName).emit('roomInfo', getRoomInfo(roomName));
			}
		}

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
function getPlayerBySocketId(socketId: string): Player {
	return userList.get(socketId);
}

/**
 * This function let you get public room list with user list in each room
 */
function getPublicRoomList() {
	const { rooms } = io.sockets.adapter;
	const publicRooms: Room[] = [];

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
 * This function let you get public room list with user list in each room
 */
function getRoomInfo(roomName: string){
	const room = io.sockets.adapter.rooms.get(roomName);
	const players = room ? (Array.from(room).map((id) => userList.get(id))as Player[]) : [];
	const status = players.find((player) => player.status === PlayerStatus.PLAYING) ? RoomStatus.PLAYING : RoomStatus.WAITING;

	return {name:roomName, status, players};

}


/**
 * This function let you know if a room is private or not
 * When a room is private, it has a name hashed and a socket.id in ids
 */
function isPrivateRoom(setInstance: Set<string>, roomName: string): boolean {
	const setIter = setInstance.values();

	return setIter.next().value === roomName;
}

/**
 * This function is used to debug
 */
function customDebug(eventName: string, roomName?: string, socketId?: string) {
	console.log("=====================================");
	console.log(`[${eventName}]`)
	console.log("Current RoomName:", roomName)
	console.log("Current user:", getPlayerBySocketId(socketId));
	console.log("UserList:", userList)
	console.log("Public room List:", JSON.stringify(getPublicRoomList(), null, 3));
	console.log("=====================================");
}
//#endregion