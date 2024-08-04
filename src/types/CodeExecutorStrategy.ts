export default interface CodeExecutorStrategy {
excute(code: string, inputTestCases: string):Prommise<excutionResponse>
}

export type excutionResponse {output:string , error:string}