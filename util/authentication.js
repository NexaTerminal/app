function createAgentSession(req, agent, action) {
    req.session.uid = agent._id.toString();
    req.session.isAdmin = agent.isAdmin;
    req.session.save(action)
}

function destroyAgentAuthSession(req) {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error("Session destruction failed:", err);
            }
        });
    } else {
        console.error("Session is undefined, cannot destroy session.");
    }
}


module.exports = {
    createAgentSession: createAgentSession,
    destroyAgentAuthSession: destroyAgentAuthSession
}

