import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { ModeComment } from '@mui/icons-material/';

const ChatsPanel = ({ toggleChatsPanel, chatsPanelOpen }) => {
  return (
    <Drawer anchor="right" open={chatsPanelOpen} onClose={toggleChatsPanel}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: chatsPanelOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: chatsPanelOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ModeComment />
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: chatsPanelOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ChatsPanel;
