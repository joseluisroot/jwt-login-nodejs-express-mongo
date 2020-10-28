import mongoose from 'mongoose';

// Conexión a Base de datos
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.9fwlb.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const option = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const connection = async () => {
  mongoose.connect(URI, option, (err: Error) => {
    err ? console.error(err) : console.log("DB connected :D")
  })
};
