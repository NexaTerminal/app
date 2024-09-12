const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

class Agent {
    constructor(email, password, fullname, clientAddress, clientTaxNumber, clientManager, id) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.uniqueIdentifier = uuidv4();
        this.clientAddress = clientAddress;
        this.clientTaxNumber = clientTaxNumber;
        this.clientManager = clientManager;
        if (id) {
            this._id = new ObjectId(id);
        }
    }

    async save() {
        const updateFields = {
            email: this.email,
            password: this.password,
            name: this.name,
            uniqueIdentifier: this.uniqueIdentifier,
            clientAddress: this.clientAddress,
            clientTaxNumber: this.clientTaxNumber,
            clientManager: this.clientManager,
            resetToken: this.resetToken,
            resetTokenExpiration: this.resetTokenExpiration
        };
        await db.getDb().collection('users').updateOne({ _id: this._id }, { $set: updateFields });
    }

    static getAgentWithSameEmail(email) {
        return db.getDb().collection('users').findOne({ email });
    }

    static async getAgentWithSameId(agentId) {
        let theAgentId;
        try {
            theAgentId = new ObjectId(agentId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
        const agent = await db.getDb().collection("users").findOne({ _id: theAgentId });
        if (!agent) {
            const error = new Error("Не може да се најде агентот");
            error.code = 404;
            throw error;
        }
        return agent;
    }

    static async getAgentByUid(uid) {
        console.log(`Looking for agent with UID: ${uid}`);
        let theAgentId;
        try {
            theAgentId = new ObjectId(uid);
        } catch (error) {
            const err = new Error("Invalid UID format");
            err.code = 400;
            throw err;
        }

        const agent = await db.getDb().collection('users').findOne({ _id: theAgentId });
        if (!agent) {
            const error = new Error("Не може да се најде агентот");
            error.code = 404;
            throw error;
        }
        return agent;
    }

    async existsAlready() {
        const existingAgent = await Agent.getAgentWithSameEmail(this.email);
        return !!existingAgent;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            uniqueIdentifier: this.uniqueIdentifier,
            clientAddress: this.clientAddress,
            clientTaxNumber: this.clientTaxNumber,
            clientManager: this.clientManager
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }

    static async findAll() {
        const agents = await db.getDb().collection("users").find().toArray();
        return agents.map(function (agentDocument) {
            return new Agent(agentDocument.email, agentDocument.password, agentDocument.name, agentDocument.clientAddress, agentDocument.clientTaxNumber, agentDocument.clientManager, agentDocument._id);
        });
    }

    static async findOne(query) {
        const agent = await db.getDb().collection('users').findOne(query);
        if (!agent) {
            const error = new Error("Не може да се најде агентот");
            error.code = 404;
            throw error;
        }
        return new Agent(agent.email, agent.password, agent.name, agent.clientAddress, agent.clientTaxNumber, agent.clientManager, agent._id);
    }
}

module.exports = Agent;
