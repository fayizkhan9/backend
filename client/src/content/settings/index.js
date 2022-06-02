// ** React Imports
import { useState } from 'react'
import api from 'src/utils/api'
import store from '../../store'
import { setAlert } from '../../actions/alert'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '@mui/material/Card';
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


const HashTags = () => {

    const [values, setValues] = useState({
        email: ''
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleMouseDownPassword = event => {
        event.preventDefault()
    }


    async function update() {
        const currentAdmin = JSON.parse(localStorage.getItem('admin'))
        try {
            var id = '';
            if (currentAdmin) {
                id = currentAdmin._id;
            }
            const res = await api.post('/auth/adminUpdate', { id, email, password });
            store.dispatch(setAlert('Upated Successfully !', 'info'));
            setValues({
                email: res.data.email,
                password: res.data.password
            })

        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    };

    return (
        <>
            <div style={{ margin: 'auto', width: '50%', padding: '10px' }}>
                <Card style={{ margin: '15px', padding: '15px' }}>
                    <Box sx={{ mb: 6, paddingTop: '25px' }}>
                        <p style={{ margin: '10px', fontSize: '20px', marginLeft: 0 }}> <b> Update Your Credentials </b></p>
                        <Typography variant='body2' key='2'>Please Enter Your New Credentials !</Typography>
                    </Box>

                    <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                        <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                            <OutlinedInput
                                label='Password'
                                value={password}
                                id='auth-login-password'
                                onChange={(e) => setPassword(e.target.value)}
                                type={values.showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            aria-label='toggle password visibility'
                                        >
                                            {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Box
                            sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                        >

                        </Box>
                        <Button
                            fullWidth
                            size='large'
                            variant='contained'
                            sx={{ marginBottom: 3 }}
                            onClick={update}
                        >
                            Update
                        </Button>

                    </form>
                </Card>
            </div>
        </>
    )
}

export default HashTags;
