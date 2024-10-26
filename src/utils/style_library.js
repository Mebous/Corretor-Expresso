const textFormat = {
    font: {
        name: "JetBrains Mono",
        sz: "12"
    }
}

const centralize = {
    alignment: {
        horizontal: 'center', 
        //vertical: 'center'
    }
}

const title = {
    ...textFormat,
    fill: {
        fgColor: { rgb: "92CDDC" }
    },
    font: {
        bold: true,  // Definir o texto em negrito
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

//Headers
const neutral = {
    fill: {
        fgColor: { rgb: "92CDDC" } 
    }
}
const percentage = {
    fill: {
        fgColor: { rgb: "2E9E5E" } 
    }
}
const correct  = {
    fill: {
        fgColor: { rgb: "8CE29E" } 
    }
}
const wrong = {
    fill: {
        fgColor: { rgb: "E48A8A" } 
    }
}

const headers = [neutral, percentage, correct, wrong, neutral]


export function stylize (worksheet, worksheetData) {
    // Mesclar células (primeira linha unida)
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: (worksheetData[1].length-1 ) }  }  // Mesclar da célula A1 a E1
    ]
    worksheet['A1'].s = {
        ...title
    }

    //Estilzando o Cabeçalho
    for (
        let i = 1;
        i < worksheetData.length + 2;
        i++
    ) {
        const cell = worksheet[`${String.fromCharCode(64 + i)}2`]
        if (cell) {
            cell.s = {    
                ...cell.s,
                ...header,
                ...(headers.length < i-1 ? headers[i-1] : {})
            }
        }
    }

    //Centralizar as Colunas Depois do Nome
    for (
        let i = 2;
        i < worksheetData[1].length+1;
        i++
    ) {
        const letter = String.fromCharCode(64 + i)
        for (
            let j = 2;
            j < worksheetData.length + 2;
            j++
        ) {
            const cell = worksheet[`${letter}${j}`]
            
            if (cell) {
                cell.s = {
                    ...cell.s,
                    ...centralize
                }
            }
        }
    }

    return worksheet
}


// ///GAMBIARRA
// export function applyConditionalFormatting(worksheet, range) {
//     for (
//         let row = range.s.r; 
//         row <= range.e.r; 
//         row++
//     ) {
//         for (
//             let col = range.s.c; 
//             col <= range.e.c; 
//             col++
//         ) {
//             const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
//             const cell = worksheet[cellAddress];
            
//             if (cell && cell.v) {
//                 const cellValue = parseFloat(cell.v);  // Pega o valor como número
//                 if (!isNaN(cellValue)) {
//                     // Aplicar cor de fundo baseada no valor
//                     if (cellValue < 0.5) {
//                         cell.s = {
//                             fill: {
//                                 fgColor: { rgb: "FF9999" }  // Vermelho para < 50%
//                             },
//                             font: {
//                                 color: { rgb: "000000" }
//                             }
//                         };
//                     } else if (cellValue === 0.5) {
//                         cell.s = {
//                             fill: {
//                                 fgColor: { rgb: "FFFF99" }  // Amarelo para 50%
//                             },
//                             font: {
//                                 color: { rgb: "000000" }
//                             }
//                         };
//                     } else if (cellValue > 0.5) {
//                         cell.s = {
//                             fill: {
//                                 fgColor: { rgb: "99FF99" }  // Verde para > 50%
//                             },
//                             font: {
//                                 color: { rgb: "000000" }
//                             }
//                         };
//                     }
//                 }
//             }
//         }
//     }
// }
