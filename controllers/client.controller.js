// const Document = require("../models/document.model");
// const Lhc = require("../models/lhc.model");
// const Laws = require("../models/laws.model");

const mongodb = require("mongodb");
const moment = require("moment");
const db = require("../data/database");
const { ObjectID } = require("bson");
const Agent = require('../models/agent.model');

////////////////////////////////////////////////////////////////////////////////
async function getDocuments(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/documents", { clientName });
  } catch (error) {
    next(error);
  }
}

//////
async function getEmploymentAgreement(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/documents/employment/employment-agreement", { agent });

    ///Special templates for specific clients
    // Here, if we want to have special templates for specific clients, we could use an if/else condition
    // to assign a different path and thus a different file for the specific client. In the documents folder,
    // there could be specific folders for clients with their unique templates, and if a specific condition is met
    // (e.g., if agent.name == ...) then it will use this template file instead.
  } catch (error) {
    next(error);
  }
}

//////
async function getEmploymentAnnexDuration(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/employment/annex-employment-agreement-duration", { agent });
  } catch (error) {
    next(error);
  }
}

//////
async function getEmploymentAnnexSalary(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/documents/employment/annex-employment-agreement-salary", { agent, clientName });
  } catch (error) {
    next(error);
  }
}

//////
async function getEmploymentAnnexWorkPosition(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/documents/employment/annex-employment-agreement-work-position", { agent, clientName });
  } catch (error) {
    next(error);
  }
}

//////
async function getAnnualLeaveDecision(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/documents/employment/annual-leave-decision", { agent, clientName });
  } catch (error) {
    next(error);
  }
}

//////
async function getDisciplinaryMeasure(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/documents/employment/decision-for-disciplinary-measure", { agent, clientName });
  } catch (error) {
    next(error);
  }
}

//////
async function getDisciplinaryMeasureWarning(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/employment/decision-for-disciplinary-measure-warning", { agent });
  } catch (error) {
    next(error);
  }
}

//////
async function getTerminationAgreement(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/employment/termination-agreement", { agent });
  } catch (error) {
    next(error);
  }
}

//////
async function getTerminationWarningLetter(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/employment/termination-warning-letter", { agent });
  } catch (error) {
    next(error);
  }
}

//////
async function getTerminationDueToPersonalReasons(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/employment/termination-due-to-personal-reasons", { agent });
  } catch (error) {
    next(error);
  }
}
//////
async function getEmploymentTerminationDecision(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/employment/employment-termination-decision", { agent });
  } catch (error) {
    next(error);
  }
}








////////////////////////////////////////////////////////////////////////////////
async function getGiftAgreement(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    res.render("users/clients/documents/obligations/gift-agreement", { agent });
  } catch (error) {
    next(error);
  }
}
////////////////////////////////////////////////////////////////////////////////
// https://docx.js.org/#/usage/textconst { Document, Packer, Paragraph, TextRun } = require('docx');

const { Document, Packer, Paragraph, TextRun } = require('docx');

