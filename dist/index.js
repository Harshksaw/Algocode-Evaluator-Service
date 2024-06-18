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
const runPythonDocker_1 = __importDefault(require("./containers/runPythonDocker"));
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
    const code = `
  x = input()
  print("value fo x is",x)
  `;
    (0, runPythonDocker_1.default)(code);
    // sampleQueueProducer('SampleJob', {
    //   name: "Harsh",
    //   company: "student",
    //   position: "SL61",
    //   locatiion: "Rema"
    // });
});
