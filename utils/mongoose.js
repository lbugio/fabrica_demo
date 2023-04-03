const mongoose = require("mongoose");

import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  const uri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : process.env.MONGODB_LOCAL;

  const db = await connect(uri);

  console.log(db.connection.db.databaseName);

  const [{ readyState }] = db.connections;
  conn.isConnected = readyState;
};

const handleError = (error) => {
  console.error("Mongodb Errro:", error.message);
};

connection.on("connected", () => console.log("Mongodb connected to db"));

connection.removeListener("error", handleError);

mongoose.set("strictQuery", false);

export { connection };
