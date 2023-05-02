import { useSelector } from 'react-redux';

import { getAuth } from 'redux/selectors';

import { Container, Box, Typography, Avatar } from '@mui/material';

const Profile = () => {
  const { user } = useSelector(getAuth);
  return (
    <Container sx={{ py: 3 }}>
      <Box display="flex" gap={3}>
        <Avatar
          sx={{ width: '200px', height: '200px' }}
          src={user.avatarUrl}
          variant="square"
        ></Avatar>
        <Box>
          <Typography variant="body1" as="p">
            Name: <b>{user.name}</b>
          </Typography>
          <Typography variant="body1" as="p">
            Email: <b>{user.email}</b>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
