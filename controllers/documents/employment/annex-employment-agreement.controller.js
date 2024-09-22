const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const moment = require('moment');
const Agent = require("../../../models/agent.model");

////////////////////////////////////////////////////////////////////////////
// Controller to render the annex employment agreement form
async function employmentDurationTemplateController(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    const clientName = agent.name;
    const clientPIN = agent.clientTaxNumber;
    const clientAddress = agent.clientAddress;
    const clientManager = agent.clientManager;

    res.render("users/clients/documents/employment/annex-employment-agreement-duration", {
      clientName: clientName,
      clientPIN: clientPIN,
      clientAddress: clientAddress,
      clientManager: clientManager, 
      moment:moment
    });
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////
// Controller to generate the DOCX document
async function generateAnnexEmploymentAgreementDoc(req, res, next) {
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
      agreementNo,
      annexDate,
      endDate,
      changedArticle,
    } = req.body;


    // Format dates
    const formattedAnnexDate = moment(annexDate).format('DD.MM.YYYY');
    const formattedEndDate = endDate ? moment(endDate).format('DD.MM.YYYY') : '';

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title and header

            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Врз основа на член 28-а и член 46 од Законот за работните односи, договорните страни: `),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`1. ${companyName} со седиште на ул. ${clientAddress}, Република Северна Македонија, со ЕМБС ${clientPIN}, претставувано од ${clientManager}, како работодавач (во понатамошниот текст: Работодавачот); и`),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`2. ${employeeName} со адреса на живеење на ул. ${employeeAddress}, со ЕМБГ ${employeePIN}, како работник (во натамошниот текст: “работник”).`),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`на ден ${formattedAnnexDate} година, го склучија следниот: `),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200},
              children: [
                new TextRun({ text: "АНЕКС", bold: true, size: 30 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 100, after: 200 },
              children: [
                new TextRun({ text: `за измена на времетраењето на Договорот за вработување со број: ${agreementNo}`, bold: true, size: 23 }),
              ],
            }),

            // Parties and Agreement Details
          
            // Article 1
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 1", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Предмет на измена на овој анекс е измена на времетраењето на договорот за вработување на начин што се изменува членот ${changedArticle} од Договорот за вработување задевен кај работодавачот под број ${agreementNo}.`),
              ],
            }),

            // Article 2: End Date
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 2", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Договорот за вработување е на определено времетраење и ќе престане на ${formattedEndDate} година.`),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Со склучување на овој Анекс, пречистениот текст на членот ${changedArticle} од Договорот за вработување со број ${agreementNo}, ќе гласи:`),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Овој договор за вработување се склучува на определено времетраење и истиот престанува на ${formattedEndDate} година.`),
              ],
            }),
            // Article 3
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 3", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`Останатите одредби од Договорот за вработување помеѓу работникот и работодавачот остануваат непроменети.`),
              ],
            }),

            // Article 4
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 4", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`За се што не е предвидено со овој Анекс ќе се применуваат одредбите од Законот за работните односи и останатите позитивни прописи.`),
              ],
            }),

            // Article 5
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 5", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 300 },

              children: [
                new TextRun(`Овој Анекс е составен во 2 (два) примероци, по 1 (еден) примерок за секоја договорна страна.`),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(``),
              ],
            }),
            // Signatures Table
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun("Работодавач")],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun("________________")],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun({ text: companyName, bold: true })],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun("Работник")],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun("________________")],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun({ text: employeeName, bold: true })],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Generate the .docx file as a buffer
    const buffer = await Packer.toBuffer(doc);

    // Send the file for download
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    const todayDate = moment().format('L');
    const filename = `Анекс на договор - ${agent.name} - ${todayDate}.docx`;

    res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    res.send(buffer);

  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////
// Export the controllers
module.exports = {
    employmentDurationTemplateController,
    generateAnnexEmploymentAgreementDoc,
};

