// ** React Imports
import { useState } from 'react'
import store from '../../store'
import { setAlert } from '../../actions/alert'
import api from 'src/utils/api'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))


const Login = ( ) => {

  const [values, setValues] = useState({
    showPassword: false
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  async function login() {
    try {
      const res = await api.post('/auth/adminLogin', { email, password });
      localStorage.setItem('admin', JSON.stringify(res.data))
      window.location.href = '/'
      
    } catch (err) {
      if (err) {
        store.dispatch(setAlert('Something went wrong !', 'error'));
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', height: '100vh'}}>
      <Card style={{ padding: '30px' }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
          <img src="/logo.png" style={{width: '80px', height: '80px'}} alt="log not found" />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              TikTurbo
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }} key='1'>
              Welcome to TikTurbo
            </Typography>
            <Typography variant='body2' key='2'>Please sign-in to your account and manage</Typography>
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
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <a onClick={() => window.location.href = '/forgot-password'} style={{cursor: 'pointer'}}>
                Forgot Password ?
              </a> 
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              onClick={login}
            >
              Login
            </Button>
  
          </form>
      </Card>
  </div>
  )
}

export default Login;
