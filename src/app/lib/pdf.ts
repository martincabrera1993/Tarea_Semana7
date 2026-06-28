import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { variable64 } from "../../assets/img";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type Product = {
  nombre: string;
  cantidad: number;
  total: number;
};

const generatePDF = (
  products: Product[],
  reciboNo: string,
  fecha: string
) => {

  const tableBody = [
    [
      { text: "Nombre producto", style: "tableHeader", color: "#1E3A8A" },
      { text: "Cantidad", style: "tableHeader", color:"#1E3A8A" },
      { text: "Total", style: "tableHeader", color:"#1E3A8A" },
    ],
    ...products.map((product) => [
      product.nombre,
      { text: product.cantidad.toString(), color: "#1E3A8A" },
      `$ ${product.total}`,
    ]),
  ];


  const totalGeneral = products.reduce((sum, product) => sum + product.total, 0);


  const content: any[] = [];


  content.push({
    columns: [
      {
        stack: [
          { text: `Fecha: ${fecha}`, style: "subheader", color: "#000000" },
        ],
        alignment: "right",
      },
    ],
  });

  content.push({ text: "\n" });


  content.push({
    table: {
      headerRows: 1,
      widths: ["*", "*", "*"],
      body: tableBody,
    },
    layout: "lightHorizontalLines",
    margin: [0, 10, 0, 10],
  });


  content.push({
    columns: [
      { text: "", width: "*" },
      {
        text: `Total: $ ${totalGeneral}`,
        color: "#1E3A8A",
        style: "total",
        fontSize: 16,
        alignment: "right",
        margin: [0, 10, 0, 10],
      },
    ],
  });

  const styles = {
    header: {
      fontSize: 14,
      bold: true,
    },
    subheader: {
      fontSize: 12,
      margin: [0, 5, 0, 5],
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
      color: "black",
    },
    total: {
      fontSize: 12,
      bold: true,
    },
  };


  const docDefinition: any = {
    content,
    styles,
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
