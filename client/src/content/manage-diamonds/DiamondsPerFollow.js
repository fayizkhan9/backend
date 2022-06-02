// ** React Imports
import { useState, useEffect } from 'react'
import store from '../../store'
import { setAlert } from '../../actions/alert'
import api from 'src/utils/api'

// ** MUI Imports
import { Button, TextField, Container } from '@mui/material'
import { CardHeader } from '@mui/material'

import './style.css'

const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
}

const leftItem = {
    flex: '30%',
    minWidth: '20%'
}

const rightItem = {
    padding: '10px',
    flex: '80%',
}

const DiamondsPerFollow = () => {

    const [diamonds, setDiamonds] = useState("")


    useEffect(() => {

        async function getData() {
            const res = await api.get('/store/getDiamondsPerFollow')
            if (res.data.length > 0) {
                setDiamonds(res.data[0].diamonds)
            }
        }
        getData();

    }, [])


    const saveDiamondsPerFollow = async () => {
        try {

            await api.post('/store/diamondsPerFollow', { diamonds })
            store.dispatch(setAlert("Added Sucessfully !", 'info'))

        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    }


    return (
        <Container>
            <br></br>

            <div style={containerStyles}>
                <div style={leftItem}>
                    <CardHeader title='Diamonds Per Follow' titleTypographyProps={{ variant: 'h6' }} />
                </div>
                <div style={rightItem}>  <form onSubmit={e => e.preventDefault()}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextField
                            fullWidth
                            label='Diamonds Per Follow'
                            placeholder='Diamonds Per Follow'
                            name="diamonds"
                            value={diamonds}
                            onChange={(e) => setDiamonds(e.target.value)}
                            className="customField"
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={saveDiamondsPerFollow}
                            style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                        >
                            Set
                        </Button>
                    </div>
                </form>
                </div>
            </div>

        </Container>
    )
}

export default DiamondsPerFollow;