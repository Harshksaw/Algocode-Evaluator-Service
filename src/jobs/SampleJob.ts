import { Job } from "bullmq";
import { IJob } from "../types/bullmqJobDefinition";

class SampleJob implements IJob{
    name: string;
    payload?: Record<string, unknown> | undefined;
    constructor(payload: Record<string, unknown> ){
        this.payload = payload;
        this.name = this.constructor.name;


    }

    handle = () =>{
        console.log(`Job ${this.name} is running with payload ${this.payload}`);
    }
    failed = (job : Job) : void =>{
        console.log(`Job ${this.name} failed with payload ${this.payload}`);

    }
}