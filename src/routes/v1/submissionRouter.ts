import express from 'express';
import { validate } from '../../validations/createSubmissionValidator';
import { createSubmissionZodSchema } from '../../dtos/CreateSubmmissionDto';
import { addSubmission } from '../../controllers/submissionController';


const submissionRouter = express.Router();

submissionRouter.post('/', 
    validate(createSubmissionZodSchema),
    addSubmission
);

export default submissionRouter;