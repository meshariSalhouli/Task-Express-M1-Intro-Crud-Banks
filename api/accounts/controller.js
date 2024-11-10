const uuid4 = require("uuid4");
const accounts = require("../../accounts");

const accountDetail = (request, response) => {
  const foundAccount = accounts.find(
    (account) => account.id === request.params.accountsId
  );
  if (!foundAccount)
    response.status(404).json({ message: "account not found" });
  response.status(200).json(foundAccount);
};
const accountList = (request, response) => {
  const { accountName } = request.query;
  if (!accountName) {
    response.status(200).json(accounts);
  }
  const foundAccount = accounts.find(
    (account) =>
      account.username.toLowerCase() === accountName.toLocaleLowerCase()
  );
  if (!foundAccount)
    response.status(404).json({ message: "account not found" });
  response.status(200).json(foundAccount);
};

const createAccount = (request, response) => {
  const newAccount = {
    ...request.body,
    id: uuid4(),
    funds: 0,
  };
  accounts.unshift(newAccount);
  response.status(201).json(newAccount);
};

const updateAccount = (request, response) => {
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
};

const deleteAccount = (request, response) => {
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
};
module.exports = {
  accountList,
  accountDetail,
  updateAccount,
  deleteAccount,
  createAccount,
};
