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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paytm_txnStatus = exports.paytm_callback = exports.paytm = exports.get_payment_history_by_userId = void 0;
const database_1 = require("../../database");
const helper_1 = require("../../helper");
const common_1 = require("../../common");
const https_1 = __importDefault(require("https"));
const crypto_1 = __importDefault(require("crypto"));
const ObjectId = require('mongoose').Types.ObjectId;
const get_payment_history_by_userId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, helper_1.reqInfo)(req);
    let userId = req.params.id; // the user ID is passed as a parameter in the request URL
    try {
        const user = yield database_1.userModel.findById(userId).populate('standard'); // populate the 'standard' field, assuming it is a reference to another model
        if (!user) {
            return res.status(404).json(new common_1.apiResponse(404, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.addDataError, {}, {}));
        }
        const paymentHistory = yield database_1.transactionModel.find({ userId: userId });
        const userData = {
            totalFees: user.totalFees,
            pendingFees: user.pendingFees,
            standard: user.standard,
            paymentHistory: paymentHistory
        };
        return res.status(200).json(new common_1.apiResponse(200, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.addDataSuccess("user"), { userData }, {}));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new common_1.apiResponse(500, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.get_payment_history_by_userId = get_payment_history_by_userId;
const paytm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, helper_1.reqInfo)(req);
    let { userId, amount } = req.body;
    try {
        let userData = yield database_1.userModel.findOne({ _id: ObjectId(userId) });
        if (userData.pendingFees <= 0)
            return res.status(405).json(new common_1.apiResponse(404, "Invalid amount", {}, {}));
        if (!userData)
            return res.status(404).json(new common_1.apiResponse(404, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.addDataError, {}, {}));
        const feesDetails = {
            amount: amount
        };
        const transactionDeatails = yield database_1.transactionModel.create({ userId: ObjectId(userId), feesDetails: feesDetails, totalAmount: amount, type: "online", status: "pending" });
        const transactionId = transactionDeatails._id;
        let paytmParams = {};
        paytmParams.body = {
            requestType: "Payment",
            mid: process.env.MID,
            websiteName: process.env.WEBSITE,
            orderId: transactionId,
            callbackUrl: process.env.BACKEND_URL + "/user/paytm/callback",
            txnAmount: {
                value: amount,
                currency: "INR",
            },
            userInfo: {
                custId: userId,
            },
        };
        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY).then(function (checksum) {
            paytmParams.head = {
                signature: checksum
            };
            let post_data = JSON.stringify(paytmParams);
            let options = {
                hostname: process.env.HOST_NAME,
                port: 443,
                path: '/theia/api/v1/initiateTransaction?mid=' + process.env.MID + '&orderId=' + transactionId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };
            let response = "";
            let post_req = https_1.default.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });
                post_res.on('end', function () {
                    let obj = JSON.parse(response);
                    let data = { env: process.env.HOST_NAME, mid: process.env.MID, amount: amount, orderid: transactionId, txntoken: obj.body.txnToken };
                    return res.status(200).json(new common_1.apiResponse(200, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.getDataSuccess("data"), { transactionDeatails, txnData: data }, {}));
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new common_1.apiResponse(500, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.paytm = paytm;
const paytm_callback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    console.log(body);
    try {
        let postbodyjson = JSON.parse(JSON.stringify(body));
        console.log(postbodyjson.CHECKSUMHASH);
        let checksum = postbodyjson.CHECKSUMHASH;
        delete postbodyjson['CHECKSUMHASH'];
        let verifyChecksum = PaytmChecksum.verifySignature(postbodyjson, process.env.MKEY, checksum);
        console.log(verifyChecksum);
        if (verifyChecksum) {
            if (postbodyjson.STATUS === 'TXN_SUCCESS') {
                const order = yield database_1.transactionModel.findOneAndUpdate({ _id: ObjectId(postbodyjson.ORDERID) }, { status: 'success' });
                yield database_1.userModel.findOneAndUpdate({ _id: ObjectId(order.userId) }, { $inc: { pendingFees: -order.totalAmount } });
                return res.status(200).json(new common_1.apiResponse(200, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.addDataSuccess('payment'), order, {}));
                // return res.redirect(process.env.FRONTEND_URL +`/success`);
            }
            else {
                database_1.transactionModel.findOneAndUpdate({ _id: ObjectId(postbodyjson.ORDERID) }, { status: 'failed' });
                return res.status(400).json(new common_1.apiResponse(400, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.addDataError, {}, {}));
                // return res.redirect(process.env.FRONTEND_URL +`/success`);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.paytm_callback = paytm_callback;
const paytm_txnStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paytmParams = {
        body: {
            mid: process.env.MID,
            orderId: 'Your_ORDERId_Here',
        },
        head: {
            signature: '',
        },
    };
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY).then((checksum) => {
        paytmParams.head.signature = checksum;
        const post_data = JSON.stringify(paytmParams);
        const options = {
            hostname: process.env.HOST_NAME,
            port: 443,
            path: '/v3/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length.toString(),
            },
        };
        let response = '';
        const post_req = https_1.default.request(options, (post_res) => {
            post_res.on('data', (chunk) => {
                response += chunk;
            });
            post_res.on('end', () => {
                const obj = JSON.parse(response);
                console.log('Obj => ', obj);
                res.render(__dirname + '/txnstatus.html', { data: obj.body, msg: obj.body.resultInfo.resultMsg });
            });
        });
        post_req.write(post_data);
        post_req.end();
    });
});
exports.paytm_txnStatus = paytm_txnStatus;
class PaytmChecksum {
    static encrypt(input, key) {
        var cipher = crypto_1.default.createCipheriv('AES-128-CBC', key, PaytmChecksum.iv);
        var encrypted = cipher.update(input, 'binary', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
    static decrypt(encrypted, key) {
        var decipher = crypto_1.default.createDecipheriv('AES-128-CBC', key, PaytmChecksum.iv);
        var decrypted = decipher.update(encrypted, 'base64', 'binary');
        try {
            decrypted += decipher.final('binary');
        }
        catch (e) {
            console.log(e);
        }
        return decrypted;
    }
    static generateSignature(params, key) {
        if (typeof params !== "object" && typeof params !== "string") {
            var error = "string or object expected, " + (typeof params) + " given.";
            return Promise.reject(error);
        }
        if (typeof params !== "string") {
            params = PaytmChecksum.getStringByParams(params);
        }
        return PaytmChecksum.generateSignatureByString(params, key);
    }
    static verifySignature(params, key, checksum) {
        if (typeof params !== "object" && typeof params !== "string") {
            var error = "string or object expected, " + (typeof params) + " given.";
            return Promise.reject(error);
        }
        if (params.hasOwnProperty("CHECKSUMHASH")) {
            delete params.CHECKSUMHASH;
        }
        if (typeof params !== "string") {
            params = PaytmChecksum.getStringByParams(params);
        }
        return PaytmChecksum.verifySignatureByString(params, key, checksum);
    }
    static generateSignatureByString(params, key) {
        return __awaiter(this, void 0, void 0, function* () {
            var salt = yield PaytmChecksum.generateRandomString(4);
            return PaytmChecksum.calculateChecksum(params, key, salt);
        });
    }
    static verifySignatureByString(params, key, checksum) {
        var paytm_hash = PaytmChecksum.decrypt(checksum, key);
        var salt = paytm_hash.substr(paytm_hash.length - 4);
        return (paytm_hash === PaytmChecksum.calculateHash(params, salt));
    }
    static generateRandomString(length) {
        return new Promise(function (resolve, reject) {
            crypto_1.default.randomBytes((length * 3.0) / 4.0, function (err, buf) {
                if (!err) {
                    var salt = buf.toString("base64");
                    resolve(salt);
                }
                else {
                    console.log("error occurred in generateRandomString: " + err);
                    reject(err);
                }
            });
        });
    }
    static getStringByParams(params) {
        var data = {};
        Object.keys(params).sort().forEach(function (key, value) {
            data[key] = (params[key] !== null && params[key].toLowerCase() !== "null") ? params[key] : "";
        });
        return Object.values(data).join('|');
    }
    static calculateHash(params, salt) {
        var finalString = params + "|" + salt;
        return crypto_1.default.createHash('sha256').update(finalString).digest('hex') + salt;
    }
    static calculateChecksum(params, key, salt) {
        var hashString = PaytmChecksum.calculateHash(params, salt);
        return PaytmChecksum.encrypt(hashString, key);
    }
}
PaytmChecksum.iv = '@@@@&&&&####$$$$';
//# sourceMappingURL=fees_details.js.map