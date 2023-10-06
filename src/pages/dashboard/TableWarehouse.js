import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';

const TableWarehouse = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Translate column names from Vietnamese to English
      const englishColumnNames = {
        'Loại nhập kho': 'type',
        'Ngày hạch toán': 'accountingDate'
        // Translate other column names here
      };

      // Assuming the first row in your Excel file contains headers
      console.log(excelData);
      const headers = excelData[0];
      const formattedData = excelData
        .slice(1)
        .filter((item) => item.length > 0)
        .map((row, index) => {
          console.log(row);
          const rowData = { id: index + 1 }; // Unique ID for Data Grid row
          headers.forEach((header, columnIndex) => {
            const englishHeader = englishColumnNames[header] || header;
            rowData[englishHeader] = row[columnIndex];
          });
          return rowData;
        });

      // Set columns based on headers in Excel file
      const gridColumns = headers.map((header) => {
        const englishHeader = englishColumnNames[header] || header;
        return {
          field: englishHeader,
          headerName: header,
          width: 150 // Set width as needed
        };
      });

      setColumns(gridColumns);
      setRows(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="data-grid-container" style={{ width: '100%' }}>
      <input type="file" onChange={handleFileUpload} />
      {rows.length > 0 && (
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            // rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection
            disableSelectionOnClick
            // disableColumnMenu // Disable column menu
            autoHeight // Enable auto height
            showCellRightBorder={true}
            showCellVerticalBorder={true}
            showColumnVerticalBorder={true}
            sx={{
              borderColor: '#e7e7e7',
              '& .MuiDataGrid-cell': {
                border: 1,
                borderRight: 0,
                borderTop: 1,
                borderColor: '#e7e7e7'
                // add more css for customization
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TableWarehouse;
