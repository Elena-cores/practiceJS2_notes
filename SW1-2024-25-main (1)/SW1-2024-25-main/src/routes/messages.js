const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
const Database = require('../db/connection');

const dbInstance = new Database();

// Middleware to set default CSS
router.use((req, res, next) => {
    res.locals.css = 'messages';
    next();
});

// Render Messages Page
router.get('/', async (req, res) => {
    try {
        const mainUserId = req.session.mainUser?._id;
        if (!mainUserId) {
            return res.redirect('/'); // Redirect to login if no user session
        }

        const contacts = await dbInstance.getCollection('User').find({
            _id: { $ne: mainUserId }
        }).toArray();

        res.render('messages', {
            title: 'Messaging',
            currentPage: 'messages',
            mainUser: req.session.mainUser,
            contacts,
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.render('messages', {
            title: 'Messaging',
            currentPage: 'messages',
            mainUser: req.session.mainUser || null,
            contacts: [],
        });
    }
});

router.get('/room/:receiverId', async (req, res) => {
    const mainUserId = req.session.mainUser?._id;
    const receiverId = req.params.receiverId;

    if (!mainUserId || !receiverId) {
        return res.status(400).json({ error: 'Both mainUserId and receiverId are required.' });
    }

    try {
        // Sort userId and receiverId to maintain consistency
        const userIds = [new ObjectId(mainUserId), new ObjectId(receiverId)].sort();

        // Attempt to fetch an existing room
        let room = await dbInstance.getCollection('Chat').findOne({
            userId: userIds[0],
            receiverId: userIds[1],
        });

        // If no room exists, create a new chat
        if (!room) {
            const receiver = await dbInstance.getCollection('User').findOne({ _id: new ObjectId(receiverId) });

            if (!receiver) {
                return res.status(404).json({ error: 'Receiver not found.' });
            }

            const newChat = {
                userId: userIds[0],
                receiverId: userIds[1],
                name: `${req.session.mainUser.username} - ${receiver.username}`,
                createdAt: new Date(),
            };

            const chatResult = await dbInstance.getCollection('Chat').insertOne(newChat);
            room = { _id: chatResult.insertedId };
        }

        // Fetch messages after ensuring room exists
        const messages = await dbInstance.getMessagesByChatId(room._id);
        // Respond with the room ID and messages
        res.status(200).json({
            roomId: room._id.toString(),
            sender: mainUserId.toString(),
            receiver: receiverId.toString(),
            messages: messages, // Empty if the room is newly created
        });

    } catch (error) {
        console.error('Error fetching or creating room:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save', async (req, res) => {
    const { room, content, sender } = req.body; // Destructure message fields from the request body
  
    if (!room || !content || !sender) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
  
    try {
      // Example of constructing message data
      const messageData = {
        chatId: new ObjectId(room),
        content: content,
        userId: new ObjectId(sender),
        timestamp: new Date(),
      };
  
      await dbInstance.insertMessage(messageData); // Save to the database
      res.status(200).json({ success: true, message: 'Message saved successfully' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ success: false, error: 'Error saving message' });
    }
  });
  

module.exports = router;