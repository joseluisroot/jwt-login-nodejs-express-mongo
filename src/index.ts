
import app from "./app";
import {connection} from './database'

// iniciar server
const main = () => {
  connection()
  app.listen(app.get('PORT'), () => {
    console.log(`servidor andando en: ${app.get("PORT")}`);
  });
};

main();
