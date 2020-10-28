const mongoose = require('mongoose');

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.9fwlb.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, option)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));
