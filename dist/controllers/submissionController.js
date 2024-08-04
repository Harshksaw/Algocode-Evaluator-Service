"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubmission = void 0;
function addSubmission(req, res) {
    const submissionDto = req.body;
    console.log(submissionDto);
    // TODO: Add validation using zod
    return res.status(201).json({
        success: true,
        error: {},
        message: 'Successfully collected the submission',
        data: submissionDto
    });
}
exports.addSubmission = addSubmission;
