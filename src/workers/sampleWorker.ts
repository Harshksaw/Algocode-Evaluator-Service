import { Worker } from "bullmq";
import { WorkerResponse } from "../types/bullMqWorkerResponse";
import { SampleJob } from "../jobs/SampleJob";

export default function SampleWorker(queueName : string){

    const worker = new Worker(queueName,
         async (job :  Job) =>{
            if(job.name === "SampleJob"){
                {
                    const SampleJobInstance = new SampleJob(job.data);

                    SampleJobInstance.handle(job);

                    return true;

                }
         }}
        )

}