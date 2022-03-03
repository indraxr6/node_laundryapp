const express = require("express");
const router =  new express.Router();
const controller = require('../controllers/paket.controller');

// const {checkToken} = require('../auth/auth_validation');

router.get("/index", controller.getData);
router.get("/:id", controller.selectData);

router.post("/register", controller.add);
router.delete("/delete/:id", controller.delete);
router.put("/update/:id", controller.update);

module.exports = router;