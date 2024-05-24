import React from "react";
import ExcelJS from "exceljs";

const buttonStyle = {
    padding: "10px 16px",
    backgroundColor: "#EB6A4D",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    outline: "none",
    fontWeight: 600,
}

const ExcelDownloadButton = ({data}) => {
    
  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers
    worksheet.columns = Object.keys(data[0]).map((key) => ({header: key, key}));

    worksheet.getRow(1).eachCell((cell) => { // Target only the first row (header)
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "EB6A4D" },
        };
      });

    // Add rows (data)
    data.forEach((row) => worksheet.addRow(row));

    // Create a Blob and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";
    link.click();
  };

  return <button onClick={handleDownload} style={buttonStyle}>Download Excel</button>;
};

export default ExcelDownloadButton;
