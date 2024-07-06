import express, { Express } from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";
// import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
// import SampleWorker from "./workers/SampleWorker";
// import bullBoardAdapter from "./config/bullBoardConfig";
// import runPython from "./containers/runPythonDocker";
import runJava from "./containers/runJavaDocker";


const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());


app.use('/api', apiRouter);
// app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  // console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);
  
  // SampleWorker('SampleQueue');
  // const code = `
  // x = input()
  // print("value fo x is",x)
  // `;
  const JavaCode = `
  import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("input a number");
        String input = scanner.nextLine(); 
        System.out.println("value of input is " + input);
        for(int i = 0; i < input; i++) {
            System.out.println(i);
            };
    }
}
  `;
  const inputTestCase = `10`;

  // runPython(code, "harsh");
  runJava(JavaCode, inputTestCase);
  


  // sampleQueueProducer('SampleJob', {
  //   name: "Harsh",
  //   company: "student",
  //   position: "SL61",
  //   locatiion: "Rema"
  // });
});
