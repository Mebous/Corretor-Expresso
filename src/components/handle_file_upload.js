export function handleFileUpload(file) {
    return new Promise((resolve, reject) => {
        // Verifica se o arquivo é do tipo esperado
        if (!file || file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            return reject(new Error("Formato do arquivo inválido"));
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            resolve(workbook);
        };

        reader.onerror = function(error) {
            reject(new Error("Erro ao ler o arquivo (generio): " + error.message));
        };

        reader.readAsArrayBuffer(file);
    });
}