import * as React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';

import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './Header.css'

function Header() {

    const navigate = useNavigate();
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [role, setRole] = useState(useParams().role);
    const [login, setLogin] = useState(useParams().login);
    const [password, setPassword] = useState(useParams().password);

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const [IsLoggedIn, setIsLoggedIn] = useState(login? true : false);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);

    };

    const [openRegisrtation, setOpenRegistration] = useState(false);

    const handleClickOpenRegistration = () => {
        setOpenRegistration(true);
    };

    const handleCloseRegistration = (value) => {
        setOpenRegistration(false);

    };

    const handleSnackbarClose = (value) => {
        setSnackbaropen(false);

    };

    const [Snackbaropen, setSnackbaropen] = useState(false);

    const handleEnter = (data) => {
        if (data.login && data.password)
            axios.get(`http://localhost:8000/auth/login=${data.login},${data.password}`)
                .then((res) => {
                    if (res.data != 'incorrect login or password') {
                        setLogin(data.login)
                        setPassword(data.password)
                        setIsLoggedIn(true)
                        setRole(res.data.role)
                        navigate(`/${res.data.role}/${res.data.login}`)
                    }
                    else {
                        setSnackbaropen(true);
                        console.error(res);
                    }
                }
                )
        else setSnackbaropen(true);
        setOpen(false);
    };

    const handleRegistration = (data) => {
        if (data.login && data.password)
            axios.get(`http://localhost:8000/auth/registration=${data.login},${data.password}`)
                .then((res) => {
                    if (res.data != 'There is already an user with this name') {
                        setLogin(data.login)
                        setPassword(data.password)
                        setIsLoggedIn(true)
                        setRole(res.data.role)
                        navigate(`/${res.data.role}/${res.data.login}`)
                    }
                    else {
                        setSnackbaropen(true);
                        console.error(res);
                    }
                }
                )
        else setSnackbaropen(true);
        setOpen(false);
    };

    if (!IsLoggedIn)
        return (
            <AppBar position="static">
                <Toolbar>
                    {/*Inside the IconButton, we 
           can render various icons*/}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { navigate(`/`)}}
                    >
                        <HomeIcon  />
                    </IconButton>
                    <Typography variant="h6"
                        component="div" sx={{ flexGrow: 1 }}>
                        Кветка
                    </Typography>
                    <Button color="inherit" onClick={handleClickOpen} >Войти</Button>
                    <Button color="inherit" onClick={handleClickOpenRegistration} >Регистрация</Button>
                </Toolbar>
                <Dialog
                    onSubmit={handleSubmit((data) => { setData(data); handleEnter(data) })}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Введите данные аккаунта
                    </DialogTitle>
                    <form>
                        <DialogContent>
                            <TextField id="outlined-basic" label="Логин" variant="outlined" {...register("login")} />
                        </DialogContent>
                        <DialogContent>
                            <TextField id="outlined-basic" label="Пароль" variant="outlined" {...register("password")} />
                        </DialogContent>
                        <DialogActions>
                            <Button className='Dialog_button' onClick={handleClose} variant="outlined" color="error" >Отмена</Button>
                            <Button className='Dialog_button' variant="outlined" color="success" type="submit" >Войти</Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    onSubmit={handleSubmit((data) => { setData(data); handleRegistration(data) })}
                    open={openRegisrtation}
                    onClose={handleCloseRegistration}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Введите данные аккаунта
                    </DialogTitle>
                    <form>
                        <DialogContent>
                            <TextField id="outlined-basic" label="Логин" variant="outlined" {...register("login")} />
                        </DialogContent>
                        <DialogContent>
                            <TextField id="outlined-basic" label="Пароль" variant="outlined" {...register("password")} />
                        </DialogContent>
                        <DialogActions>
                            <Button className='Dialog_button' onClick={handleCloseRegistration} variant="outlined" color="error" >Отмена</Button>
                            <Button className='Dialog_button' variant="outlined" color="success" type="submit" >Войти</Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Snackbar open={Snackbaropen} autoHideDuration={10000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                        Неверный логин или пароль!
                    </Alert>
                </Snackbar>
            </AppBar>
        )
    else
        return (
            <AppBar position="static">
                <Toolbar>
                    {/*Inside the IconButton, we 
           can render various icons*/}
                    <IconButton 
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { navigate(`/`)}}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6"
                        component="div" sx={{ flexGrow: 1 }}>
                        Кветка
                    </Typography>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{login.charAt(0).toUpperCase()}{ }</Avatar>
                    <Button color="inherit" onClick={() => { navigate(`/`)}} >Выйти</Button>
                </Toolbar>

            </AppBar>
        )
}

export default Header
