import { getExcelColumnLabel } from "./get_exel_column_label.js"

const textFormat = {
    font: {
        name: "JetBrains Mono",
        sz: "12"
    }
}

const centralize = {
    alignment: {
        horizontal: 'center', 
        vertical: 'center'
    }
}

const title = {
    ...textFormat,
    font: {
        bold: true,  
        sz: "16"
    },
    ...centralize
}

const header = {
    ...textFormat,
    font: {
        bold: true
    }
}


export function stylize (worksheet, worksheetData) {
    // Mesclar células (primeira linha unida)
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: (worksheetData[1].length-1 ) }  }  // Mesclar da célula A1 a E1
    ]
    worksheet['A1'].s = {
        ...title
    }

    //Estilizando o Conteudo
    for (
        let i = 0;
        i < worksheetData[1].length+1;
        i++
    ) {
        const letter = getExcelColumnLabel(i)

        for (
            let j = 2;
            j < worksheetData.length + 2;
            j++
        ) {
            const cell = worksheet[`${letter}${j}`]
            if (cell) {
                if (!(i < 2 && j > 2)) {
                    cell.s = {
                        ...cell.s,
                        ...centralize
                    }
                }

                if (j == 2) {
                    cell.s = {
                        ...cell.s,
                        ...header,
                        alignment: {
                            ...cell.s.alignment,
                            wrapText: true
                        }
                    }
                }
            }
        }
    }

    return worksheet
}
