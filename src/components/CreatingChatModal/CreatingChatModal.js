import { useState } from 'react';
import debounce from 'lodash.debounce';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';

const CreatingChatModal = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [privat, setPrivat] = useState(false);

  const togglePrivat = () => {
    setPrivat(prev => !prev);
  };

  const chatNameHandle = event => {
    setName(event.target.value);
  };

  const createChat = () => {
    const newChat = {
      name,
      privat,
    };

    console.log(newChat);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Creating a chat</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          Enter a name to create a new chat.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Chat name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={debounce(chatNameHandle, 200)}
        />
        <FormControlLabel
          control={
            <Switch checked={privat} onChange={togglePrivat} color="primary" />
          }
          label="Privat"
          labelPlacement="end"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleClose();
            createChat();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatingChatModal;
