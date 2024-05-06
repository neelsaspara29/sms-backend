import { Request, Response } from "express";
import { apiResponse, getDayOfWeek, get_next_Date } from "../../common";
import { attendanceModel, standardModel, timetableModel, userModel } from "../../database";
import { reqInfo, responseMessage } from "../../helper";

const ObjectId = require('mongoose').Types.ObjectId


export const add_edit_attendance = async (req: Request, res: Response) => {
    reqInfo(req);
    let body = req.body, 
        {_id , attendance} = req.body,
        {user} : any = req.headers; //{_id , attendance}
    try {

        const updatedAttendance = await attendanceModel.findOneAndUpdate({_id : ObjectId(_id) , isActive : true} , body , {new : true})
        if(updatedAttendance) return res.status(200).json(new apiResponse(200 , responseMessage?.addDataSuccess("attendance") , updatedAttendance , {}));
         return res.status(400).json(new apiResponse(400, responseMessage?.addDataError, {}, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

// export const edit_attendance_by_id = async(req,res) =>
// {
//     reqInfo(req)
//     let { attendance } = req.headers,
//         body = req.body; 
//     try {
//         const response = await attendanceModel.findOneAndUpdate({_id :ObjectId(body._id) , isActive : true} , body , {new : true})
//         return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess("attendance"), response, {}));
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
//     }
// }

// export const delete_attendance_by_id = async(req,res) =>
// {
//     reqInfo(req)
//     let { attendance } = req.headers,
//         body = req.body,
//         {id} = req.params
//     try {
//         const response = await attendanceModel.findOneAndUpdate({_id :ObjectId(id) , isActive : true} , {isActive : false} , {new : true})
//         return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess("attendance"), {}, {}));
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
//     }
// }

export const get_attendance_by_date_std_subject = async (req, res) => {
    reqInfo(req)
    let response: any, { standard , date , subject , classId } = req.body, match: any = {};
    try {
        match.isActive = true
        match.date = { $gt : get_next_Date(new Date(date) , -1), $lte : new Date(date) };
        match.standard = ObjectId(standard);
        
        let attendance = await attendanceModel.findOne({...match})

        console.log("hello", attendance);
        if(!attendance)
        {
            //then make new attendance entry in that 
            // let standardData = await standardModel.findOne({_id : ObjectId(standard) , isActive : true});

            console.log("studentData" , "stuData");
            let studentData = await userModel.find({isActive : true , userType : "user" , standard : ObjectId(standard) , class : classId});
            let responseStudentData  : any = [];
            for(let i = 0 ; i < studentData?.length ; i++)
            {
                    let student = studentData[i];
                    // console.log(student);
                     student = {
                        _id : ObjectId(student?._id),
                        rollNo : student?.rollNo,
                        name: `${student?.firstName} ${student?.lastName}`,
                        attendance : null
                    }
                        // student.attendance = null;
                        responseStudentData.push(student);
            }
            
            console.log(studentData[0]?.attendance , "is field attendance");
            // console.log("student Data" , studentData);

            let subjects = []; // change here subjects as per timetable

            let day = getDayOfWeek(date);
            console.log(standard, classId , "day");

            let timetable = await timetableModel.findOne({standardId : ObjectId(standard) , class : classId });

            timetable = timetable?.timetable;

            console.log("timetable" , timetable);

            let  tempSubjects = timetable[day];

            console.log("temp subjects" ,  tempSubjects);

            for(let sub of tempSubjects)
            {
                subjects.push(sub.subject);
            }

            console.log("final subjects" , subjects);
      
            let preAttendance : any = {};

            for(let i = 0 ; i < subjects?.length ; i ++)
            {
                    let item = subjects[i];
                    preAttendance[`${item}`] = [...responseStudentData];
            }

            let new_attendance = {
                standard : ObjectId(standard),
                date : new Date(date),
                class : classId ,
                attendance : preAttendance
            }
            const attendanceData = await new attendanceModel(new_attendance).save();

            console.log(attendanceData , "attendanceData ----------------");
            return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess("attendance"), attendanceData, {}));
        }

        return res.status(200).json(new apiResponse(200 , responseMessage?.getDataSuccess("attendance") , attendance , {}));
    }catch(error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}


// export const get_by_id_attendance = async(req,res)=>
// {
//         reqInfo(req);
//         let { attendance } = req.headers,
//             body = req.body,
//           { id } = req.params;
//         try {
//             const response = await attendanceModel.findOne({ _id : ObjectId(id) , isActive : true});
//             if (!response) return res.status(400).json(new apiResponse(400, responseMessage.getDataNotFound("attendance"), {}, {}));
    
//             return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess("attendance"), response, {}));
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
// }
// }

