import sampleQueue from "../queues/sampleQueues";

export default async function sampleQueueProducers(payload : Record<string, unknown>){

    await sampleQueue.add(name , payload);
}