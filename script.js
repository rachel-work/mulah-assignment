// window.onload = () => {
//     var table1 = document.getElementById("table1");
//     if (table1) {
//         fetch("Table_Input.csv")
//             .then(res => res.text())
//             .then(csv => {
//                 table1.innerHTML = "";
//                 let rows = csv.split("\r\n");
//                 // Assuming the first row in your CSV file contains column headers
//                 let headerCols = rows[0].split(',');
//                 let headerRow = table1.insertRow(); // Create the header row
//                 for (let col of headerCols) {
//                     let th = document.createElement('th'); // Create a <th> element
//                     th.textContent = col.trim(); // Set the content of the <th>
//                     headerRow.appendChild(th); // Append the <th> to the header row
//                 }
//                 // Loop starts from index 1 to skip the header row in the CSV data
//                 for (let i = 1; i < rows.length; i++) {
//                     let cols = rows[i].split(',');
//                     let tr = table1.insertRow();
//                     for (let j = 0; j < cols.length; j++) {
//                         let td = tr.insertCell();
//                         td.textContent = cols[j].trim();
//                         // Apply align-right class to cells in the right column (index 1)
//                         if (j === 1) {
//                             td.classList.add('align-right');
//                         }
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.error('Error loading file:', error);
//             });
//     } else {
//         console.error('Table 1 element not found.');
//     }
// };


window.onload = () => {
    var table1 = document.getElementById("table1");
    if (table1) {
        fetch("Table_Input.csv")
            .then(res => res.text())
            .then(csv => {
                table1.innerHTML = "";
                let rows = csv.split("\r\n");
                // Assuming the first row in your CSV file contains column headers
                let headerCols = rows[0].split(',');
                let headerRow = table1.insertRow(); // Create the header row
                for (let col of headerCols) {
                    let th = document.createElement('th'); // Create a <th> element
                    th.textContent = col.trim(); // Set the content of the <th>
                    headerRow.appendChild(th); // Append the <th> to the header row
                }
                // Loop starts from index 1 to skip the header row in the CSV data
                for (let i = 1; i < rows.length; i++) {
                    let cols = rows[i].split(',');
                    let tr = table1.insertRow();
                    for (let j = 0; j < cols.length; j++) {
                        let td = tr.insertCell();
                        td.textContent = cols[j].trim();
                        // Apply align-right class to cells in the right column (index 1)
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

    function calculateTable2Data() {
        const table1Rows = Array.from(table1.rows).slice(1); // Skip the header row
        const table2 = document.getElementById("table2");
        table2.innerHTML = '';
    
        // Define the formulas for Alpha, Beta, and Charlie
        const formulas = {
            Alpha: "A5 + A20",
            Beta: "A15 / A7",
            Charlie: "A13 * A12"
        };
    
        // Loop through the formulas and calculate the values for Table 2
        for (let category in formulas) {
            let value = calculateFormula(formulas[category]);
            
            const row = table2.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = category;
            cell2.textContent = value;
        }
    }

    function calculateFormula(formula) {
        const [op1, operator, op2] = formula.split(' ');
        const value1 = parseInt(table1.rows[parseInt(op1.slice(1))].cells[1].textContent.trim());
        const value2 = parseInt(table1.rows[parseInt(op2.slice(1))].cells[1].textContent.trim());
        
        switch (operator) {
            case '+':
                return value1 + value2;
            case '/':
                return Math.floor(value1 / value2);
            case '*':
                return value1 * value2;
            default:
                return 0; // Handle invalid formulas
        }
    }
    calculateTable2Data();
};
