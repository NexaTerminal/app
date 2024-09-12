const crypto = require('crypto');
const Agent = require("../models/agent.model");
const authUtil = require('../util/authentication');
const sessionFlash = require('../util/session-flash');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

sgMail.setApiKey('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');

function getSignup(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            password: '',
            confirmEmail: '',
            clientName: ''
        };
    }
    res.render("users/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        clientName: req.body.clientName,
        clientAddress: req.body.clientAddress, 
        clientTaxNumber: req.body.clientTaxNumber, 
        clientManager: req.body.clientManager, 
    };

const agent = new Agent(enteredData.email, enteredData.password, enteredData.clientName, enteredData.clientAddress, enteredData.clientTaxNumber, enteredData.clientManager);
    try {
        const existsAlready = await Agent.getAgentWithSameEmail(agent.email);
        if (existsAlready) {
            sessionFlash.flashDataToSession(req, {
                errorMessage: 'Agent exists already',
                ...enteredData,
            }, function () {
                res.redirect('/signup')
            });
            return;
        }
        await agent.signup();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/login');
}

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if (!sessionData) {
        sessionData = {
            email: '',
            password: ''
        }
    }
    res.render('users/auth/login', { inputData: sessionData })
}

async function login(req, res, next) {
    const agent = new Agent(req.body.email, req.body.password);
    let existingAgent;
    try {
        existingAgent = await Agent.getAgentWithSameEmail(agent.email);
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: 'Invalid credentials',
        email: agent.email,
        password: agent.password
    };

    if (!existingAgent) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login')
        });
        return;
    }

const passwordIsCorrect = await agent.hasMatchingPassword(existingAgent.password);
    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login')
        });
        return;
    }

    req.session.uid = existingAgent._id.toString(); // Set the user ID in the session
    authUtil.createAgentSession(req, existingAgent, function () {
        res.redirect('/')
    });
}

function logout(req, res) {
    authUtil.destroyAgentAuthSession(req);
    res.redirect('/login');
}

// // Password reset
// function getResetPassword(req, res) {
//     res.render('users/auth/reset-password');
// }

// async function postResetPassword(req, res, next) {
//     const email = req.body.email;
//     let token;
//     try {
//         token = crypto.randomBytes(32).toString('hex');
//         const agent = await Agent.getAgentWithSameEmail(email);
//         if (!agent) {
//             sessionFlash.flashDataToSession(req, {
//                 errorMessage: 'No account found with that email address.',
//             }, function () {
//                 res.redirect('/reset-password');
//             });
//             return;
//         }
//         agent.resetToken = token;
//         agent.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
//         await agent.save();
//         res.redirect('/');

//         // Send email using SendGrid
//         const msg = {
//             to: email,
//             from: 'nexa@lblaw.mk',
//             subject: 'Password Reset',
//             html: `
//                 <p>You requested a password reset</p>
//                 <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password.</p>
//             `,
//         };

//         await sgMail.send(msg);
//         console.log('Password reset email sent');
//     } catch (error) {
//         next(error);
//     }
// }

// function getNewPassword(req, res) {
//     const token = req.params.token;
//     res.render('users/auth/new-password', { token });
// }

// async function postNewPassword(req, res, next) {
//     const newPassword = req.body.password;
//     const token = req.body.token;
//     try {
//         const agentDocument = await Agent.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
//         if (!agentDocument) {
//             sessionFlash.flashDataToSession(req, {
//                 errorMessage: 'Token is invalid or has expired.',
//             }, function () {
//                 res.redirect('/reset-password');
//             });
//             return;
//         }
//         const agent = new Agent(agentDocument.email, agentDocument.password, agentDocument.name, agentDocument.clientAddress, agentDocument.clientTaxNumber, agentDocument.clientManager, agentDocument._id);
//         const hashedPassword = await bcrypt.hash(newPassword, 12);
//         agent.password = hashedPassword;
//         agent.resetToken = undefined;
//         agent.resetTokenExpiration = undefined;
//         await agent.save();
//         res.redirect('/login');
//     } catch (error) {
//         next(error);
//     }
// }

function getSettings(req, res) {
    // authUtil.destroyAgentAuthSession(req);
    res.redirect('/login');
}


module.exports = {
    getSignup,
    getLogin,
    signup,
    login,
    logout,
    getSettings,
    // getResetPassword,
    // postResetPassword,
    // getNewPassword,
    // postNewPassword
};
