import express from 'express';


const submissionRouter = express.Router();

submissionRouter.post('/', (req, res) => {
    res.send('Submission added successfully');
});

export default submissionRouter;