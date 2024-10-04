"use strict";
// import Docker from 'dockerode';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { TestCases } from '../types/testCases';
const constants_1 = require("../utils/constants");
const containerFactory_1 = __importDefault(require("./containerFactory"));
const dockerHelper_1 = __importDefault(require("./dockerHelper"));
const pullImage_1 = __importDefault(require("./pullImage"));
function runPython(code, inputTestCase) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawLogBuffer = [];
        yield (0, pullImage_1.default)(constants_1.PYTHON_IMAGE);
        console.log("Initialising a new python docker container");
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
        console.log(runCommand);
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
        const pythonDockerContainer = yield (0, containerFactory_1.default)(constants_1.PYTHON_IMAGE, [
            '/bin/sh',
            '-c',
            runCommand
        ]);
        // starting / booting the corresponding docker container
        yield pythonDockerContainer.start();
        console.log("Started the docker container");
        const loggerStream = yield pythonDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
        // Attach events on the stream objects to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });
        yield new Promise((res) => {
            loggerStream.on('end', () => {
                console.log(rawLogBuffer);
                const completeBuffer = Buffer.concat(rawLogBuffer);
                const decodedStream = (0, dockerHelper_1.default)(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);
                res(dockerHelper_1.default);
            });
        });
        // remove the container when done with it
        yield pythonDockerContainer.remove();
    });
}
exports.default = runPython;
