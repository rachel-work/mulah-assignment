window.onload = () => {
    var table = document.getElementById("table");
    fetch("Table_Input.csv")
        .then(res => res.text())
        .then(csv => {
            table.innerHTML = "";
            let rows = csv.split("\r\n");
            for (let row of rows) {
                let cols = row.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g);
                if (cols != null) {
                    let tr = table.insertRow();
                    for (let col of cols) {
                        let td = tr.insertCell();
                        td.textContent = col.replace(/(^"|"$)/g, "");
                        if (tr.cells.length % 2 === 0) {
                            td.classList.add("align-right");
                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error loading file:', error);
        });
};