async function generateGiftAgreementDoc(req, res, next) {

  const agent = await Agent.getAgentByUid(req.session.uid);

  const {
    propertyLocationTown,
    agreementDate,
    givingParty,
    givingPartyAddress,
    givingPartyPIN,
    receivingParty,
    receivingPartyAddress,
    receivingPartyPIN,
    propertySheetNumber,
    cadasterMunicipality,
    typeOfProperty,
    parcelNumber,
    propertyAddress,
    buildingNumber,
    buildingType,
    entranceNumber,
    floor,
    number,
    size
  } = req.body;

  try {
    // Create a new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title and header
            new Paragraph({
              alignment: "center",
              children: [new TextRun({ text: "Д О Г О В О Р", bold: true, size: 40 })],
            }),
            new Paragraph({
              alignment: "center",
              children: [new TextRun({ text: "за дар на недвижен имот", bold: true, size: 28 })],
            }),

            // Paragraph 1
            new Paragraph({
              children: [
                new TextRun(`Склучен во ${propertyLocationTown}, на ден ${agreementDate}, помеѓу:`),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(`1. ${givingParty}, со живеалиште на ул. ${givingPartyAddress}, со ЕМБГ ${givingPartyPIN}, како ДАРУВАЧ; и`),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(`2. ${receivingParty}, со живеалиште на ул. ${receivingPartyAddress}, со ЕМБГ ${receivingPartyPIN}, како ДАРОПРИМАЧ.`),
              ],
            }),

            // Section 1 - Member 1
            new Paragraph({
              alignment: "center",
              children: [new TextRun({ text: "Член 1", bold: true })],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  "Предмет на овој договор е дар на недвижен имот, каде дарувачот и даропримачот се во крвно сродство од прв наследен ред и тоа дарувачот како татко, а даропримачот како негов син."
                ),
              ],
            }),

            // Section 2 - Member 2
            new Paragraph({
              alignment: "center",
              children: [new TextRun({ text: "Член 2", bold: true })],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `По основ на Имотен лист број ${propertySheetNumber} за КО ${cadasterMunicipality}, дарувачот е сопственик на недвижен имот во ${propertyLocationTown}, и тоа:`
                ),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `- ${typeOfProperty} на КП ${parcelNumber}, на адреса ${propertyAddress}, број на зграда ${buildingNumber}, намена на зграда ${buildingType}, влез ${entranceNumber}, кат ${floor}, број ${number}, во површина од ${size}м2.`
                ),
              ],
            }),

            // Other sections continue similarly...
          ],
        },
      ],
    });

    // Generate the .docx file as a buffer
    const buffer = await Packer.toBuffer(doc);

    // Send the file for download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    const filename = `Договор за дар помеѓу ${agent.name} и ${givingParty}.docx`;
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    
    res.send(buffer);
  } catch (error) {
    next(error);
  }
}

module.exports = { generateGiftAgreementDoc };

////////////////////////////////////////////////////////////////////////////////
// New methods added
async function getMyDocuments(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    const clientName = agent.name;
    const templates = [
      { url: 'template1', name: 'Template 1' },
      { url: 'template2', name: 'Template 2' },
      { url: 'template3', name: 'Template 3' }
    ];
    res.render("users/clients/my-documents", { clientName, templates });
  } catch (error) {
    next(error);
  }
}


////////////////////////////////////////////////////////////////////////////////

async function getBusinessCalendar(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/business-calendar", { clientName });  // Render the appropriate view
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////////

async function requestedConsultation(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    // Logic to handle post request for consultation
    res.send("Consultation requested", { clientName });  // Placeholder response
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////////
async function getLhc(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/lhc", { clientName });
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////////
async function getLegalUpdates(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/legal-updates", { clientName });
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Final module.exports with added methods

module.exports = {
  getDocuments: getDocuments,
  getMyDocuments: getMyDocuments,  // Added this method
  getLhc: getLhc,
  getLegalUpdates: getLegalUpdates,
  getBusinessCalendar: getBusinessCalendar,  // Added this method
  requestedConsultation: requestedConsultation,  // Added this method
  getEmploymentAgreement: getEmploymentAgreement,
  getEmploymentAnnexDuration: getEmploymentAnnexDuration,
  getEmploymentAnnexSalary: getEmploymentAnnexSalary,
  getEmploymentAnnexWorkPosition: getEmploymentAnnexWorkPosition,
  getAnnualLeaveDecision: getAnnualLeaveDecision,
  getDisciplinaryMeasure: getDisciplinaryMeasure,
  getDisciplinaryMeasureWarning: getDisciplinaryMeasureWarning,
  getTerminationAgreement: getTerminationAgreement,
  getTerminationWarningLetter: getTerminationWarningLetter,
  getTerminationDueToPersonalReasons: getTerminationDueToPersonalReasons,
  getEmploymentTerminationDecision:getEmploymentTerminationDecision,
  getGiftAgreement: getGiftAgreement, 
  generateGiftAgreementDoc:generateGiftAgreementDoc
};
