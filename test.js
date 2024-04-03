// Function to handle file upload and process data
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const contents = e.target.result;
      const rows = contents.split('\n').map(row => row.trim());
      const tableData = rows.map(row => {
        const [Category, Value] = row.split(',');
        return { Category, Value: parseInt(Value) }; // Assuming Value is a number
      });
  
      // Generate and display Table 1
      generateTableRows(tableData, "table1");
  
      // Generate and display Table 2
      const table2Data = calculateTable2Data(tableData);
      generateTableRows(table2Data, "table2");
    };
  
    reader.readAsText(file);
  }
  
  // Attach event listener to file input element
  const fileInput = document.getElementById('./Table_Input.csv');
  fileInput.addEventListener('change', handleFileUpload);
  
  // Function to calculate values for Table 2 based on Table 1 data
  function calculateTable2Data(data) {
    const table2Data = [];
    data.forEach(item => {
      let value;
      if (item.Category === "Alpha") {
        value = item.Value + 20;
      } else if (item.Category === "Beta") {
        value = Math.floor(item.Value / 7);
      } else if (item.Category === "Charlie") {
        value = item.Value * 12;
      }
      table2Data.push({ Category: item.Category, Value: value });
    });
    return table2Data;
  }
  
  // Function to generate HTML table rows
  function generateTableRows(data, tableId) {
    const table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear existing table content
    data.forEach(item => {
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      cell1.textContent = item.Category;
      cell2.textContent = item.Value;
    });
  }
  