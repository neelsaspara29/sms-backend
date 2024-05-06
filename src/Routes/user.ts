import { Router } from 'express'
import { adminController, userController } from '../controllers';
import { userJWT } from '../helper'

const router = Router()




//----------------------- Authentication ------------------------------
router.post("/login" , userController.login);


router.use(userJWT);


//----------------------- Attandance ------------------------------
router.get("/attendance/:id" , userController.get_by_id_attendance)

//----------------------- Fees ------------------------------
router.get("/fees/history/:id", userController.get_payment_history_by_userId)


export const userRouter = router