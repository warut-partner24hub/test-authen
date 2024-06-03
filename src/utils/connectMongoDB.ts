import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your DATABASE_URL to .env.local");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose
      .connect(DATABASE_URL, options)
      .then((mongoose) => {
        console.log("Database connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("Database connection error", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongoDB;
