

import createContainer from './containerFactory'
// import { TestCases } from '../types/testCases'
import { PYTHON_IMAGE } from '../utils/constants';

async function runPython(code : string){
    console.log('Running Python Code')

    // Ensure createContainer accepts an array of strings as the second argument
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE.PYTHON_VERSION, ['python3', '-c', code, 'stty -echo'])


    // Ensure createContainer returns a Promise that resolves to a Container
    await pythonDockerContainer.start()

    const loggerStream = await pythonDockerContainer.logs({

        stdout: true,
        stderr: true,
        timeStamps: false,
        follow: true
    }

    )

    return pythonDockerContainer;
}

export default runPython;