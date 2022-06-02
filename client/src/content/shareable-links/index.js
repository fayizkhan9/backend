// ** React Imports
import { useState, useEffect } from 'react'
import api from 'src/utils/api'
import store from 'src/store'
import { setAlert } from '../../actions/alert'
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Card from '@mui/material/Card'
import { Button, TextField } from '@mui/material'
import { CardHeader } from '@mui/material'

const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
}

const leftItem = {
    padding: '10px',
    flex: '20%',
    minWidth: '20%'
}

const rightItem = {
    padding: '10px',
    flex: '80%',
}

const ShareableLinks = () => {

    const [link1, setLink1] = useState('')
    const [link2, setLink2] = useState('')
    const [link3, setLink3] = useState('')
    const [link4, setLink4] = useState('')
    const [link5, setLink5] = useState('')


    useEffect(() => {
        async function getData() {
            const res = await api.get('/store/getLinks');
            const links = res.data[0].links;
            setLink1(links.link1)
            setLink2(links.link2)
            setLink3(links.link3)
            setLink4(links.link4)
            setLink5(links.link5)
        }
        getData();

    }, [])

    const addLinks = async () => {
        try {

            await api.post('/store/addLinks', { link1, link2, link3, link4, link5 })
            store.dispatch(setAlert("Added Sucessfully !", 'info'))

        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    }


    return (
        <>
            <Card style={{ padding: '15px', margin: '15px' }}>

                <p style={{ margin: '10px', fontSize: '20px' }}> <b>Manage Shareable Links </b></p>

                <br></br>
                <br></br>
                <div style={containerStyles}>
                    <div style={leftItem}>
                        <CardHeader title='Link 1 : ' titleTypographyProps={{ variant: 'h6' }} />
                    </div>
                    <div style={rightItem}>  <form onSubmit={e => e.preventDefault()}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextField
                                fullWidth
                                placeholder='Enter Link'
                                name="link1"
                                value={link1}
                                onChange={(e) => setLink1(e.target.value)}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                onClick={addLinks}
                                style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                    </div>
                </div>

                <div style={containerStyles}>
                    <div style={leftItem}>
                        <CardHeader title='Link 2 : ' titleTypographyProps={{ variant: 'h6' }} />
                    </div>
                    <div style={rightItem}>
                        <form onSubmit={e => e.preventDefault()}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextField
                                    fullWidth
                                    placeholder='Enter Link'
                                    name="link2"
                                    value={link2}
                                    onChange={(e) => setLink2(e.target.value)} />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                                    onClick={addLinks}
                                >
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div style={containerStyles}>
                    <div style={leftItem}>
                        <CardHeader title='Link 3 : ' titleTypographyProps={{ variant: 'h6' }} />
                    </div>
                    <div style={rightItem}>
                        <form onSubmit={e => e.preventDefault()}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextField
                                    fullWidth
                                    placeholder='Enter Link'
                                    name="link3"
                                    value={link3}
                                    onChange={(e) => setLink3(e.target.value)}
                                />

                                <Button
                                    type='submit'
                                    variant='contained'
                                    style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                                    onClick={addLinks}
                                >
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div style={containerStyles}>
                    <div style={leftItem}>
                        <CardHeader title='Link 4 : ' titleTypographyProps={{ variant: 'h6' }} />
                    </div>
                    <div style={rightItem}>
                        <form onSubmit={e => e.preventDefault()}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextField
                                    fullWidth
                                    placeholder='Enter Link'
                                    name="link4"
                                    value={link4}
                                    onChange={(e) => setLink4(e.target.value)}
                                />

                                <Button
                                    type='submit'
                                    variant='contained'
                                    style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                                    onClick={addLinks}
                                >
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div style={containerStyles}>
                    <div style={leftItem}>
                        <CardHeader title='Link 5 : ' titleTypographyProps={{ variant: 'h6' }} />
                    </div>
                    <div style={rightItem}>
                        <form onSubmit={e => e.preventDefault()}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextField
                                    fullWidth
                                    placeholder='Enter Link'
                                    name="link5"
                                    value={link5}
                                    onChange={(e) => setLink5(e.target.value)} />

                                <Button
                                    type='submit'
                                    variant='contained'
                                    style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                                    onClick={addLinks}
                                >
                                    Add
                                </Button>

                            </div>
                        </form>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default ShareableLinks;
