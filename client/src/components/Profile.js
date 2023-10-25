import React, { useContext, useState } from "react";
import {Menu,MenuItem,Typography,styled,Box} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { DataContext } from "../context/DataProvider";

const Component = styled(Menu)`
    margin-top : 5px;
`
const Logout = styled(Typography)`
    margin-left:20px;
    font-size:14px;
`
const Profile = ()=>{
    
    const [open, setOpen] = useState();

    const {account,setAccount} = useContext(DataContext)

    const handleClick = (event) => {
        setOpen(event.currentTarget);
      };

      const handleClose = () => {
        setOpen(false);
      };
      
      const logoutHandle=()=>{
        setAccount("")
      }
      return (
        <>
        <Box onClick={handleClick}>
        <Typography variant="contain" style={{marginTop:"2px", cursor:'pointer'}}>{account}</Typography>
        </Box>
        
        <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
        <PowerSettingsNewIcon color="primary" fontSize="small"/>
        <Logout onClick={logoutHandle}>Logout</Logout>
        </MenuItem>
      </Component>
      </>
    )
}

export default Profile;