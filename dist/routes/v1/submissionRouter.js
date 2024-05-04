"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createSubmissionValidator_1 = require("../../validations/createSubmissionValidator");
const CreateSubmmissionDto_1 = require("../../dtos/CreateSubmmissionDto");
const submissionController_1 = require("../../controllers/submissionController");
const submissionRouter = express_1.default.Router();
submissionRouter.post('/', (0, createSubmissionValidator_1.validate)(CreateSubmmissionDto_1.createSubmissionZodSchema), submissionController_1.addSubmission);
exports.default = submissionRouter;
