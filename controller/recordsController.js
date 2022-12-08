import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("data/db.json"));

export const getAllRecords = async (req, res) => {
  await db.read();
  res.send(db.data.records);
};

export const getRecord = async (req, res) => {
  await db.read();

  const record = db.data.records.find((record) => record.id === +req.params.id);

  res.send(record);
};

export const saveRecord = async (req, res) => {
  await db.read();

  const nextID = Math.max(...db.data.records.map((r) => r.id)) + 1;

  db.data.records.push({ ...req.body, id: nextID });

  await db.write();

  res.send(`a new record created with the ID-Num: ${nextID}`);
};

export const editRecord = async (req, res) => {
  await db.read();

  db.data.records = db.data.records.map((record) =>
    record.id === +req.params.id ? { ...record, ...req.body } : record
  );

  // other method
  //   const index = db.data.records.findIndex((r) => r.id === +req.params.id);
  //   db.data.records[index] = { ...db.data.records[index], ...req.body };

  db.write();

  res.send(`Record with the ID ${req.params.id} updated`);
};

export const deleteRecord = async (req, res) => {
  await db.read();

  const index = db.data.records.findIndex((r) => r.id === +req.params.id);

  db.data.records.splice(index, 1);

  db.write();

  res.send(`Record with the ID ${req.params.id} deleted`);
};
