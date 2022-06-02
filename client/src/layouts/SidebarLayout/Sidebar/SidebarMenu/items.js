import GroupIcon from '@mui/icons-material/Group';
import TagIcon from '@mui/icons-material/Tag';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UpdateIcon from '@mui/icons-material/Update';

const menuItems = [
  {
    heading: '',
    items: [
      {
        name: 'Dashboard',
        link: '/',
        icon: DashboardIcon
      }
    ]
  },
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Manage Hashtags',
        link: '/hashTags',
        icon: TagIcon
      },
      {
        name: 'Manage Diamonds',
        icon: UpdateIcon,
        link: '/diamonds'
      },
      {
        name: 'Users',
        icon: GroupIcon,
        link: '/users'
      },
      {
        name: 'Shareable Links',
        icon: ShareIcon,
        link: '/links'
      },
      {
        name: 'Settings',
        icon: SettingsIcon,
        link: '/settings'
      },
    ]
  },
  {
    heading: 'Logout',
    items: [
      {
        name: 'Logout',
        icon: LogoutIcon,
        link: '/login'
      }
    ]
  },
];

export default menuItems;
