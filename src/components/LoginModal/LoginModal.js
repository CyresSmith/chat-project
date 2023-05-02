import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUserLogInMutation } from 'redux/userAPI';
import { setAuthHeader } from 'redux/axiosBaseQuery';
import { setAuth } from 'redux/authSlice';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be valid email').required('Required'),

  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Required'),
});

const LoginModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [userLogIn, { data, isError, isLoading, isSuccess }] =
    useUserLogInMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: ({ email, password }, { resetForm }) => {
      const user = {
        email: email.trim(),
        password: password.trim(),
      };

      userLogIn(user);
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(
        `Welcome aboard, ${data.user.name}! Registration successful!`
      );
      setAuthHeader(data.token);
      dispatch(setAuth(data));
    }

    if (isError) {
      console.log(`What a shame! Some problems happend.`);
    }
  }, [data, dispatch, isError, isSuccess]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            autoComplete="email"
            margin="normal"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type="submit">
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginModal;
