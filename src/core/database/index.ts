import mongoose from "mongoose";

export const connectDatabase = async () => {
  console.log(process.env.DATABASE_URL);
  return mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected!"))
    .catch((error) => {
      console.log("Connection database error", error);
    });
};

export const disconnectDatabase = async () => {
  mongoose.connection.close();
};

export const mongooseInstance = mongoose;
