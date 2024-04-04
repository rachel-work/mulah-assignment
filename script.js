window.onload = () => {
    var table1 = document.getElementById("table1");
    if (table1) {
        fetch("Table_Input.csv")
            .then(res => res.text())
            .then(csv => {
                table1.innerHTML = "";
                let rows = csv.split("\r\n");
                for (let row of rows) {
                    let cols = row.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g);
                    if (cols != null) {
                        let tr = table.insertRow();
                        for (let col of cols) {
                            let td = tr.insertCell();
                            td.textContent = col.replace(/(^"|"$)/g, "");
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error loading file:', error);
            });
    } else {
        console.error('Table element not found.');
    }
};
