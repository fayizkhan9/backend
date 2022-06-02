// ** React Imports
import { useState } from 'react'

import DiamondsPerFollow from './DiamondsPerFollow'
import PerDiamondPrice from './ManageDiamonds'
import ManageOffers from './MangeOffers'
import RateOfDiamonds from './RateOfDiamond'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext'


// ** Demo Tabs Imports
import TabList from '@mui/lab/TabList'
import MuiTab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'

////////// Tabs
const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4)
}))


///////////////
/////////////////
/////////////// COMPONENT START
const ManageDiamonds = () => {

  const [value, setValue] = useState('diamonds')


  ///// Tabs 
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue)
  }


  return (
    <>
      <Card style={{ padding: '15px', margin: '15px' }}>
        <RateOfDiamonds />
        <DiamondsPerFollow />
      </Card>
     

      <Card style={{ padding: '15px', margin: '15px' }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
          >
            <Tab
              value='diamonds'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center'  }}>
                  <TabName >Diamond Offers</TabName>
                </Box>
              }
            />

            <Tab
              value='offers'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Followers Offers</TabName>
                </Box>
              }
            />
          </TabList>


          <TabPanel sx={{ p: 0 }} value='diamonds'>
            <PerDiamondPrice />
          </TabPanel>

          <TabPanel sx={{ p: 0 }} value='offers'>
            <ManageOffers />
          </TabPanel>

        </TabContext>
      </Card>
    </>
  )
}

export default ManageDiamonds;
