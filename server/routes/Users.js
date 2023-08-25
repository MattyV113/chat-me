import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
const { sign } = jwt;
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage });

console.log();

const router = express.Router();

router.use(cookieParser());

router.post('/signup', upload.single('profileImage'), async (req, res) => {
  const { username, email, profileImage, password, hobbies, favFood } =
    req.body;
  console.log(profileImage);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user
    .create({
      data: {
        username,
        email,
        profileImage,
        password: hashedPassword,
        hobbies,
        favFood,
      },
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(403).json({
            msg: `A duplicate ${err.meta.target} was entered, please enter a new one.`,
          });
        }
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

  return res.json(user);
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(req.params.id),
    },
  });
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user
    .findUnique({
      where: {
        username,
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

  const token = sign(user, process.env.MY_JWT_KEY, {
    expiresIn: '1hr',
  });

  res.cookie('token', token, {});

  res.json(user);
});

export { router };
