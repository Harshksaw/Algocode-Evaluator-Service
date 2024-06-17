import createContainer from "./containerFactory";
// import { TestCases } from '../types/testCases'
import { PYTHON_IMAGE } from "../utils/constants";

async function runPython(code: string) {
  console.log("Running Python Code");
  const rawLogBuffer :Buffer[] = [];

  // Ensure createContainer accepts an array of strings as the second argument
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "-c",
    code,
    "stty -echo",
  ]);

  // Ensure createContainer returns a Promise that resolves to a Container
  await pythonDockerContainer.start();

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, //whether the logs are steamed or returned as a string
  });

  //Attach events on the steam object to start ot stop the stream
  loggerStream.on("data", () => {
    rawLogBuffer.push(chunk);
  });

  loggerStream.on("end", () => {
    console.log("Stream Ended",rawLogBuffer);
    
  });

  return pythonDockerContainer;
}

export default runPython;
