export function getSheetData(page_number, workbook) {
    const sheetName = workbook.SheetNames[page_number]
    const worksheet = workbook.Sheets[sheetName]

    // Converte a planilha em JSON
    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    return sheetData
}