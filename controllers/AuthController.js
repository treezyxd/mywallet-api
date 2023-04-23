import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const signUpUser = async (req, res) => {
  const  { name, email, password } = req.body;

  try {
    const appUser = await db.collection('users').findOne({ email });
    if(appUser) return res.status(409).send('This user already in use');

    const cryptedPassword = bcrypt.hashSync(password, 10);

    await db.collection('users').insertOne({
      name,
      email,
      password: cryptedPassword
    });
    res.status(201).send('User successfully registered');
  } catch(err) {
    console.log(err);
    res.status(500);
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const appUser = await db.collection('users').findOne({ email });
    if(!appUser) return res.status(401).send('email or password is incorrect');

    const isPassword = bcrypt.compareSync(password, appUser.password);
    if(!isPassword) return res.status(401).send('email or password is incorrect');

    const token = uuidv4();

    try {
      await db.collection('sessions').insertOne({ userId: appUser._id, token });
      return res.status(201).send({ userId: appUser._id, token });
    } catch(err) {
      console.log(err);
      return res.status(500);
    }
  } catch(err) {
    console.log(err);
    return res.status(500);
  }
}