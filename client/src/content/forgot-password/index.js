// ** React Imports
import { useState } from 'react'
import store from '../../store'
import { setAlert } from '../../actions/alert'
import api from 'src/utils/api'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import { Grid } from '@mui/material'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ForgotPassword = () => {

    const [values, setValues] = useState({
        showPassword: false
    })
    const [password2, setPassword2] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [emailStage, setEmailStage] = useState(true);
    const [verify, setVerify] = useState(false)
    const [code, setCode] = useState('');
    const [sentCode, setSentCode] = useState('');

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    async function updatePass() {
        try {
            if (password === password2) {
                const res = await api.post('/auth/updatePassword', { email, password });
                if (res.data.email) {
                    store.dispatch(setAlert('Password Changed. Please Login Now !', 'info'));
                    window.location.href = '/login'
                }
                else {
                    store.dispatch(setAlert('Something went wrong !', 'error'));
                }
            }
            else {
                store.dispatch(setAlert('Passwords Do Not Match !', 'error'));
            }


        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    };


    //////////

    const findAccount = async () => {
        store.dispatch(setAlert("Loading ... Please Wait !", 'info'))
        try {
            const res = await api.post('/auth/findAccount', { email });
            setSentCode(res.data.code);
            if (res.data.status === true) {
                setEmailStage(false)
                setVerify(true)
            }
            else {
                store.dispatch(setAlert('Account Not Found !', 'error'));
            }
        } catch (err) {
            if (err) {
                store.dispatch(setAlert('Something went wrong !', 'error'));
            }
        }
    }

    const onVerify = (e) => {
        e.preventDefault()
        if (sentCode == code) {
            setEmailStage(false);
            setVerify(false);
        }
        else {
            store.dispatch(setAlert('Code Do Not Match !', 'error'))
        }
    }

    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={3}>
            </Grid>
            <Card>
                {emailStage ?
                    <>
                        <Card style={{ padding: '30px' }}>
                            <Box sx={{ mb: 6 }}>
                                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }} key='1'>
                                    Find Account
                                </Typography>
                                <Typography variant='body2' key='2'>Please Enter Your Email Address !</Typography>
                            </Box>
                            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                                <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Button
                                    fullWidth
                                    size='large'
                                    variant='contained'
                                    sx={{ marginBottom: 1 }}
                                    onClick={findAccount}
                                >
                                    Find Account
                                </Button>
                            </form>
                        </Card>
                    </> : verify ?
                        <>
                            <Card style={{ padding: '30px' }}>
                                <Box sx={{ mb: 6 }}>
                                    <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }} key='1'>
                                        Verify Email
                                    </Typography>
                                    <Typography variant='body2' key='2'>Please Enter Verification Code Sent to {email}</Typography>
                                </Box>
                                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                                    <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />

                                    <Button
                                        fullWidth
                                        type='button'
                                        size='large'
                                        variant='contained'
                                        onClick={onVerify}
                                        sx={{ marginBottom: 1 }}
                                    >
                                        Verify
                                    </Button>
                                </form>
                            </Card>
                        </>
                        :
                        <>
                        <Card style={{ padding: '30px' }}>
                            <Box sx={{ mb: 6 }}>
                                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }} key='1'>
                                    Rese Your Password
                                </Typography>
                                <Typography variant='body2' key='2'>Please Enter New Password !</Typography>
                            </Box>

                            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
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
                                <FormControl fullWidth>
                                    <InputLabel htmlFor='auth-login-password'>Confirm Password</InputLabel>
                                    <OutlinedInput
                                        label='confirm'
                                        value={password2}
                                        id='auth-login-password'
                                        onChange={(e) => setPassword2(e.target.value)}
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
                                    sx={{ marginBottom: 1 }}
                                    onClick={updatePass}
                                >
                                    Update
                                </Button>
                            </form>
                            </Card>
                        </>
                }
            </Card>

        </Grid>


    )
}

export default ForgotPassword
