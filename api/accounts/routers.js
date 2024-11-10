const express = require("express");
const {
  accountList,
  accountDetail,
  accountDetail2,
  updateAccount,
  deleteAccount,
  createAccount,
} = require("./controller");
const router = express.Router();

router.get("/", accountList);
router.get("/:accountsId", accountDetail);
router.get("/:accountName", accountDetail2);
router.post("/", createAccount);
router.put("/:accountsId", updateAccount);
router.delete("/:accountsId", deleteAccount);

module.exports = router;
