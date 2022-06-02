import { useState, useEffect } from 'react'
import api from 'src/utils/api'
import store from '../../store'
import { setAlert } from '../../actions/alert'
import './style.css'

import { Button, TextField, Container } from '@mui/material'
import { CardHeader } from '@mui/material'


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



const RateOfDiamonds = () => {

    const [price, setPrice] = useState('')

    useEffect(() => {
        async function getData() {
            const res = await api.get('/store/getDiamondRate')
            if (res.data.price) {
                setPrice(res.data.price)
            }
        }

        getData();

    }, [])

    const addPerDiamondPrice = async () => {
        try {
            
            await api.post('/store/definePrices', { type: "diamondPrice", price })
            store.dispatch(setAlert("Added Sucessfully !", 'info'))

        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    }

    return (
        <>

            <Container>
                <br></br>
                <div style={containerStyles}>
                <div style={leftItem}>
                    <CardHeader title='Price Per Diamond ($)' titleTypographyProps={{ variant: 'h6' }} />
                </div>
                <div style={rightItem}>  <form onSubmit={e => e.preventDefault()}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextField
                            fullWidth
                            label='Price Per Diamond'
                            placeholder='Price Per Diamond'
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="customField"
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={addPerDiamondPrice}
                            style={{ width: '30%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-3px' }}
                        >
                            Set
                        </Button>
                    </div>
                </form>
                </div>
            </div>

            </Container>


        </>
    )
}

export default RateOfDiamonds;