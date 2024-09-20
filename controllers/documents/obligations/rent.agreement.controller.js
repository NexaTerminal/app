const mongodb = require("mongodb");
const moment = require("moment");
const db = require("../../../data/database");
const { ObjectID } = require("bson");
const Agent = require("../../../models/agent.model");

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} = require('docx');

////////////////////////////////////////////////////////////////////////////
async function getRentAgreement(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    const clientName = agent.name;
    const clientPIN = agent.clientTaxNumber; // Ensure that 'clientTaxNumber' is a property of the agent model
    const clientAddress = agent.clientAddress;
    // const clientManager = agent.clientManager;

    res.render("users/clients/documents/obligations/rent-agreement", {
      clientName: clientName,
      clientPIN: clientPIN,
      // clientManager: clientManager,
      clientAddress: clientAddress,
    });
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////
async function generateRentAgreementDoc(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);

    // Extract variables from req.body
    const {
      landlordName,
      landlordAddress,
      landlordPIN,
      lesseeName,
      lesseeAddress,
      lesseePIN,
      date,
      propertyCity,
      propertyAddress,
      propertyParcelNumber,
      propertySheetNumber,
      propertyParcelLocation,
      propertySize,
      rentAmount,
      landlordBankAccount,
      landlordBank,
      equipment,
      durationType,
      endDate,
      rentTime,
    } = req.body;

    let agreementDurationText;

    if (durationType === '1') {
      agreementDurationText = 'Овој Договор за закуп се склучува на неопределено време.';
    } else if (durationType === '2') {
      if (!endDate || endDate.trim() === '') {
        return res.status(400).send('End date is required for defined duration.');
      }
      const formattedEndDate = moment(endDate).format('DD.MM.YYYY');
      agreementDurationText = `Овој Договор за закуп се склучува на определено време до ${formattedEndDate}.`;
    }

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title and header
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [
                new TextRun({ text: "ДОГОВОР", bold: true, size: 30 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [
                new TextRun({
                  text: "за закуп на недвижен имот",
                  bold: true,
                  size: 23,
                }),
              ],
            }),

            // Parties
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [new TextRun(`Договорните страни:`)],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `1. ${landlordName}, со адреса на живеење на ${landlordAddress}, со ЕМБГ ${landlordPIN} (во понатамошниот текст: Закуподавач); и`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `2. ${lesseeName}, со адреса на живеење на ${lesseeAddress}, со ЕМБГ ${lesseePIN}, (во понатамошниот текст: Закупец).`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `На ден ${moment(date).format("DD.MM.YYYY")} година, склучија:`
                ),
              ],
            }),

            // Article 1
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 1", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Предмет на овој договор е закуп на недвижен имот, а кој се наоѓа во ${propertyCity} на ул. ${propertyAddress}, лоциран на КП ${propertyParcelNumber} а запишан Имотен лист број ${propertySheetNumber} за КО ${propertyParcelLocation}.`
                ),
              ],
            }),
            // new Paragraph({
            //   alignment: AlignmentType.JUSTIFIED,
            //   children: [
            //     new TextRun(`- _____________, со квадратура од ${propertySize} м2`),
            //   ],
            // }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Недвижниот имот опишан во ставот 1 од овој член се издава ${equipment}.`
                ),
              ],
            }),
            // new Paragraph({
            //   alignment: AlignmentType.JUSTIFIED,
            //   children: [
            //     new TextRun(
            //       `Закуподавачот изјавува дека предметната недвижност ___________ //не// е оптоварена со хипотека до денот на потпишувањето на овој договор.`
            //     ),
            //   ],
            // }),

            // Article 2
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [new TextRun({ text: "Член 2", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(`${agreementDurationText}`),
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
                new TextRun(
                  `Закупецот има обврска на Закуподавачот да му исплаќа месечна закупнина во износ од ${rentAmount},00 денари.`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Закупнината ќе се плаќа ${rentTime}.`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Закупецот се обврзува да ја исплаќа месечната закупнина на трансакциска сметка на Закуподавачот бр. ${landlordBankAccount} при ${landlordBank}, со назнака за месецот за кој се врши односната закупнина.`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Со исплатата на закупнината, закупецот во име на закуподавачот ќе врши исплата и на данокот на личен доход на износот на исплатена закупнина.`
                ),
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
                new TextRun(
                  `Закупецот е согласен и се обврзува да ги сноси сите трошоци за ТЕКОВНО ОДРЖУВАЊЕ (струја, вода, комуналии, управување, огрев, интернет и слично).`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Закупецот е должен без одлагање да изврши промена на корисник кон сите даватели на услуги за трошоците од став 1.`
                ),
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
              children: [
                new TextRun(
                  `Закуподавачот има право да врши тековен увид во предметниот недвижен имот колку пати ќе сака во текот на годината со предходна 24 часовна писмена најава до Закупецот.`
                ),
              ],
            }),

            // Article 6
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [new TextRun({ text: "Член 6", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Закупецот е должен да го извести Закуподавачот без непотребно одлагање за секој недостаток на предметот на закуп кој би се покажал во текот на закупот како и за секоја непредвидена опасност која во текот на траењето на закупот би му се заканила на предметот на закуп.`
                ),
              ],
            }),

            // Article 7
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [new TextRun({ text: "Член 7", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Закупецот не може да го даде предметот на закуп во подзакуп на трети лица врз основа на овој Договор.`
                ),
              ],
            }),

            // Article 8
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [new TextRun({ text: "Член 8", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Договорните страни се изрично согласни дека овој договор може да биде раскинат со еднострана писмена изјава од било која договорна страна и без потребна согласност од другата договорна страна со претходно писмено известување до другата договорна страна однапред 60 дена пред неговото раскинување.`
                ),
              ],
            }),

            // Article 11
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [new TextRun({ text: "Член 11", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Овој договор е склучен во 4 идентични копии, од кои по една за секоја договорна страна, а останатите за надлежни институции.`
                ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Нотарските трошоци, и трошоците за упис на овој Договор во јавна книга се поднесуваат сразмерно.`
                ),
              ],
            }),

            // Article 12
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, before: 200, after: 200 },
              children: [new TextRun({ text: "Член 12", bold: true })],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun(
                  `Во случај на спор, страните се согласни за надлежен суд да биде судот во ${propertyCity}.`
                ),
              ],
            }),

            // Add spacing before the signatures
            new Paragraph({
              text: "",
              spacing: { before: 200, before: 200, after: 200 },
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
                      margins: { top: 200, bottom: 200 },
                      borders: { top: BorderStyle.NONE, bottom: BorderStyle.NONE, left: BorderStyle.NONE, right: BorderStyle.NONE },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun(`Закуподавач:`)],
                        }),
                        new Paragraph({
                          text: "",
                          spacing: { after: 100 },
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun({ text: `${landlordName}`, bold: true })],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: { top: 200, bottom: 200 },
                      borders: { top: BorderStyle.NONE, bottom: BorderStyle.NONE, left: BorderStyle.NONE, right: BorderStyle.NONE },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun(`Закупец:`)],
                        }),
                        new Paragraph({
                          text: "",
                          spacing: { after: 100 },
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [new TextRun({ text: `${lesseeName}`, bold: true })],
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
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    const todayDate = moment().format('L');

    const filename = `Договор за закуп - ${agent.name} - ${todayDate}.docx`;
    res.setHeader(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`
    );

    res.send(buffer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRentAgreement: getRentAgreement,
  generateRentAgreementDoc: generateRentAgreementDoc,
};
