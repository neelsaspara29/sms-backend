"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_dashboard_data = void 0;
const common_1 = require("../../common");
const database_1 = require("../../database");
const helper_1 = require("../../helper");
const get_dashboard_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, helper_1.reqInfo)(req);
    let body = req.body, match = {};
    try {
        let [sec1, sec2, sec3] = yield Promise.all([
            (() => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c;
                match.isActive = true;
                let totalFaculty = yield database_1.userModel.countDocuments({ userType: "faculty", isActive: true });
                let feesData = yield database_1.userModel.aggregate([
                    { $match: match },
                    {
                        $group: {
                            _id: null,
                            totalPendingFees: { $sum: '$pendingFees' },
                            totalFees: { $sum: '$totalFees' },
                            totalSalary: { $sum: "$salary" }
                        }
                    }
                ]);
                feesData = {
                    totalPendingFees: ((_a = feesData[0]) === null || _a === void 0 ? void 0 : _a.totalPendingFees) || 0,
                    totalFees: ((_b = feesData[0]) === null || _b === void 0 ? void 0 : _b.totalFees) || 0,
                    totalSalary: ((_c = feesData[0]) === null || _c === void 0 ? void 0 : _c.totalSalary) || 0
                };
                let paidFees = feesData.totalFees - feesData.totalPendingFees;
                return { feesData, totalFaculty, paidFees };
            }))(),
            (() => __awaiter(void 0, void 0, void 0, function* () {
                let totalStudent = yield database_1.userModel.countDocuments({ userType: "user", isActive: true });
                return { totalStudent };
            }))(),
        ]);
        return res.status(200).json(new common_1.apiResponse(200, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.getDataSuccess("dashboard"), { sec1, sec2, sec3 }, {}));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new common_1.apiResponse(500, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.get_dashboard_data = get_dashboard_data;
//# sourceMappingURL=admin.js.map