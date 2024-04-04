window.onload = () => {
    var table1 = document.getElementById("table1");
    if (table1) {
        // read .csv file
        fetch("Table_Input.csv")
            .then(res => res.text())
            .then(csv => {
                table1.innerHTML = "";
                let rows = csv.split("\r\n");

                // extract table header
                let headerCols = rows[0].split(',');
                let headerRow = table1.insertRow();
                for (let col of headerCols) {
                    let th = document.createElement('th');
                    th.textContent = col.trim(); 
                    headerRow.appendChild(th); 
                }
                
                // populate the rest of the table
                for (let i = 1; i < rows.length; i++) {
                    let cols = rows[i].split(',');
                    let tr = table1.insertRow();
                    for (let j = 0; j < cols.length; j++) {
                        let td = tr.insertCell();
                        td.textContent = cols[j].trim();
                        if (j === 1) {
                            td.classList.add('align-right');
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error loading file:', error);
            });
    } else {
        console.error('Table 1 element not found.');
    }
};
