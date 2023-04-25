import db from "../config/database.js";

export const sessionValidate = async (req, res, next) => {
  const authorization = req.headers.authorization;

  const token = authorization?.replace('Bearer ', '');

  if(!token) return res.sendStatus(422).send('A Bearer token must be sent by request headers.');

    const session = await db.collection('session').findOne({token});
    if(!session) return res.status(498).send('Invalid Token');

    const user = await db.collection('users').findOne({_id: session.userId});
    if(!user) return res.sendStatus(401);
    delete user.password;
    res.locals.user = user;

  next();
}