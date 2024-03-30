const express = require("express");
const router = express.Router();
const AdminController= require("../Controllers/adminController")


router.get("/users",AdminController.getAllUser);

router.get("/books",AdminController.getAllBooks);
router.get("/purchases",AdminController.getAllPurchased);
router.get("/report",AdminController.getDatesAndPrices);
router.get("/reservation",AdminController.purchasedBooks);

module.exports = router;