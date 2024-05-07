import { TextField } from '@mui/material'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const Contact = () => {
  return (
    <div>
      <form action="" style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',width:"40%"}}>
      <TextField id="outlined-basic" type='text' label="Fullname"  variant="outlined" style={{width:"100%"}} />
      <TextField id="outlined-basic" type='email' label="Email" variant="outlined"  style={{width:"100%"}} />
      <TextField id="outlined-basic" type='text' label="Title" variant="outlined" style={{width:"100%"}} />
      <TextArea placeholder="Message..." disabled sx={{ mb: 1 }} />
      </form>
    </div>
  )
}

export default Contact
