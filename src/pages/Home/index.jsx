import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {LIST_MESSAGE} from "../../data.js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, InputLabel, MenuItem, Select,
  TextField,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import roomApi from "../../apis/room.api.js";
export default  function HomePage () {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('public');
  const [listRoom, setListRoom] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    roomApi.getAll().then((response) => {
      console.log(response)
      console.log(response)
      setListRoom(response.data.rooms)
    })
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
      setType(event.target.value)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
         <Box sx={{
           height: "40px",
           backgroundColor: 'primary.dark',
           display: "flex",
           justifyContent:'space-between',
           alignItems:'center',
           padding: '0 20px'
         }}>
             <Typography sx={{color:'white'}}>Chap App</Typography>
             <Box>
              <div className='header-avatar'>
                <img src="http://tophinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg" alt=""/>
                <p>Chi Hao</p>
              </div>
             </Box>
         </Box>
        </Grid>
        <Grid item xs={3}>
          <div className="left">
            <div className="list-inbox">
              {
                listRoom.map((room, index) => (
                  <div className="item-inbox" key={index}>
                    <div className="item-inbox-avatar">
                      <img src="http://tophinhanhdep.net/wp-content/uploads/2015/12/anh-girl-xinh-9x-1.jpg" alt=""/>
                    </div>
                    <div className="item-inbox-right">
                      <span className="inbox-name">{room.groupName || 'Không có tên'}</span>
                      <span  className="inbox-message">Hom nay co viec gi the</span>
                    </div>
                  </div>
                ))
              }
            </div>
            <div  className="new-group" onClick={handleClickOpen}>+</div>
          </div>
        </Grid>
        <Grid item xs={9}>
        <div className="data-list">
         <div className="message">
           {LIST_MESSAGE.map((data) => (
             <Box key={data.id} sx={{
               display: "flex",
               justifyContent: data.isAuthor ? "flex-end": "flex-start",
             }}>
               <Box>
                 {!data.isAuthor && <span className="username-message">Tên người gửi</span>}
                 <Box  sx={{
                   textAlign:data.isAuthor ? "right": "left",
                   backgroundColor: "primary.dark",
                   marginBottom: "20px",
                   padding: "4px 10px",
                   width: "fit-content",
                   opacity: data.isAuthor ? "100%": "70%",
                   color:  "#ffffff",
                   fontSize: "16px",
                   borderRadius: "4px"
                 }}>
                   <Typography > {data.message}</Typography>
                 </Box>
               </Box>
             </Box>
           ))}
         </div>
          <div className="input">
            <input type="text" placeholder="Enter your message"/>
          </div>
        </div>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="Tên room"
            type="text"
            fullWidth
            variant="standard"
          />
         <Box sx={{marginTop: '20px'}}>
           <InputLabel id="demo-simple-select-label" sx={{marginBottom: '10px'}}>Type</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             fullWidth
             value={type}
             onChange={handleChange}
           >
             <MenuItem value="public">Public</MenuItem>
             <MenuItem value="private">Private</MenuItem>
           </Select>
         </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}