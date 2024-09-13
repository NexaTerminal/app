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
    res.render("users/clients/documents",{clientName});
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
// New methods added

async function getMyDocuments(req, res, next) {
  const agent = await Agent.getAgentByUid(req.session.uid);
  let clientName = agent.name;
  try {
    res.render("users/clients/my-documents", {clientName});  // Render the appropriate view
  } catch (error) {
    next(error);
  }
}
////////////////////////////////////////////////////////////////////////////////
async function getBusinessCalendar(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/business-calendar", {clientName});  // Render the appropriate view
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
    res.send("Consultation requested", {clientName});  // Placeholder response
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////////
async function getLhc(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/lhc", {clientName});
  } catch (error) {
    next(error);
  }
}

////////////////////////////////////////////////////////////////////////////////
async function getLegalUpdates(req, res, next) {
  try {
    const agent = await Agent.getAgentByUid(req.session.uid);
    let clientName = agent.name;
    res.render("users/clients/legal-updates", {clientName});
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

  //obligations
  getGiftAgreement:getGiftAgreement

};
