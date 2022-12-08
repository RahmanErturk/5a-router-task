import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("data/db.json"));

export const getAllUsers = async (req, res) => {
  await db.read();
  res.send(db.data.users);
};

export const getUser = async (req, res) => {
  await db.read();

  const user = db.data.users.find((user) => user.id === +req.params.id);

  res.send(user);
};

export const saveUser = async (req, res) => {
  await db.read();

  const nextID = Math.max(...db.data.users.map((u) => u.id)) + 1;

  db.data.users.push({ ...req.body, id: nextID });

  await db.write();

  res.send(`a new User created with the ID-Num: ${nextID}`);
};

export const editUser = async (req, res) => {
  await db.read();

  db.data.users = db.data.users.map((user) =>
    user.id === +req.params.id ? { ...user, ...req.body } : user
  );

  // other method
  //   const index = db.data.users.findIndex((u) => u.id === +req.params.id);
  //   db.data.users[index] = { ...db.data.users[index], ...req.body };

  db.write();

  res.send(`User with the ID ${req.params.id} updated`);
};

export const deleteUser = async (req, res) => {
  await db.read();

  const index = db.data.users.findIndex((u) => u.id === +req.params.id);

  db.data.users.splice(index, 1);

  db.write();

  res.send(`User with the ID ${req.params.id} deleted`);
};
