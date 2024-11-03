export function getExcelColumnLabel(columnIndex) {
    if (columnIndex <= 26) {
        return String.fromCharCode(64 + columnIndex);
    } else {
        return getExcelColumnLabel(Math.floor((columnIndex - 1) / 26)) +
        String.fromCharCode(65 + ((columnIndex - 1) % 26));
    }
}