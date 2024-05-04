"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmissionZodSchema = void 0;
const zod_1 = require("zod");
exports.createSubmissionZodSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    problemId: zod_1.z.string().uuid(),
    code: zod_1.z.string().min(1),
    language: zod_1.z.string().min(1)
}).strict();
