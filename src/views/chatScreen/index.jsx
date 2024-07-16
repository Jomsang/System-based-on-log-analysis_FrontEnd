import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import styles from './ChatScreen.module.css';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, id: messages.length }]);
      setInput('');
    }
  };

  return (
    <Paper className={styles.container} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Chat Study
      </Typography>
      <List className={styles.messages}>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText primary={message.text} />
          </ListItem>
        ))}
      </List>
      <div className={styles.promptContainer}>
        <TextField
          className={styles.inputField}
          label="Enter your message"
          variant="outlined"
          fullWidth
          value={input}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default ChatScreen;