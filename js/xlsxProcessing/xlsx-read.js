const fileInput = document.querySelector(".file-input");
const fileInputBlock = document.querySelector(".input-file");
const instruction = document.querySelector(".teams__instructions");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const data = event.target.result;

        const rows = writeDataFromXlsx(data);
        const importedTeams = convertRowsToCommands(rows);
        teamsArray = teamsArray.concat(importedTeams);
        console.log(teamsArray);
        redistributeTheTeamColors(teamsArray);

        updateTeams();
    }

    reader.readAsArrayBuffer(file);
    fileInputBlock.classList.add("_hide");
    instruction.classList.add("_hide");
})

function writeDataFromXlsx(file) {
    const workbook = XLSX.read(file, { type: Array });

    const firstSheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[firstSheetName];

    const prepearedData = XLSX.utils.sheet_to_json(worksheet);

    return prepearedData;
}

function convertRowsToCommands(rows) {

    const importedTeams = Object.keys(rows[0]).map(teamName => ({ teamName, members: [] }));

    importedTeams.forEach(({ teamName, members }) => {
        rows.forEach(row => {
            if (teamName in row) {
                members.push(row[teamName]);
            }
        })
    })

    return importedTeams
}