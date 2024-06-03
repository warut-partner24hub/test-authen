import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add DB URL");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
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
      .then((res) => {
        console.log("DB Connected");
        return res;
      })
      .catch((err) => console.log("Db Connect Error", err));
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
