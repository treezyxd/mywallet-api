import db from "../config/database.js";

export const getTransactions = async (req, res) => {
  const user = res.locals.user;
  const transactions = await db.collection('transactions').find({userId: user._id}).toArray();
  if(transactions.length === 0) {
    res.status(404).send('Nao ha registros de entrada ou saida!');
  }
  return res.send(transactions);
}

export const entryTransaction = async (req, res) => {
  const { amount, description, type } = req.body;
  const user = res.locals.user;

  await db.collection('transactions').insertOne({
    amount,
    description,
    type,
    userId: user._id
  });
  res.status(201).send('Transaction was made successfuly.');
}