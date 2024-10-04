import { Job } from "bullmq";

import runCpp from "../containers/runCpp";
import { IJob } from "../types/bullMqJobDefinition";
import { SubmissionPayload } from "../types/submissionPayload";
import createExecutor from "../utils/ExecutorFactory";
import { excutionResponse } from "../types/CodeExecutorStrategy";

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;
  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = async (job?: Job) => {
    console.log("Handler of the job called");
    console.log(this.payload);
    if (job) {
      const key = Object.keys(this.payload)[0];
      const codeLanguage = this.payload[key].language;

      const code = this.payload[key].code;
      const inputTestCase = this.payload[key].inputCase;
      const strategy = createExecutor(codeLanguage);

      if (strategy != null) {
        const response:excutionResponse = await strategy.excute(code, inputTestCase);
        console.log("🚀 ~ SubmissionJob ~ handle= ~ response:", response)
        if(response.status === 'COMPLETED') {
          console.log("Output is", response.output);
        }
        else {
          console.log("Error is", response.error);
        }
      }

      // console.log(this.payload[key].language);
      // if(this.payload[key].language === 'CPP') {
      //     const response = await runCpp(this.payload[key].code, this.payload[key].inputCase);
      //     console.log("Evaluated response is", response);
      // }
    }
  };

  failed = (job?: Job): void => {
    console.log("Job failed");
    if (job) {
      console.log(job.id);
    }
  };
}
