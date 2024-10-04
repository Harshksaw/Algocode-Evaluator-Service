import JavaExecutor from "../containers/JavaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/CodeExecutorStrategy";

export default function createExecutor(codeLanguage: string) : CodeExecutorStrategy | null {

    if(codeLanguage === 'CPP') {
        // return new CppExecutor();
        console.log("Initialising a new cpp docker container"); 

    }
    else if(codeLanguage === 'JAVA') {
        return new JavaExecutor();
    }
    else if(codeLanguage === 'PYTHON') {
        return new PythonExecutor();
    }
    else {
        throw new Error("Unsupported language");
    }



}