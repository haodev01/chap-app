import {Box, Button, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {NavLink, useNavigate} from "react-router-dom";
import authApi from "../../apis/auth.api.js";
import {typeLocal} from "../../consants/index.js";
export default  function LoginPage () {

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const payload = {
      phonenumber: data.get('phone'),
      password:data.get('password')
    }
    authApi.login(payload)
      .then((response) => {
        console.log(response)
        localStorage.setItem(typeLocal.ACCESS_TOKEN, response.data.accessToken)
        localStorage.setItem(typeLocal.USER_INFO, JSON.stringify(response.data.user))
        navigate('/')
      })
    console.log({
      phone: data.get('phone'),
    });
  }
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '500px',
          margin: 'auto',
          marginTop: '60px'
        }}
      >
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Số điện thoại"
            name="phone"
            autoComplete="phone"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Mật khẩu"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item >
              <NavLink to="/register">
                {"Bạn chưa có tài khoản? Đăng ký"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
    </Box>
  )
}