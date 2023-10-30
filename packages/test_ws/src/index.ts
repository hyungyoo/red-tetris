import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.TEST_PORT;

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
	console.log('a user connected', socket.id);
});
//#endregion

