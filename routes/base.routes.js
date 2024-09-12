const express = require('express');
const Agent = require("../models/agent.model");

const router = express.Router();

function ensureAuth(req, res, next) {
    if (req.session.uid) {
        return next();
    }
    res.redirect('/login');
}

router.get('/', ensureAuth, async (req, res, next) => {
    try {
        const agent = await Agent.getAgentByUid(req.session.uid);
        res.render('homepage', { clientName: agent.name }); // Assuming you have a homepage view to render
    } catch (error) {
        next(error);
    }
});

router.get('/401', function(req, res){
    res.status(401).render('shared/401')
})

router.get('/403', function(req, res){
    res.status(403).render('shared/403')
})

module.exports = router;
