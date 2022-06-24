const mongoose = require("mongoose");
const app = require("./app/app");

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/bank", (error, mongoDBinstance) => {
  if (error) throw new Error(error);
  if (!process.env.MODE_ENV || process.env.MODE_ENV === "developmant") {
    const { host, port, name } = mongoDBinstance;
    console.log({ host, port, name });
  }
});

app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log("listen to port " + PORT);
});
