// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
// import pullImage from './pullImage';


async function runCpp(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    // await pullImage(Cpp_IMAGE);


    console.log("Initialising a new Cpp docker container");
    const runCommand = `echo '${code.replace(/'/g, `'\\'`)}' > main.cpp && g++ main.cpp -o && echo '${inputTestCase.replace(/' /g, `'\\"`)}' |  ./main`;
    console.log(runCommand);

    const CppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 


    // starting / booting the corresponding docker container
    await CppDockerContainer.start();

    console.log("Started the docker container");

    const loggerStream = await CppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string
    });
    
    // Attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    });

    await new Promise((res) => {
        loggerStream.on('end', () => {

            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodeDockerStream);
        });
    });
    
    // remove the container when done with it
    await CppDockerContainer.remove();

}       

export default runCpp;