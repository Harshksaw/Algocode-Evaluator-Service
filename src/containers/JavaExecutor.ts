// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

class JavaExecutor implements CodeExecutorStrategy{

   async  excute(code: string, inputTestCases: string): Promise<excutionResponse> {

        const rawLogBuffer: Buffer[] = [];





    await pullImage(JAVA_IMAGE);

    console.log("Initialising a new java docker container");
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    console.log(runCommand);
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 


    // starting / booting the corresponding docker container
    await javaDockerContainer.start();

    console.log("Started the docker container");

    const loggerStream = await javaDockerContainer.logs({
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
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodeDockerStream);
        });
    });
    try {
        const codeResponse : string = await this.fetchDecodedStream(loggerStream, rawLogBuffer);
        return {output : codeResponse, status: "COMPLETED"};
        
    } catch (error) {

        return {output : error as string, status: "ERROR"};

    }finally{
        await javaDockerContainer.remove();
    }

}

    fetchDecodedStream(loggerStream : ReadableStream, rawLogBuffer: Buffer){

        //TODO move this to a helper function
        
        return new Promise((res) => {
            loggerStream.on('end', () => {
                console.log(rawLogBuffer);
                const completeBuffer = Buffer.concat(rawLogBuffer);
                const decodedStream = decodeDockerStream(completeBuffer);
                console.log(decodedStream);
                console.log(decodedStream.stdout);
                if(decodedStream.stderr){
                    res(decodedStream.stderr);
                }else{
                    rej(decodedStream.stdout);
                }

            });
        })

    }
    // remove the container when done with it
    

     
    }
export default JavaExecutor;