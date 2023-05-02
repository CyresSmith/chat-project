import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { io } from 'socket.io-client';

import CreatingChatModal from './components/CreatingChatModal';

import ChatsPanel from './components/ChatsPanel';

function App() {
  const [socket, setSocket] = useState(null);

  const [chatsPanelOpen, setChatsPanelOpen] = useState(false);
  const [creatingChatModalOpen, setCreatingChatModalOpen] = useState(false);

  const toggleCreatingChatModal = () => {
    setCreatingChatModalOpen(prev => !prev);
  };

  const toggleChatsPanel = () => {
    setChatsPanelOpen(prev => !prev);
  };

  // useEffect(() => {
  //   setSocket(io('http://localhost:4000'));
  // }, []);

  return (
    <>
      <Header
        socket={socket}
        toggleChatsPanel={toggleChatsPanel}
        openCreatingChatModal={toggleCreatingChatModal}
      />
      <ChatsPanel
        chatsPanelOpen={chatsPanelOpen}
        toggleChatsPanel={toggleChatsPanel}
      />
      <CreatingChatModal
        open={creatingChatModalOpen}
        handleClose={toggleCreatingChatModal}
      />
      <Outlet context={{ socket }} />
    </>
  );
}

export default App;
