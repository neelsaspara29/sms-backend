import { standardClass } from "../../common";

const mongoose = require('mongoose')

const attendanceSchema: any = new mongoose.Schema({
    standard : {type : mongoose.Schema.Types.ObjectId , ref : "standard"},
    class : {type : String , enum : standardClass},
    date : {type : Date}, 
    attendance : {type : Object}, // { "mathes" : [{studentData , attendanceStatus} , {}] , "physics" : [{} , {}] }
    isActive : {type : Boolean , default : true}
}, { timestamps: true })

export const attendanceModel = mongoose.model('attendance', attendanceSchema);