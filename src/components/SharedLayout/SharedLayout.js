import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import { io } from 'socket.io-client';

import ChatsPanel from 'components/ChatsPanel';

const SharedLayout = () => {
  const [socket, setSocket] = useState(null);

  const [chatsPanelOpen, setChatsPanelOpen] = useState(false);

  const toggleChatsPanel = () => {
    setChatsPanelOpen(prev => !prev);
  };

  // useEffect(() => {
  //   setSocket(io('http://localhost:4000'));
  // }, []);

  return (
    <>
      <Header socket={socket} chatsPanelClose={toggleChatsPanel} />
      <ChatsPanel
        chatsPanelOpen={chatsPanelOpen}
        toggleChatsPanel={toggleChatsPanel}
      />
      <Outlet context={{ socket }} />
    </>
  );
};

export default SharedLayout;
