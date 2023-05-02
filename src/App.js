import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'redux/selectors';

import { useGetCurrentUserQuery } from 'redux/userAPI';
import { setAuthHeader } from 'redux/axiosBaseQuery';
import { setUser } from 'redux/authSlice';

// import Spinner from './shared/Spinner';
import SharedLayout from 'components/SharedLayout';
import Profile from 'pages/Profile';
// import HomePage from 'pages/HomePage';

// const ContactsPage = lazy(() => import('pages/ContactsPage'));
// const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const Spinner = () => {
  return <div></div>;
};

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);

  useEffect(() => {
    if (!token) {
      return;
    }
    setAuthHeader(token);
  }, [token]);

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetCurrentUserQuery(token, { skip: token === '' });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <Suspense fallback={<Spinner />}>
      {!isLoading && !isFetching && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      )}
    </Suspense>
  );
};

export default App;
