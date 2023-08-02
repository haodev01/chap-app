import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, InputLabel, MenuItem, OutlinedInput, Select,
  TextField,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import roomApi from "../../apis/room.api.js";
import {typeLocal} from "../../consants/index.js";
import authApi from "../../apis/auth.api.js";
export default  function HomePage () {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('public');
  const [listRoom, setListRoom] = useState([])
  const [roomActive, setRoomActive] = useState('')
  const [listMessage, setListMessage] = useState([])
  const [listUser, setListUser] = useState([])
  const [userSelected, setUserSelected] = useState([])
  const [roomName, setRoomName] = useState('')

  const user = localStorage.getItem(typeLocal.USER_INFO) ? JSON.parse(localStorage.getItem(typeLocal.USER_INFO)) : null


  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    getAllRoom()
    authApi.getUser().then((response) => {
      setListUser(response.data.users)
    })
  }, [])

  useEffect(() => {
  if(roomActive) {
    roomApi.get(roomActive).then((response) => {
      console.log(response)
      setListMessage(response.data.conversation)
    })
  }
  }, [roomActive])

  const getAllRoom = async () => {
    roomApi.getAll().then((response) => {
      console.log(response)
      console.log(response)
      setListRoom(response.data.rooms)
    })
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const payload = {
      groupName: roomName,
      type: 'public',
      userIds: userSelected
    }
    roomApi.add(payload).then(() => {
      getAllRoom()
    })
      .finally(() => setOpen(false))
  }

  const handleChange = (event) => {
      setType(event.target.value)
  }
  const handleChangeSelected = (event) => {
    const {target: { value },} = event;
    setUserSelected(typeof value === 'string' ? value.split(',') : value,);
  };
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
                  <div className={roomActive && roomActive === room._id ? "item-inbox active" : "item-inbox "} key={index} onClick={() => setRoomActive(room._id)}>
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
          {!roomActive && <h1>Chào mừng bạn đến với Chat App</h1>}
        <div className="data-list">
         <div className="message">
           {roomActive  && !listMessage.length ? <div><h1>Bắt đầu trò chuyện nào</h1></div> : null}
           { (listMessage && listMessage.length ) ? listMessage.map((data) => (
             <Box key={data._id} sx={{
               display: "flex",
               justifyContent:user && data.postedByUser._id === user.userid ? "flex-end": "flex-start",
             }}>
               <Box>
                 { user && data.postedByUser._id !== user.userid && <span className="username-message">{data.postedByUser.username}</span>}
                 <Box  sx={{
                   textAlign: user && data.postedByUser._id === user.userid ? "right": "left",
                   backgroundColor: "primary.dark",
                   marginBottom: "20px",
                   padding: "4px 10px",
                   width: "fit-content",
                   opacity: user && data.postedByUser._id === user.userid? "100%": "70%",
                   color:  "#ffffff",
                   fontSize: "16px",
                   borderRadius: "4px"
                 }}>
                   <Typography > {data.message ? data.message.messageText : 'Tin nhắn không được hiện thị'}</Typography>
                 </Box>
               </Box>
             </Box>
           )) : null}
         </div>
          <div className="input">
            <input type="text" placeholder="Enter your message"/>
          </div>
        </div>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Tạo Room</DialogTitle>
        <DialogContent>
          <TextField
            value={roomName}
            autoFocus
            margin="dense"
            id="otp"
            label="Tên room"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setRoomName(event.target.value)}
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
          <Box sx={{marginTop: '20px'}}>
            <InputLabel id="demo-multiple-name-label">Chọn thành viên</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              fullWidth
              value={userSelected}
              onChange={handleChangeSelected}
            >
              {listUser.map((user) => (
                <MenuItem
                  key={user._id}
                  value={user._id}
                >
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}