import React from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "flowbite-react";

type PdfFormFillerProps = {
  etudiant: string;
  entreprise: string;
  sujet: string;
};

const PdfFormFiller: React.FC<PdfFormFillerProps> = ({
  etudiant,
  entreprise,
  sujet,
}) => {
  const fillPdf = async () => {
    try {
      // Load the PDF template from the public folder
      const response = await fetch("/convention/convention.pdf");
      const existingPdfBytes = await response.arrayBuffer();

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the form from the PDF
      const form = pdfDoc.getForm();

      // Fill in the fields by name
      const etdField = form.getTextField("Etudiant"); // Ensure this matches the template
      etdField.setText(etudiant);

      const entrField = form.getTextField("Entreprise"); // Ensure this matches the template
      entrField.setText(entreprise);

      const stageField = form.getTextField("Stage"); // Ensure this matches the template
      stageField.setText(sujet);

      // Save the filled PDF
      const pdfBytes = await pdfDoc.save();

      // Create a downloadable link for the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "filled-form.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return <Button onClick={fillPdf}>Générer Convention PDF</Button>;
};

export default PdfFormFiller;
