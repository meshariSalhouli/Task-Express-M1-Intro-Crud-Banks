const express = require("express");
const accountsRouter = require("./api/accounts/routers");

const app = express();
app.use(express.json());
const name = "Meshari Alhouli";

app.use("/", accountsRouter);

app.listen(8000, () => {
  console.log("the application is running on http://localhost:8000");
});
