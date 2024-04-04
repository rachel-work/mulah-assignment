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
    console.log(table1.rows[0]);
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
        // Extract the operands and operator from the formula
        const [operand1, operator, operand2] = formula.split(' ');
        console.log(operand1, operator, operand2);
        // Extract numeric values from operands
        const value1 = extractValueFromOperand(operand1);
        const value2 = extractValueFromOperand(operand2);
    
        // If values couldn't be extracted, return 0
        if (value1 === null || value2 === null) {
            console.error('Invalid operands:', operand1, operand2);
            return 0;
        }
    
        // Perform the corresponding mathematical operation
        switch (operator) {
            case '+':
                return value1 + value2;
            case '/':
                return Math.floor(value1 / value2);
            case '*':
                return value1 * value2;
            default:
                console.error('Invalid operator:', operator);
                return 0; // Handle invalid formulas
        }
    }

    function extractValueFromOperand(operand) {
        // Check if table1 exists
        if (!table1) {
            console.error('Table 1 not found.');
            return null;
        }
    
        // Extract the numeric part from the operand
        const rowIndex = parseInt(operand.slice(1));
        console.log('Operand:', operand);
        console.log('Extracted Row Index:', rowIndex);
    
        // Check if the extracted row index is valid
        if (isNaN(rowIndex) || rowIndex < 1 || rowIndex > table1.rows.length) {
            console.error('Invalid row index for operand:', operand);
            return null;
        }
    
        // Get the row from table1
        const row = table1.rows[rowIndex - 1]; // Adjusted for zero-based indexing
        console.log('Row:', row);
    
        // Check if the row is found
        if (!row) {
            console.error('Row not found for operand:', operand);
            return null;
        }
    
        // Get the value from the second cell of the row
        const cellValue = row.cells[1];
        console.log('Cell Value:', cellValue);
    
        // Convert the extracted value to an integer
        const numericValue = parseInt(cellValue);
        if (isNaN(numericValue)) {
            console.error('Invalid value for operand:', operand, cellValue);
            return null;
        }
    
        // Return the extracted numeric value
        return numericValue;
    }

    calculateTable2Data();
};
