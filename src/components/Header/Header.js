import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from '@mui/material';

import {
  ThreeP,
  Forum,
  AddCircle,
  AppRegistration,
  Login,
} from '@mui/icons-material/';

import { getAuth } from 'redux/selectors';

import UserMenu from 'components/UserMenu';
import CreatingChatModal from 'components/CreatingChatModal';
import RegisterModal from 'components/RegisterModal';
import LoginModal from 'components/LoginModal';

const Header = ({ chatsPanelClose }) => {
  const { user } = useSelector(getAuth);

  const [creatingChatModalOpen, setCreatingChatModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const toggleCreatingChatModal = () => {
    setCreatingChatModalOpen(prev => !prev);
  };

  const toggleRegisterModal = () => {
    setRegisterModalOpen(prev => !prev);
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(prev => !prev);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <ThreeP fontSize="large" />
          <Typography variant="h6" component="span" sx={{ flexGrow: 1, ml: 2 }}>
            Balabolka
          </Typography>

          {!user && (
            <>
              <Tooltip title="Login">
                <IconButton
                  color="inherit"
                  onClick={toggleLoginModal}
                  aria-label="login"
                >
                  <Login fontSize="large" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Register">
                <IconButton
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={toggleRegisterModal}
                  aria-label="register"
                >
                  <AppRegistration fontSize="large" />
                </IconButton>
              </Tooltip>
            </>
          )}

          {user && (
            <>
              <Tooltip title="Create new chat">
                <IconButton
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={toggleCreatingChatModal}
                >
                  <AddCircle fontSize="large" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Chats panel">
                <IconButton
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={chatsPanelClose}
                >
                  <Forum fontSize="large" />
                </IconButton>
              </Tooltip>

              <UserMenu />
            </>
          )}
        </Toolbar>
      </AppBar>

      <CreatingChatModal
        open={creatingChatModalOpen}
        handleClose={toggleCreatingChatModal}
      />

      <LoginModal open={loginModalOpen} handleClose={toggleLoginModal} />

      <RegisterModal
        open={registerModalOpen}
        handleClose={toggleRegisterModal}
      />
    </>
  );
};
export default Header;
