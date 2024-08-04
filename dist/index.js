"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const bullBoardConfig_1 = __importDefault(require("./config/bullBoardConfig"));
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
const submissionQueueProducer_1 = __importDefault(require("./producers/submissionQueueProducer"));
const routes_1 = __importDefault(require("./routes"));
const constants_1 = require("./utils/constants");
const SampleWorker_1 = __importDefault(require("./workers/SampleWorker"));
const SubmissionWorker_1 = __importDefault(require("./workers/SubmissionWorker"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use('/api', routes_1.default);
app.use('/ui', bullBoardConfig_1.default.getRouter());
app.listen(serverConfig_1.default.PORT, () => {
    console.log(`Server started at *:${serverConfig_1.default.PORT}`);
    console.log(`BullBoard dashboard running on: http://localhost:${serverConfig_1.default.PORT}/ui`);
    (0, SampleWorker_1.default)('SampleQueue');
    (0, SubmissionWorker_1.default)(constants_1.submission_queue);
    const userCode = `
  
    class Solution {
      public:
      vector<int> permute() {
          vector<int> v;
          v.push_back(10);
          return v;
      }
    };
  `;
    const code = `
  #include<iostream>
  #include<vector>
  #include<stdio.h>
  using namespace std;
  
  ${userCode}

  int main() {

    Solution s;
    vector<int> result = s.permute();
    for(int x : result) {
      cout<<x<<" ";
    }
    cout<<endl;
    return 0;
  }
  `;
    const inputCase = `10
`;
    (0, submissionQueueProducer_1.default)({ "1234": {
            language: "CPP",
            inputCase,
            code
        } });
    //   runCpp(code, inputCase);
});
