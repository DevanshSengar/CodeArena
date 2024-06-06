import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const err = new Error("You are not authenticated!");
    err.status = 401;
    return next(err);
  }

  jwt.verify(token, process.env.KEY, async (err, payload) => {
    if (err) {
      const error = new Error("Token is not valid!");
      error.status = 403;
      return next(error);
    }
    req.userId = payload.id;
    next();
  });
};

export default verifyToken;
