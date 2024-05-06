"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const common_1 = require("../../common");
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    paymentType: { type: String, enum: common_1.payment_status, default: 'offline' },
    amount: { type: Number },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.orderModel = mongoose.model('order', orderSchema);
//# sourceMappingURL=order.js.map