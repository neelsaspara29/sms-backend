"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helper_1 = require("../helper");
const router = (0, express_1.Router)();
//----------------------- Authentication ------------------------------
router.post("/login", controllers_1.userController.login);
router.use(helper_1.userJWT);
//----------------------- Attandance ------------------------------
router.get("/attendance/:id", controllers_1.userController.get_by_id_attendance);
//----------------------- Fees ------------------------------
router.get("/fees/history/:id", controllers_1.userController.get_payment_history_by_userId);
exports.userRouter = router;
//# sourceMappingURL=user.js.map