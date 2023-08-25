import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const authSocketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.query?.token;
    const payload = await verify(token, process.env.MY_JWT_TOKEN);
    socket.user_id = payload.user_id;
    next();
  } catch (err) {
    next(err);
  }
};
