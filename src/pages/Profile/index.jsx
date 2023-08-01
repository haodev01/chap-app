import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Button, Fab, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useState} from "react";


export default function Profile() {
  const [gender, setGender] = useState('male')
  const [username, setUserName] = useState('Nguyen Chi Hao')
  const [phone, setPhone] = useState('0964572402')

  const handleChange = (event) => {
    setGender(event.target.value)
  }

  const handleUploadClick = () => {}
  return (
   <Box >
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
      <Box sx={{marginTop:'50px'}}>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUploadClick}
          style={{display:'none'}}
        />
        <label htmlFor="contained-button-file">
            <img className="image-round" src="https://tse1.mm.bing.net/th?id=OIP.9Q-IHG9jdG7NBEXX3JGfxwHaIt&pid=Api&rs=1&c=1&qlt=95&w=100&h=118" alt=""/>
        </label>
      </Box>
     <Box sx={{maxWidth: '500px', margin: 'auto', marginTop:'40px'}}>
       <Box sx={{marginBottom: '10px'}}>
         <TextField
           margin="normal"
           required
           fullWidth
           id="username"
           value={username}
           label="Tên hiển thị"
           name="username"
           autoComplete="username"
           autoFocus
         />
       </Box>
       <Box sx={{marginBottom: '10px'}}>
         <TextField
           margin="normal"
           required
           fullWidth
           id="phone"
           label="Số điện thoại"
           name="phone"
           autoComplete="phone"
           value={phone}
           autoFocus
         />
       </Box>
       <Box sx={{marginBottom: '10px'}}>
       </Box>
       <Box>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           fullWidth
           value={gender}
           onChange={handleChange}
         >
           <MenuItem value="male">Giới tính: Name</MenuItem>
           <MenuItem value="private">Giới tính: Nữ</MenuItem>
         </Select>
       </Box>
       <Button variant="contained" fullWidth sx={{marginTop: '20px'}}>Cập nhập</Button>
     </Box>
   </Box>
  )
}