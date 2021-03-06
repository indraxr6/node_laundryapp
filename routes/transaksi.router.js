const express = require("express");
const router =  new express.Router();
const controller = require('../controllers/transaksi.controller');

// const {checkToken} = require('../auth/auth_validation');

router.get("/detail/", controller.getData);
router.get("/detail/:id", controller.getDetails);
router.post("/add", controller.add);
router.delete("/delete/:id", controller.delete);
// router.put("/update/:id", controller.update);
router.put("/confirm/:id", controller.confirm);


module.exports = router;