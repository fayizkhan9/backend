// ** React Imports
import { useState, useEffect } from 'react'
import api from 'src/utils/api'
import store from '../../store'
import { setAlert } from '../../actions/alert'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Button, Grid, CardContent, TextField } from '@mui/material'
import { CardHeader } from '@mui/material'
import Modal from '@mui/material/Modal';


// ** MUI TABLE Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  margin: '20px',
  padding: '10px',
  p: 4,
};


const HashTags = () => {

  const [tableData, setTableData] = useState([])
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setDelteModal] = useState(false)
  const handleOpen = () => {
    setId('')
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const [tags, setTags] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {

    async function getHashTags() {
      const res = await api.get('/store/getHashTags')
      setTableData(res.data)
    }
    getHashTags();
  }, [])


  const onClick = async () => {
    try {
      const res = await api.post('/store/addHashTags', { tags })
      store.dispatch(setAlert("Record Added Sucessfully !", 'info'))
      var arr = tableData;
      arr.push(res.data);
      setTableData(arr);
    } catch (err) {
      if (err) {
        store.dispatch(setAlert('Something went wrong !', 'error'));
      }
    }
    setOpen(false)
  }


  ////////// edit tags

  const edit = (item) => {
    handleOpen(true)
    setTags(item.tags);
    setId(item._id)
  }

  const editTags = async () => {
    try {

      const res = await api.post('/store/editHashTags', { tags, id })
      setTableData(res.data)
      store.dispatch(setAlert("Edited Sucessfully !", 'info'))

    } catch (err) {
      if (err) {
        store.dispatch(setAlert('Something went wrong !', 'error'));
      }
    }
    setOpen(false)
  }


  /////////// DELETE

  const deleteData = (id) => {
    setDelteModal(true)
    setId(id)
  }

  const deleteTag = async () => {
    try {

      const res = await api.delete(`/store/deleteHashTags/${id}`)
      setTableData(res.data)
      store.dispatch(setAlert("Deleted Sucessfully !", 'info'))

    } catch (err) {
      if (err) {
        store.dispatch(setAlert('Something went wrong !', 'error'));
      }
    }
    setDelteModal(false);
  }


  return (
    <>
      <Card style={{ padding: '15px', margin: '15px' }}>
        <Button variant="contained" onClick={handleOpen} style={{ float: 'right' }}>Add New HashTagas</Button>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card style={{ padding: '10px', margin: '10px', background: 'white', color: 'black' }}>
            <CardHeader title='Add Hashtags' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      focused
                      fullWidth
                      label='Hashtags'
                      placeholder='Write Hashtags'
                      name="count"
                      value={tags}
                      sx={{ input: { color: 'black' } }}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      {id === '' ?
                        <>
                          <Button type='submit' variant='contained' size='block' onClick={onClick} sx={{ py: 2.5, width: '100%' }}>
                            Add
                          </Button>
                        </> :
                        <Button type='submit' variant='contained' size='block' onClick={editTags} sx={{ py: 2.5, width: '100%' }}>
                          Edit
                        </Button>}

                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>



      <Grid item xs={12}>
        <Card style={{ padding: '15px', margin: '15px' }}>
        <p style={{ margin: '10px', fontSize: '20px' }}> <b> All HashTags </b></p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Id</TableCell>
                  <TableCell align='center'>Tags</TableCell>
                  <TableCell align='center'>Edit</TableCell>
                  <TableCell align='center'>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, indx) => (
                  <TableRow key={indx}>
                    <TableCell align='center'>{indx + 1}</TableCell>
                    <TableCell align='center'>{item.tags}</TableCell>
                    <TableCell align='center'><EditIcon style={{ cursor: 'pointer' }} onClick={() => edit(item)} color='info' /></TableCell>
                    <TableCell align='center'><DeleteForeverIcon sx={{ color: 'pink', cursor: 'pointer' }} onClick={() => deleteData(item._id)} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>


      {/* DELTE CONFITMATION MODAL */}
      <Modal
        open={openDeleteModal}
        onClose={() => setDelteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card style={{ padding: '10px', margin: '10px', background: 'white', color: 'black' }}>
            <CardHeader title='Delete Action Confirmation' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent style={{ padding: '10px', margin: '10px' }}>Are you sure ? You want to delete this record ?</CardContent>
           
            <Button variant='contained' sx={{ py: 2.5, background: '#df4759', float: 'right', margin: '10px', width: '50px', height: '10px' }} onClick={deleteTag}>
              Delete
            </Button>
            <Button variant='contained' sx={{ py: 2.5, background: 'info', float: 'right', margin: '10px', width: '50px', height: '10px' }} onClick={() => setDelteModal(false)}>
              Cancel
            </Button>
          </Card>
        </Box>
      </Modal>

    </>
  )
}

export default HashTags;
