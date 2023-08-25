import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { router as userRoute } from './routes/Users.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrismaClient, Prisma } from '@prisma/client';
import WebSocket, { WebSocketServer } from 'ws';
import { authSocketMiddleware } from './authSocketMiddleware.js';

const wss = new WebSocketServer({
  port: 3001,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
  },
});

const prisma = new PrismaClient();

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

const httpServer = createServer(app);

app.use('/users', userRoute);

const activeConnections = {};

wss.on('connection', authSocketMiddleware, (ws, req) => {
  // Authenticate the user
  const userId = req;

  if (!userId) {
    ws.close();
    return;
  }

  // Store the WebSocket connection for the user
  activeConnections[userId] = ws;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { recipientId, content } = data;

      // Send the message to the recipient
      const recipientSocket = activeConnections[recipientId];
      if (recipientSocket) {
        recipientSocket.send(JSON.stringify({ senderId: userId, content }));
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    // Remove the closed connection from activeConnections
    delete activeConnections[userId];
  });
});

app.post('/messages/:id', async (req, res) => {
  const { id, recipientId, message } = req.body;
  const messages = await prisma.message
    .create({
      content: message,
      author: id,
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2014') {
          res.status(400).json({
            msg: `Invalid id: ${err.meta.target}.`,
          });
        }
        if (err.code === 'P2003') {
          res.status(400).json({
            msg: `Invalid input data:  ${err.meta.target}.`,
          });
        } else {
          res.status(500).json({
            msg: `Something went wrong ${err.meta.target}, please try again.`,
          });
        }
        console.log(err);
      }
    });
});

app.get('/messages/:id', async (req, res) => {
  const messages = await prisma.message.findMany({
    where: {
      authorId: req.params.id,
    },
  });

  if (!messages) {
    res.status(404).json({ msg: 'No messages found' });
  }

  res.status(200).json(messages);
});

httpServer.listen(3000, () => {
  console.log('server is running...');
});
