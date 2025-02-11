import { useEffect } from "react";

const BookScanner = ({ onScan }:any) => {
  // useEffect(() => {
  //   Quagga.init(
  //     {
  //       inputStream: {
  //         type: "LiveStream",
  //         constraints: {
  //           facingMode: "environment", // Use the back camera
  //         },
  //       },
  //       decoder: {
  //         readers: ["ean_13_reader", "ean_8_reader"], // Supports ISBN barcodes
  //       },
  //     },
  //     (err: any) => {
  //       if (err) {
  //         console.error("QuaggaJS init error:", err);
  //         return;
  //       }
  //       Quagga.start();
  //     }
  //   );

  //   Quagga.onDetected((data: any) => {
  //     const isbn = data.codeResult.code;
  //     onScan(isbn);
  //     Quagga.stop(); // Stop scanning after detecting one barcode
  //   });

  //   return () => {
  //     Quagga.stop();
  //   };
  // }, [onScan]);

  return <div id="scanner" style={{ width: "100%", height: "300px" }}></div>;
};

export default BookScanner;
