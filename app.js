const express = require("express");
const accounts = require("./accounts");
const uuid4 = require("uuid4");
const { request } = require("http");

const app = express();
app.use(express.json());
const name = "Meshari Alhouli";

app.get("/accounts", (request, response) => {
  response.status(200).json(accounts);
});

app.get("/accounts/:accountsId", (request, response) => {
  const foundAccount = accounts.find(
    (account) => account.id === request.params.accountsId
  );
  if (!foundAccount)
    response.status(404).json({ message: "account not found" });
  response.status(200).json(foundAccount);
});
app.get("/accounts/:accountName", (request, response) => {
  const foundAccount = accounts.find(
    (account) =>
      account.username.toLowerCase() ===
      request.params.accountName.toLocaleLowerCase()
  );
  if (!foundAccount)
    response.status(404).json({ message: "account not found" });
  response.status(200).json(foundAccount);
});

app.post("/accounts", (request, response) => {
  const newAccount = {
    ...request.body,
    id: uuid4(),
    funds: 0,
  };
  accounts.unshift(newAccount);
  response.status(201).json(newAccount);
});

app.put("/accounts/:accountsId", (request, response) => {
  const foundAccount = accounts.find(
    (account) => account.id === parseInt(request.params.accountsId)
  );
  if (!foundAccount)
    response.status(404).json({ message: "account not found" });
  const { username, funds } = request.body;
  if (!username || !funds)
    response.status(400).json({ message: "Bad requset" });
  foundAccount.username = username;
  foundAccount.funds = funds;

  response.status(200).json(foundAccount);
});

app.delete("/accounts/:accountsId", (request, response) => {
  const foundAccount = accounts.find(
    (account) => account.id === request.params.accountsId
  );
  if (!foundAccount)
    response.status(404).json({ message: "account not found" });

  const accountIndex = accounts.findIndex(
    (account) => account.id === request.params.accountsId
  );
  accounts.splice(accountIndex, 1);
  response.status(204).end();
});

app.listen(8000, () => {
  console.log("the application is running on http://localhost:8000");
});
