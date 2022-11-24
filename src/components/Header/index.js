import React from 'react'
import './header.css'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import { Apps, ArrowDropDown, Notifications } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const signOut = ()=>{
        auth.signOut().then(()=>{
            dispatch(logout());
        });
    }

  return (
    <div className='header'>
        <div className='header__left'>
            <IconButton>
                <MenuIcon />
            </IconButton>
            <img src='https://www.vectorlogo.zone/logos/gmail/gmail-ar21.png' alt=''/>
        </div>
        <div className='header__middle'>
            <SearchIcon />
            <input placeholder='Search mail' type='text' />
            <ArrowDropDown className='header__inputCaret' />
        </div>
        <div className='header__right'>
            <IconButton>
                <Apps />
            </IconButton>
            <IconButton>
                <Notifications />
            </IconButton>
            <Avatar onClick={signOut} src={user.photoUrl} />
        </div>

    </div>
  )
}

export default Header