export default function createCodeCreator(startingCode: string, middleCode: string,

    endCode: string ):string {
        return `
        ${startingCode }

        ${middleCode }

        ${endCode }
        `

    }