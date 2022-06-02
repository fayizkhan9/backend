import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));
const Users = Loader(lazy(() => import('src/content/users')));
const ManageDiamonds = Loader(lazy(() => import('src/content/manage-diamonds')));
const ManageHashTags = Loader(lazy(() => import('src/content/manage-hashtags')));
const ForgotPassword = Loader(lazy(() => import('src/content/forgot-password')));
const ShareableLinks = Loader(lazy(() => import('src/content/shareable-links')));
const Settings = Loader(lazy(() => import('src/content/settings')));

const routes = [
  {
    path: '/',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        )
      },
      {
        path: 'dashboard',
        element: <Tasks />
      },
      {
        path: 'hashTags',
        element: <ManageHashTags />
      },
      {
        path: 'diamonds',
        element: <ManageDiamonds />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'links',
        element: <ShareableLinks />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'reset-password',
        element: <ForgotPassword />
      }
    ]
  }
];

export default routes;
