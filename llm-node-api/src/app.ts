import express from 'express';
import axios from 'axios';
import { connect } from 'mongoose';
import { Conversation } from './models/conversation';

const app = express();
app.use(express.json());

const PYTHON_SERVICE_URL = 'http://python_service:5000';

app.post('/query', async (req, res) => {
    const { modelName, question } = req.body;
    try {
        await axios.post(`${PYTHON_SERVICE_URL}/select_model`, { modelName });
        const response = await axios.post(`${PYTHON_SERVICE_URL}/query`, { question });
        const conversation = new Conversation({ modelName, question, response: response.data.response });
        await conversation.save();
        res.json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/conversations', async (req, res) => {
    const conversations = await Conversation.find().sort({ createdAt: -1 });
    res.json(conversations);
});

app.get('/conversations/:id', async (req, res) => {
    const conversation = await Conversation.findById(req.params.id);
    res.json(conversation);
});

const startServer = async () => {
    await connect('mongodb://mongo:27017/conversations');
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
};

startServer();
