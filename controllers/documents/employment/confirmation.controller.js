const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const moment = require('moment');
const Agent = require("../../../models/agent.model");

////////////////////////////////////////////////////////////////////////////
// Controller to render the confirmation of employment form
async function confirmationTemplateController(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    const clientName = agent.name;
    const clientPIN = agent.clientTaxNumber;
    const clientAddress = agent.clientAddress;
    const clientManager = agent.clientManager;

    res.render("users/clients/documents/employment/confirmation-of-employment", {
      clientName: clientName,
      clientPIN: clientPIN,
      clientAddress: clientAddress,
      clientManager: clientManager,
      moment: moment
    });
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////
// Controller to generate the DOCX document for confirmation of employment
async function generateConfirmationDoc(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);

    // Extract values from the form (req.body)
    const {
      companyName,
      clientAddress,
      clientPIN,
      clientManager,
      employeeName,
      employeeAddress,
      employeePIN,
      jobPosition,
      agreementDurationType,
      definedDuration,
    } = req.body;


    console.log(req.body)
    // Format the certificate date
    const certificateDate = moment().format('DD.MM.YYYY');

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title and Header Section
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: { before: 400},
              children: [
                new TextRun(`Врз основа на одредбите од Законот за работните односи, ${companyName} со седиште на ул. ${clientAddress}, Република Северна Македонија, со ЕМБС ${clientPIN}, претставувано од ${clientManager}, како работодавач, на ден ${certificateDate} година, ја донесе следната:`),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 300 },
              children: [
                new TextRun({ text: "ПОТВРДА", bold: true, size: 30 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 100, after: 200 },
              children: [
                new TextRun({ text: "за работен однос на работник", bold: true, size: 23 }),
              ],
            }),

            // Employee and Job Details Section
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Со оваа потврда, ${companyName} потврдува дека работникот ${employeeName} со адреса на живеење ул. ${employeeAddress}, ЕМБГ ${employeePIN}, е во работен однос и е ангажиран на работно место „${jobPosition}“. Договорот за вработување со работникот е склучен на ${agreementDurationType}`),
                definedDuration ? new TextRun(` и тоа до ${moment(definedDuration).format('DD.MM.YYYY')} година.`) : new TextRun("."),
              ],
            }),

            // Conclusion Paragraph
            new Paragraph({
              spacing: { before: 200},
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun("Оваа потврда претставува соодветен доказ за работниот однос на горенаведениот работник и истата може да биде искористена пред државни органи, државни институции и сите други државни и/или приватни правни лица."),
              ],
            }),

            // Company Signature Section
            new Paragraph({
              spacing: { before: 700},
              alignment: AlignmentType.RIGHT,
              children: [new TextRun(`За ${companyName}`)],
            }),
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 500, },
                children: [new TextRun("_________________")],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun(`${clientManager}`)],
              }),
            // new Table({
            //   width: {
            //     size: 100,
            //     type: WidthType.PERCENTAGE,
            //   },
            //   rows: [
            //     new TableRow({
            //       children: [
            //         new TableCell({
            //           children: [new Paragraph(" ")],
            //         }),
            //         new TableCell({
            //           children: [
            //             new Paragraph({
            //               alignment: AlignmentType.CENTER,
            //               children: [new TextRun("_________________________")],
            //             }),
            //             new Paragraph({
            //               alignment: AlignmentType.CENTER,
            //               children: [new TextRun({ text: `${companyName} ${companyManager}`, bold: true })],
            //             }),
            //           ],
            //         }),
            //       ],
            //     }),
            //   ],
            // }),
          ],
        },
      ],
    });

    // Generate the DOCX file as a buffer
    const buffer = await Packer.toBuffer(doc);

    // Send the file for download
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    const todayDate = moment().format('L');
    const filename = `Потврда за вработување - ${employeeName} - ${todayDate}.docx`;

    res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    res.send(buffer);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////
// Export the controllers
module.exports = {
  confirmationTemplateController,
  generateConfirmationDoc,
};
