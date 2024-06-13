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
const dockerode_1 = __importDefault(require("dockerode"));
function createContainer(imageName, cmdExecutable) {
    return __awaiter(this, void 0, void 0, function* () {
        const docker = new dockerode_1.default();
        const container = yield docker.createContainer({
            Image: imageName,
            Cmd: cmdExecutable,
            AttachStdin: true, //standard input stream
            AttachStdout: true, //standard output stream
            AttachStderr: true, //standard error stream
            Tty: true, //allocate a pseudo-tty 
            OpenStdin: true, //open standard input kkep the input stream open even no interaction is there
        });
        return container;
    });
}
exports.default = createContainer;
