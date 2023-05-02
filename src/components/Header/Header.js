import { useState } from 'react';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from '@mui/material';

import { ThreeP, Forum, AddCircle } from '@mui/icons-material/';

import UserMenu from '../UserMenu';

const Header = ({ openCreatingChatModal, toggleChatsPanel, open }) => {
  return (
    <AppBar open={open} position="static">
      <Toolbar>
        <ThreeP fontSize="large" />
        <Typography variant="h6" component="span" sx={{ flexGrow: 1, ml: 2 }}>
          Balabolka
        </Typography>

        <Tooltip title="Create new chat">
          <IconButton
            color="inherit"
            sx={{ mr: 2 }}
            onClick={openCreatingChatModal}
          >
            <AddCircle fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Chats panel">
          <IconButton color="inherit" sx={{ mr: 2 }} onClick={toggleChatsPanel}>
            <Forum fontSize="large" />
          </IconButton>
        </Tooltip>

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
