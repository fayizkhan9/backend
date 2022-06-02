import { useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import routes from './router';
import { Navigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SuspenseLoader from 'src/components/SuspenseLoader';
import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

// REDUX
import { Provider } from 'react-redux';
import store from './store';
import Alert from './Alert'



const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Login = Loader(lazy(() => import('src/content/login')));
const ForgotPassword = Loader(lazy(() => import('src/content/forgot-password')));

const App = () => {

  const content = useRoutes(routes);

  const login = useRoutes([
    {
      path: '/',
      element: (
        <Login />
      ),
      children: [
        {
          path: '/',
          element: (
            <Navigate
              to="/"
              replace
            />
          )
        },
        {
          path: 'login',
          element: <Login />
        }
      ]
    }
  ])

  const forgotPass = useRoutes([
    {
      path: '/',
      element: (
        <ForgotPassword />
      ),
      children: [
        {
          path: '/',
          element: (
            <Navigate
              to="/"
              replace
            />
          )
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Alert />
          {forgotPass}
          {login}
          {content}
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}
export default App;
