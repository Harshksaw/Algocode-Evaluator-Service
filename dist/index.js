"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
// import sampleQueueProducer from "./producers/sampleQueueProducer";
const routes_1 = __importDefault(require("./routes"));
// import SampleWorker from "./workers/SampleWorker";
// import bullBoardAdapter from "./config/bullBoardConfig";
// import runPython from "./containers/runPythonDocker";
const runJavaDocker_1 = __importDefault(require("./containers/runJavaDocker"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.text());
app.use('/api', routes_1.default);
// app.use('/ui', bullBoardAdapter.getRouter());
app.listen(serverConfig_1.default.PORT, () => {
    console.log(`Server started at *:${serverConfig_1.default.PORT}`);
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
        for(int i = 0; i < 999990; i++) {
            System.out.println(i);
            };
    }
}
  `;
    const inputTestCase = `10`;
    // runPython(code, "harsh");
    (0, runJavaDocker_1.default)(JavaCode, inputTestCase);
    // sampleQueueProducer('SampleJob', {
    //   name: "Harsh",
    //   company: "student",
    //   position: "SL61",
    //   locatiion: "Rema"
    // });
});
