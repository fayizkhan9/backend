// ** React Imports
import { useState, useEffect } from 'react'
import api from 'src/utils/api'
import GroupIcon from '@mui/icons-material/Group';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Card from '@mui/material/Card'
import { Button, Grid } from '@mui/material'
import { CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles';


// ** MUI TABLE Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRaius: '10px',
  p: 4,
};


const Users = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {

    async function getUsers() {
      const res = await api.get('/auth/getAllUsers')
      setTableData(res.data)
    }
    getUsers();
  }, [])

  // Modal style
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  return (
    <>

      <Card>
        <Item> <CardHeader title='All Users' titleTypographyProps={{ variant: 'h6' }} /></Item>
      </Card>


      <Card>
        <Grid item xs={12}>
          <Card>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Number</TableCell>
                    <TableCell align='center'>User Name</TableCell>
                    <TableCell align='center'>Email</TableCell>
                    <TableCell align='center'>Email Status</TableCell>
                    <TableCell align='center'>Diamonds</TableCell>
                    <TableCell align='center'>Referal Code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((item, indx) => (
                    <TableRow key={indx}>
                      <TableCell align='center'>{indx + 1}</TableCell>
                      <TableCell align='center'>{item.username}</TableCell>
                      <TableCell align='center'>{item.email}</TableCell>
                      <TableCell align='center'>{item.emailStatus}</TableCell>
                      <TableCell align='center'>{item.diamonds}</TableCell>
                      <TableCell align='center'>{item.referalCode}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Card>
    </>
  )
}

export default Users;
