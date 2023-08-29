import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

console.log();

const router = express.Router();

router.use(cookieParser());

router.post('/', async (req, res) => {
  const { name } = req.body;
  console.log(req.body);

  const room = await prisma.room
    .create({
      data: {
        name,
      },
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
  return res.json(room);
});

router.get('/', async (req, res) => {
  const rooms = await prisma.room.findMany();

  return res.json(rooms);
});

export { router };
