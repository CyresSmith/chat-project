import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUserSignUpMutation } from 'redux/userAPI';
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
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),

  email: Yup.string().email('Must be valid email').required('Required'),

  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
});

const RegisterModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [userSignUp, { data, isError, isLoading, isSuccess }] =
    useUserSignUpMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: ({ name, email, password }, { resetForm }) => {
      const user = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };

      userSignUp(user);
      resetForm();
    },
  });

  //   useEffect(() => {
  //     if (isSuccess) {
  //       Notify.success(
  //         `Welcome aboard, ${data.user.name}! Registration successful!`
  //       );
  //       setAuthHeader(data.token);
  //       dispatch(setAuth(data));
  //     }

  //     if (isError) {
  //       Notify.failure(`What a shame! Some problems happend.`);
  //     }
  //   }, [data, dispatch, isError, isSuccess]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Register</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            autoComplete="name"
            fullWidth
            margin="normal"
            variant="outlined"
            type="name"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
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
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterModal;
