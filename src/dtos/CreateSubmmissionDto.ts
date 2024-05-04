import { z } from "zod";




export const createSubmissionZodSchema = z.object({
    userId: z.string(),
    problemId: z.string().uuid(),
    code: z.string().min(1),
    language: z.string().min(1)
    
}).strict();

//infer the type of the schema
export type CreateSubmissionDto = z.infer<typeof createSubmissionZodSchema>;