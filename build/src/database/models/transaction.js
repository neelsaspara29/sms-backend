"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionModel = void 0;
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    feesDetails: [
        {
            feeName: { type: String },
            amount: { type: Number }
        }
    ],
    totalAmount: { type: Number },
    type: { type: String, enum: ["offline", "online"], default: "offline" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.transactionModel = mongoose.model('transaction', transactionSchema);
//# sourceMappingURL=transaction.js.map