
const mongodb = require("mongodb");
const moment = require("moment");
const db = require("../../../data/database");
const { ObjectID } = require("bson");
const Agent = require('../../../models/agent.model');

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
                children: [new TextRun({ text: "ДОГОВОР", bold: true, size: 40 })],
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
  

  module.exports = {
    getGiftAgreement: getGiftAgreement, 
    generateGiftAgreementDoc:generateGiftAgreementDoc
  };
    