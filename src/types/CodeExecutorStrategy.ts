export default interface CodeExecutorStrategy {
excute(code: string, inputTestCases: string):Promise<excutionResponse>
}

export type excutionResponse = {output:string , error:string}