"use strict"
import { Router } from 'express'
import {  adminController, authController } from '../controllers'
import { adminJWT } from '../helper'

const router = Router()


//----------------------- Authentication ------------------------------
router.post("/signup" , authController.signUp);
router.post("/otp/verify" , authController.otp_verification);
router.post("/login" , authController.login);
router.post("/forget/password" , authController.forgot_password);
router.post("/otp/resend" , authController.resend_otp);
router.post("/reset/password" , authController.reset_password);

//------------------------ User -----------------------------------------
router.use(adminJWT);
router.get("/standard/get/list" , adminController.get_standard_list_wo_pagination);
router.post("/user/add" , adminController.add_user);
router.post("/user/edit" , adminController.edit_user_by_id);
router.delete("/user/delete/:id" , adminController.delete_user_by_id);
router.post("/user/get/all" , adminController.get_all_user);
router.get("/user/:id" , adminController.get_by_id_user);
router.post("/user/attendance" , adminController.get_user_attendance)
router.post("/faculty/get/all" , adminController.get_all_faculty);
router.post("/user/bulk/add" , adminController.add_student_in_bulk);
router.post("/get/dashboard",adminController.get_dashboard_data);
router.post("/admin/get/all" , adminController.get_all_admin);


//------------------------ standard -----------------------------------------
router.post("/standard/add" , adminController.add_standard);
router.post("/standard/edit" , adminController.edit_standard_by_id);
router.delete("/standard/delete/:id" , adminController.delete_standard_by_id);
router.post("/standard/get/all" , adminController.get_all_standard);
router.get("/standard/:id" , adminController.get_by_id_standard);

//------------------------ attendance -----------------------------------------
router.post("/attendance/add" , adminController.add_edit_attendance);
router.post("/attendance/get" , adminController.get_attendance_by_date_std_subject);

router.post("/timetable/add", adminController.add_edit_timetable)
router.post("/timetable/get", adminController.get_by_id_timetable)

export const adminRouter = router
