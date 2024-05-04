"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubmission = void 0;
Import;
{
    Request, Response;
}
from;
'express';
function addSubmission(req, res) {
    const submissionDto = req.body;
    //TODO add Validation using zod
    return res.status(201).json({
        success: true,
        error: {},
        message: 'Submission added successfully',
        data: submissionDto
    });
}
exports.addSubmission = addSubmission;
