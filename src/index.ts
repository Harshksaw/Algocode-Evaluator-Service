import express from "express";
import sampleQueueProducers from "./producers/sampleQueueProducers";


const app = express();


app.post("/", ()=>{

})

app.listen(3000, ()=>{
    console.log(`Listening at port ${3000}`);
    console.log("wowowoow")

})