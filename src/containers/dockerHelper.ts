import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  //read data of buffer and read chunk by chunk
  let offset = 0; //This will be used to keep track of the current position of the buffer

  //The output that will store accumulate stdout and stderr output as strings
  const output: DockerStreamOutput = {
    stdout: "",
    stderr: "",
  };
  //loop utill offet reaches end of the buffer

  while (offset < buffer.length) {
    //channel is read from buffer and has value of type of stream
    const channel = buffer[offset];

    //increment offset by 8 bytes to read the next 8 bytes which will be the length of the data

    offset += DOCKER_STREAM_HEADER_SIZE;
    //we will read this varibale on an offset , this will be the length of the data
    const length = buffer.readUInt32BE(offset + 4);

    if (channel === 1) {
      //stdout stream
      output.stdout += buffer.toString("utf-8", offset, offset + length); // type , start , end
    } else if (channel === 2) {
      //stderr stream
      output.stderr += buffer.toString("utf-8", offset, offset + length); // type , start , end
    }

    //increment offset by length of the data
  }
}
