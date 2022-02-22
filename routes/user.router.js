const express = require("express");
const router =  new express.Router();
const controller = require('../controllers/user.controller');


// const {checkToken} = require('../auth/auth_validation');


router.get("/index", controller.getData);
router.get("/:id", controller.selectData);

router.post("/register", controller.add);
router.delete("/delete/:id", controller.delete);
router.put("/update/:id", controller.update);

// router.post('/daftar', pendudukController.registrasi);
// router.get('/login', controller.login);
// router.get('/logout', controller.logout);

module.exports = router;