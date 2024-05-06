import { apiResponse } from "../../common";
import {  userModel } from "../../database";
import { reqInfo, responseMessage } from "../../helper"




export const get_dashboard_data = async(req, res)=> {
    reqInfo(req)
    let body = req.body, match:any ={}
    try{
        let [sec1 , sec2 , sec3] : any = await Promise.all([
            (async() =>
                {
                match.isActive = true
                let totalFaculty = await userModel.countDocuments({userType: "faculty", isActive:true})
                let feesData:any = await userModel.aggregate([
                    {$match: match},
                    {
                        $group:{    
                            _id: null,     
                            totalPendingFees: { $sum: '$pendingFees' },
                            totalFees: { $sum: '$totalFees' },
                            totalSalary : {$sum:"$salary"}
                        }
                    }
                ])

                 feesData = {
                    totalPendingFees: feesData[0]?.totalPendingFees || 0,
                    totalFees: feesData[0]?.totalFees || 0,
                    totalSalary: feesData[0]?.totalSalary || 0
                }
                let paidFees = feesData.totalFees -  feesData.totalPendingFees
                return{feesData, totalFaculty, paidFees}
            })(),

            (async()=>{
               
                let totalStudent = await userModel.countDocuments({userType: "user", isActive:true})
                return { totalStudent}
            })(),

          
        ])
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("dashboard"),{sec1, sec2, sec3},{}))
    }catch(error){
    console.log(error);
    return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
}}
