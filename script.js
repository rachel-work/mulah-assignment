window.onload = () => {
    var table = document.getElementById("table");
    fetch("Table_Input.csv")
        .then(response => response.text())
        .then(csv => {
            table.innerHTML = ""; // Clear existing table content
            let rows = csv.split(/\r?\n/); // Split rows using new line characters
            rows.forEach(row => {
                let cols = row.split(","); // Split each row into columns using comma as delimiter
                let tr = document.createElement("tr"); // Create a new table row
                cols.forEach(col => {
                    let td = document.createElement("td"); // Create a new table cell
                    td.textContent = col.trim(); // Set cell content and trim whitespace
                    tr.appendChild(td); // Append cell to row
                });
                table.appendChild(tr); // Append row to table
            });
        })
        .catch(error => {
            console.error('Error loading file:', error);
        });
};
