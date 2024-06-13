"use strict";
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
const containerFactory_1 = __importDefault(require("./containerFactory"));
// import { TestCases } from '../types/testCases'
const constants_1 = require("../utils/constants");
function runPython(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Running Python Code');
        // Ensure createContainer accepts an array of strings as the second argument
        const pythonDockerContainer = yield (0, containerFactory_1.default)(constants_1.PYTHON_IMAGE.PYTHON_VERSION, ['python3', '-c', code, 'stty -echo']);
        // Ensure createContainer returns a Promise that resolves to a Container
        yield pythonDockerContainer.start();
        const loggerStream = yield pythonDockerContainer.logs({
            stdout: true,
            stderr: true,
            timeStamps: false,
            follow: true
        });
        return pythonDockerContainer;
    });
}
exports.default = runPython;
