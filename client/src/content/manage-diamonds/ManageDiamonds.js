// ** React Imports
import { useState, useEffect } from 'react'
import store from '../../store'
import { setAlert } from '../../actions/alert'
import api from 'src/utils/api'

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
//import DiamondIcon from '@mui/icons-material/Diamond';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRaius: '10px',
    p: 4,
};



const ManageDiamonds = () => {

    const [tableData, setTableData] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openDeleteModal, setDelteModal] = useState(false)

    const [id, setId] = useState('')
    const [formData, setFormData] = useState({
        count: '',
        price: ''
    })

    const { count, price } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        async function getDiamonds() {
            const res = await api.get('/store/getDiamonds')
            setTableData(res.data)
        }
        getDiamonds();

    }, [])


    //// Save Diamonds
    const onClick = async () => {
        try {
            const res = await api.post('/store/addDiamonds', formData)
            store.dispatch(setAlert("Record Added Sucessfully !", 'info'))
            const x = tableData;
            x.push(res.data);
            setTableData(x);
        } catch (err) {
            const errors = err.response.data.errors;
            console.log(errors)
            if (errors) {
                errors.forEach(error => store.dispatch(setAlert(error.msg, 'error')));
            }
        }
        setOpen(false);
    }

    //// Edit Diamonds
    const edit = (item) => {
        setFormData({
            count: item.count,
            price: item.price
        })
        setId(item._id)
        setOpen(true)
    }

    const onEdit = async () => {
        try {
            const res = await api.post('/store/editDiamonds', { id, count, price })
            store.dispatch(setAlert("Record Edited Sucessfully !", 'info'))
            setTableData(res.data)
        } catch (err) {
            const errors = err.response.data.errors;
            console.log(errors)
            if (errors) {
                errors.forEach(error => store.dispatch(setAlert(error.msg, 'error')));
            }
        }
        setOpen(false);
    }

    /// Delete Diamonds
    const deleteData = (id) => {
        setDelteModal(true)
        setId(id)
    }

    const deleteDiamonds = async () => {
        setDelteModal(false)
        try {
            const res = await api.delete(`/store/deleteDiamonds/${id}`)
            setTableData(res.data)
            store.dispatch(setAlert("Deleted Sucessfully !", 'info'))

        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    }


    return (
        <>
            {/* TABLE DATA */}

            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <div style={{ margin: '10px', padding: '10px' }}>
                    <Button onClick={handleOpen} variant="contained" sx={{ float: 'right' }}>+ Add New Diamonds</Button>
                </div>

                <Card>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title='All Diamonds' titleTypographyProps={{ variant: 'h6' }} />
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Id</TableCell>
                                            <TableCell align='center'>Count</TableCell>
                                            <TableCell align='center'>Price</TableCell>
                                            <TableCell align='center'>Edit</TableCell>
                                            <TableCell align='center'>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((item, indx) => (
                                            <TableRow key={indx}>
                                                <TableCell align='center'>{indx + 1}</TableCell>
                                                <TableCell align='center'>{item.count}
                                                &nbsp;&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="#5bc0de" d="M1018.72 295.472L878.848 28.03C870.688 12.43 849.584-.322 832-.322H510.064c-.351-.015-.703-.11-1.054-.127c-.288 0-.56.113-.849.128h-316.16c-17.6 0-38.752 12.72-47.024 28.256L5.473 290.223c-8.289 15.536-6.624 39.937 3.631 54.257l480.016 669.152c5.153 7.184 12 10.815 18.832 10.815c6.785 0 13.584-3.536 18.768-10.591L1014.624 349.6c10.384-14.193 12.256-38.544 4.096-54.128zm-76.353-7.843H770.911l68.656-196.608zM575.343 63.677h205.968l-63.888 182.928zm92.895 223.952H370.591L511.263 85.533zm-354.351-30.544L249.71 63.677h198.816zm366.863 94.544L508.718 844.173L345.262 351.629H680.75zM436.926 831.085L92.99 351.629h184.832zm311.616-479.456H933.71l-352.976 480.56zM188.478 82.413l68.096 205.216H79.326z"/></svg>
                                                    {/* <DiamondIcon fontSize="small" color='info' /> */}
                                                </TableCell>
                                                <TableCell align='center'>$ {""} {item.price} </TableCell>
                                                <TableCell align='center'>
                                                    <EditIcon style={{ cursor: 'pointer' }} onClick={() => edit(item)} color='info' />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <DeleteForeverIcon sx={{ color: 'pink' }}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => deleteData(item._id)}
                                                    />

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>

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
                                    
                                    <Button variant='contained' sx={{ py: 2.5, background: '#df4759', float: 'right', margin: '10px', width: '50px', height: '10px' }} onClick={deleteDiamonds}>
                                        Delete
                                    </Button>

                                    <Button variant='contained' sx={{ py: 2.5, background: 'info', float: 'right', margin: '10px', width: '50px', height: '10px' }} onClick={() => setDelteModal(false)}>
                                        Cancel
                                    </Button>
                                   
                                </Card>
                            </Box>
                        </Modal>
                    </Grid>
                </Card>
            </div>


            {/* MODAL */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={style}>
                    <Card style={{ padding: '10px', margin: '10px', background: 'white', color: 'black' }}>
                        <CardHeader title='Add Diamonds' titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent style={{ color: 'black' }}>
                            <form onSubmit={e => e.preventDefault()}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            focused
                                            sx={{ input: { color: 'black' } }}
                                            fullWidth
                                            label='Diamonds'
                                            placeholder='Number Of Diamonds'
                                            name="count"
                                            value={count}
                                            onChange={onChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            sx={{ input: { color: 'black' } }}
                                            focused
                                            type='text'
                                            label='Price'
                                            placeholder='Price in $'
                                            name="price"
                                            value={price}
                                            onChange={onChange}
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
                                            {id === '' ? <Button type='submit' variant='contained' size='block' onClick={onClick} sx={{ py: 2.5, width: '100%'}}>
                                                Add
                                            </Button> : <Button type='submit' variant='contained' size='block' onClick={onEdit} sx={{ py: 2.5, width: '100%'}}>
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

        </>
    )
}

export default ManageDiamonds;