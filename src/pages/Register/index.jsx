import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import Grid from '@mui/material/Grid';
import {NavLink} from "react-router-dom";
import {useState} from "react";

export default  function RegisterPage () {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault()
    handleClickOpen()
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
        Đăng ký
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
          Đăng ký
        </Button>
        <Grid container>
          <Grid item >
            <NavLink to="/login">
              {"Bạn đã có tài khoản? Đăng nhập"}
            </NavLink>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận OTP</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Bạn vui lòng xác nhận OTP để đăng ký tài khoản
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="Mã OTP"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}