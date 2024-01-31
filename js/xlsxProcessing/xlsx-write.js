const createTebleBtn = document.querySelector("._export-table-btn");



createTebleBtn.addEventListener("click", () => {
    writeDataToXlsx(exportGroupArr)
})


function writeDataToXlsx(data) {
    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Vlad Luchko",
        CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push("Test Sheet");
    let ws_data = data;
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s) {

        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'отборочные группы.xlsx');
}