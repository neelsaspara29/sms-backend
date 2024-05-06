"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helper_1 = require("../helper");
const router = (0, express_1.Router)();
//----------------------- Authentication ------------------------------
router.post("/signup", controllers_1.authController.signUp);
router.post("/otp/verify", controllers_1.authController.otp_verification);
router.post("/login", controllers_1.authController.login);
router.post("/forget/password", controllers_1.authController.forgot_password);
router.post("/otp/resend", controllers_1.authController.resend_otp);
router.post("/reset/password", controllers_1.authController.reset_password);
//------------------------ User -----------------------------------------
router.use(helper_1.adminJWT);
router.get("/standard/get/list", controllers_1.adminController.get_standard_list_wo_pagination);
router.post("/user/add", controllers_1.adminController.add_user);
router.post("/user/edit", controllers_1.adminController.edit_user_by_id);
router.delete("/user/delete/:id", controllers_1.adminController.delete_user_by_id);
router.post("/user/get/all", controllers_1.adminController.get_all_user);
router.get("/user/:id", controllers_1.adminController.get_by_id_user);
router.post("/user/attendance", controllers_1.adminController.get_user_attendance);
router.post("/faculty/get/all", controllers_1.adminController.get_all_faculty);
router.post("/user/bulk/add", controllers_1.adminController.add_student_in_bulk);
router.post("/get/dashboard", controllers_1.adminController.get_dashboard_data);
router.post("/admin/get/all", controllers_1.adminController.get_all_admin);
//------------------------ standard -----------------------------------------
router.post("/standard/add", controllers_1.adminController.add_standard);
router.post("/standard/edit", controllers_1.adminController.edit_standard_by_id);
router.delete("/standard/delete/:id", controllers_1.adminController.delete_standard_by_id);
router.post("/standard/get/all", controllers_1.adminController.get_all_standard);
router.get("/standard/:id", controllers_1.adminController.get_by_id_standard);
//------------------------ attendance -----------------------------------------
router.post("/attendance/add", controllers_1.adminController.add_edit_attendance);
router.post("/attendance/get", controllers_1.adminController.get_attendance_by_date_std_subject);
router.post("/timetable/add", controllers_1.adminController.add_edit_timetable);
router.post("/timetable/get", controllers_1.adminController.get_by_id_timetable);
exports.adminRouter = router;
//# sourceMappingURL=admin.js.map