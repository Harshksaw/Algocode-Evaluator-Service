import { CreateSubmissionDto } from "../dtos/CreateSubmmissionDto";

import {Request, Response} from 'express';  


export function addSubmission(req: Request, res: Response) {
    const submissionDto = req.body as CreateSubmissionDto;


    //TODO add Validation using zod

    return res.status(201).json({
        success: true,
        error: {},
        message: 'Submission added successfully',
        data: submissionDto
    })


}