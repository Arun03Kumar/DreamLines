const express = require("express");

const { InfoController } = require("../../controllers");
const userRouter = require("./user-route");
const { UserMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/info", UserMiddleware.checkAuth, InfoController.info);
router.use("/", userRouter);

module.exports = router;
