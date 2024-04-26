import express from "express";


const app = express();


app.post("/", ()=>{

})

app.listen(3000, ()=>{
    console.log(`Listening at port ${3000}`);
    console.log("wowowoow")
})