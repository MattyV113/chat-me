import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { router as userRoute } from './routes/Users.js';
import { router as roomRoute } from './routes/Rooms.js';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrismaClient, Prisma } from '@prisma/client';

import jwt from 'jsonwebtoken';
import { connected } from 'process';
const { verify } = jwt;

const prisma = new PrismaClient();

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

const httpServer = createServer(app);

const jwtKey = process.env.MY_JWT_KEY;

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const connectedUsers = {};

app.use('/users', userRoute);
app.use('/rooms', roomRoute);

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication Error.'));
    }

    socket.user = decoded;
    next();
  });
}).on('connect', (socket) => {
  console.log('A user connected ' + socket.user.username);

  // Store the user ID when a user connects
  socket.on('username', async (username) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    connectedUsers[socket.id] = user;
    io.emit('connected', user);
  });

  // Handle the event to send a message to a specific user
  socket.on('send-message', (data) => {
    io.emit('message', {
      message: data.message,
      date: new Date.toISOString(),
      author: connectedUsers[socket.id],
    });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    // Remove the user from the connected users list
    const disconnectedUserId = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.user.id
    );
    if (disconnectedUserId) {
      delete connectedUsers[disconnectedUserId];
      console.log(`User ${disconnectedUserId} disconnected`);
    }
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
      const recipientSocketId = connectedUsers[recipientId];

      if (recipientSocketId) {
        // Send the message to the recipient user
        io.to(recipientSocketId).emit('messageReceived', messages.content);
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    });
});

app.get('/messages/:id', async (req, res) => {
  const messages = await prisma.message.findUnique({
    where: {
      authorId: req.params.id,
    },
  });

  return res.status(200).json(messages);
});

httpServer.listen(3000, () => {
  console.log('server is running...');
});
