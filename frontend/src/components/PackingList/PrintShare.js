import React from "react";
import { Button } from 'react-bootstrap';

const PrintShare = ({ tripDetails, packingList }) => {
  const generatePrintContent = () => {
    return Object.entries(packingList)
      .map(
        ([category, items]) => `
            <div>
              <h3>${category.toUpperCase()}</h3>
              <ul>
                ${items
                  .map(
                    (item) => `
                  <li>
                    <input type="checkbox" ${item.packed ? "checked" : ""}>
                    ${item.name} (Qty: ${item.quantity})
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          `
      )
      .join("");
  };

  const handleShare = () => {
    const shareContent = Object.entries(packingList)
      .map(
        ([category, items]) =>
          `${category.toUpperCase()}:\n` +
          items
            .map(
              (item) =>
                `${item.packed ? "✓" : "☐"} ${item.name} (Qty: ${
                  item.quantity
                })`
            )
            .join("\n")
      )
      .join("\n\n");

    if (navigator.share) {
      navigator
        .share({
          title: `Packing List for ${tripDetails.destination}`,
          text: shareContent,
        })
        .catch(console.error);
    } else {
      alert("Sharing not supported on this browser");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=500, width=500");
    printWindow.document.write(`
          <html>
            <head>
              <title>Packing List for ${tripDetails.destination}</title>
              <style>
                body { font-family: Arial, sans-serif; }
                h2 { text-align: center; }
                h3 { margin-bottom: 10px; text-transform: capitalize; }
                ul { list-style-type: none; padding-left: 0; }
                li { margin-bottom: 5px; }
                input[type="checkbox"] { margin-right: 10px; }
              </style>
            </head>
            <body>
              <h2>Packing List for ${tripDetails.destination}</h2>
              <p><strong>Trip Details:</strong> ${tripDetails.startDate} - ${
      tripDetails.endDate
    }, ${tripDetails.travelers} travelers, ${tripDetails.tripType}</p>
              ${generatePrintContent()}
            </body>
          </html>
        `);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <>
      <div>
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button variant="outline-primary" onClick={handleShare}>
          Share
        </Button>
      </div>
    </>
  );
};

export default PrintShare;
