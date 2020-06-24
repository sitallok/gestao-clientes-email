var express = require("express");
var router = express.Router();
var PlansController = require("../controllers/PlansController");
var Crypter = require("../services/Crypters");

router.get("/plans", PlansController.index);

router.get("/admin/plans/create", PlansController.create);

router.post("/plans/store", PlansController.store);

router.get("/admin/plans/edit/:id", PlansController.edit);

router.get("/admin/plans/edit", PlansController.editFull);

router.post("/plans/update", PlansController.update);

router.get("/plans/disable/:id", PlansController.disable);

router.get("/plans/enable/:id", PlansController.enable);


module.exports = router;