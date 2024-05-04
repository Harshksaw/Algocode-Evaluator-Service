"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionRouter = express_1.default.Router();
submissionRouter.post('/', (req, res) => {
    res.send('Submission added successfully');
});
exports.default = submissionRouter;
