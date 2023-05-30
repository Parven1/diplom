import './App.css';
import * as React from 'react';
import { useForm } from "react-hook-form";
import Header from './Header';
import { useState, useEffect } from 'react';
import HomePage from './HomePage';
import { json, useParams } from 'react-router-dom';

import axios from 'axios';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Autocomplete from '@mui/material/Autocomplete';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { lightBlue, lightGreen } from '@mui/material/colors';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {

  const documentsOptions = ['Пасспорт'];

  const [role, setRole] = useState(useParams().role);
  const [login, setLogin] = useState(useParams().login);

  const [passport, setPassport] = useState('');
  const [driverlicence, setDriverlicence] = useState('');
  const [medicalInsurance, setMedicalInsurance] = useState('');
  const [visa, setVisa] = useState('');

  const [passportRequest, setPassportRequest] = useState('');
  const [medicalInsuranceRequest, setMedicalInsuranceRequest] = useState('');
  const [visaRequest, setVisaRequest] = useState('');

  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClickDocumentsOpen = () => {
    setDocumentsOpen(!documentsOpen);
  };

  const [passportOpen, setPassportOpen] = useState(false);

  const handleClickPassportOpen = () => {
    setPassportOpen(!passportOpen);
  };

  const [textAreaValue, setTextAreaValue] = useState('')

  const [driverlicenceOpen, setDriverlicenceOpen] = useState(false);

  const handleClickDriverlicenceOpen = () => {
    setDriverlicenceOpen(!driverlicenceOpen);
  };

  const [medicalInsuranceOpen, setMedicalInsuranceOpen] = useState(false);

  const handleClickMedicalInsuranceOpen = () => {
    setMedicalInsuranceOpen(!medicalInsuranceOpen);
  };

  const [visaOpen, setVisaOpen] = useState(false);

  const handleClickVisaOpen = () => {
    setVisaOpen(!visaOpen);
  };

  const [requestsOpen, setRequestsOpen] = useState(false);

  const handleClickRequestsOpen = () => {
    setRequestsOpen(!requestsOpen);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const { register, handleSubmit } = useForm();

  const setPassportFlag = () => {
    axios.get(`http://localhost:8000/requests/setPassportFlag=${passportRequest.id}`)
      .then((res) => {

      }
      )
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/documents/getPassport=${login}`)
      .then((res) => {
        if (res.data != 'mistake has occured') {
          setPassport(JSON.stringify(res.data))
        }
        else {
          console.error(res);
        }
      }
      )
  })
  useEffect(() => {
    axios.get(`http://localhost:8000/documents/getMedicalInsurance=${login}`)
      .then((res) => {
        if (res.data != 'mistake has occured') {
          setMedicalInsurance(JSON.stringify(res.data))
        }
        else {
          console.error(res);
        }
      }
      )
  })

  useEffect(() => {
    axios.get(`http://localhost:8000/documents/getVisa=${login}`)
      .then((res) => {
        if (res.data != 'mistake has occured') {
          setVisa(JSON.stringify(res.data))
        }
        else {
          console.error(res);
        }
      }
      )
  })

  useEffect(() => {
    if (role == 1) {
      axios.get(`http://localhost:8000/requests/getPassportRequest`)
        .then((res) => {
          if (res.data != 'mistake has occured') {
            setPassportRequest(res.data)
          }
          else {
            console.error(res);
          }
        }
        )
    }
  })



  const handleClickAddRequest = (data) => {
    if (inputValue == 'Пасспорт') axios.get(`http://localhost:8000/requests/addPassportRequest=${login},'passport',${data.passportNumber},${data.surname},${data.name},${data.nationality},${data.dateOfBirth},${data.sex},${data.dateOfIssue},${data.dateOfExpiry},${data.identificationNumber},${data.placeOfBirth},${data.authority},`)
      .then((res) => {
        if (res.data != 'mistake has occured') {
          console.log(res.data)
        }
        else {
          console.error(res);
        }
      }
      )
  }

  const [openHelp, setopenHelp] = useState(false);

  const handleCkickOpenHelp = () => {
    setopenHelp(true);
  };

  const handleCloseHelp = () => {
    setopenHelp(false);
  };

  if (role == 2)
    return (
      <div className="App">
        <Header component />
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClickDocumentsOpen}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Ваши Документы" />
              {documentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
              <List component="div">
                <List sx={{ width: "95%" }} component="div">
                  <ListItemButton onClick={handleClickPassportOpen} sx={{ pl: 4 }}>
                    <ListItemText primary="Паспорт" />
                    {passportOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={passportOpen} timeout="auto" unmountOnExit>
                    <List component="div">
                      <ListItemText primary={passport ? passport : 'Ой'} />
                    </List>
                  </Collapse>
                </List>
              </List>
            </Collapse>

            <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
              <List component="div">
                <List sx={{ width: "95%" }} component="div">
                  <ListItemButton onClick={handleClickMedicalInsuranceOpen} sx={{ pl: 4 }}>
                    <ListItemText primary="Медицинская страховка" />
                    {medicalInsuranceOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={medicalInsuranceOpen} timeout="auto" unmountOnExit>
                    <List component="div">
                      <ListItemText primary={medicalInsurance ? medicalInsurance : 'Ой'} />
                    </List>
                  </Collapse>
                </List>
              </List>
            </Collapse>

            <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
              <List component="div">
                <List sx={{ width: "95%" }} component="div">
                  <ListItemButton onClick={handleClickVisaOpen} sx={{ pl: 4 }}>
                    <ListItemText primary="Виза" />
                    {visaOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={visaOpen} timeout="auto" unmountOnExit>
                    <List component="div">
                      <ListItemText primary={visa ? visa : 'Ой'} />
                    </List>
                  </Collapse>
                </List>
              </List>
            </Collapse>



            <ListItemButton onClick={handleClickOpen}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Добавить Запрос" />
            </ListItemButton>

            <ListItemButton onClick={() => { setopenHelp(true) }} >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Консультация" />
            </ListItemButton>
          </List>
        </Box>

        <Dialog
          onSubmit={handleSubmit((data) => { handleClickAddRequest(data) })}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Заполните ваш запрос
          </DialogTitle>
          <form>
            <Autocomplete
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="outlined-basic"
              options={documentsOptions}
              sx={{ width: "90%", }}
              renderInput={(params) => <TextField {...params} label="Выберите тип документов" />}
            />
            {inputValue == 'Пасспорт' && (<>
              <DialogContent>
                <TextField id="outlined-basic" label="Номер паспорта" variant="outlined" {...register("passportNumber")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Фамилия" variant="outlined" {...register("surname")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Имя" variant="outlined" {...register("name")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Гражданство" variant="outlined" {...register("nationality")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Дата рождения" variant="outlined" {...register("dateOfBirth")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Пол" variant="outlined" {...register("sex")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Дата выдачи" variant="outlined" {...register("dateOfIssue")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Дата истечения срока действия" variant="outlined" {...register("dateOfExoiry")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Индефикационный номер" variant="outlined" {...register("identificationNumber")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Место рождения" variant="outlined" {...register("placeOfBirth")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Орган, выдавший паспорт" variant="outlined" {...register("authority")} />
              </DialogContent>
              <DialogActions>
                <Button className='Dialog_button' onClick={handleClose} variant="outlined" color="error" >Отмена</Button>
                <Button className='Dialog_button' variant="outlined" color="success" type="submit" >Добавить запрос</Button>
              </DialogActions>
            </>)}

            {inputValue == 'Водительские права' && (<>
              <DialogContent>
                <TextField id="outlined-basic" label="Логин" variant="outlined" {...register("login")} />
              </DialogContent>
              <DialogContent>
                <TextField id="outlined-basic" label="Пароль" variant="outlined" {...register("password")} />
              </DialogContent>
              <DialogActions>
                <Button className='Dialog_button' onClick={handleClose} variant="outlined" color="error" >Отмена</Button>
                <Button className='Dialog_button' variant="outlined" color="success" type="submit" >Добавить запрос</Button>
              </DialogActions>
            </>)}
            {!documentsOptions.includes(inputValue) && (<>
              <DialogActions>
                <Button className='Dialog_button' onClick={handleClose} variant="outlined" color="error" >Отмена</Button>
              </DialogActions>
            </>)}
          </form>
        </Dialog>

        <Dialog
          open={openHelp}
          onClose={handleCloseHelp}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Нужна помощь?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              По всем вопросам обращайтесь по номеру +375447595710
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div >
    );
  else if (role == 1) return (
    <div>
      <Header component />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickDocumentsOpen}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Зайвки на добавление" />
            {documentsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
            <List component="div">
              <List sx={{ width: "95%" }} component="div">
                <ListItemButton onClick={handleClickPassportOpen} sx={{ pl: 4 }}>
                  <ListItemText primary="Заявки на паспорт" />
                  {passportOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={passportOpen} timeout="auto" unmountOnExit>
                  <List component="div">
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Item>Логин пользователя</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.userLogin}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Номер пасспорта</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.passportNumber}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Фамилия</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.surname}</Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item>Имя</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.name}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Гражданство</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.nationality}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Дата рождения</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.dateOfBirth}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Пол</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.sex}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Дата выдачи</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.dateOfIssue}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Дата окончания</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.dateOfExpiry}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Индефикационный номер</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.identificationNumber}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Место рождения</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.placeOfBirth}</Item>
                      </Grid>

                      <Grid item xs={4}>
                        <Item>Орган выдачи</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{passportRequest.authority}</Item>
                      </Grid>
                    </Grid>
                    <textarea defaultValue="Поле для пометок"></textarea>
                    <Button onClick={() => { setPassportFlag() }}>Подтвердить</Button>
                  </List>
                </Collapse>
              </List>
            </List>
          </Collapse>

          <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
            <List component="div">
              <List sx={{ width: "95%" }} component="div">
                <ListItemButton onClick={handleClickMedicalInsuranceOpen} sx={{ pl: 4 }}>
                  <ListItemText primary="Заявки на медицинскую страховку" />
                  {medicalInsuranceOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={medicalInsuranceOpen} timeout="auto" unmountOnExit>
                  <List component="div">
                    <ListItemText primary={medicalInsuranceRequest ? medicalInsuranceRequest : 'Ой'} />
                  </List>
                </Collapse>
              </List>
            </List>
          </Collapse>

          <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
            <List component="div">
              <List sx={{ width: "95%" }} component="div">
                <ListItemButton onClick={handleClickVisaOpen} sx={{ pl: 4 }}>
                  <ListItemText primary="Заявки на визу" />
                  {visaOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={visaOpen} timeout="auto" unmountOnExit>
                  <List component="div">
                    <ListItemText primary={visaRequest ? visaRequest : 'Ой'} />
                  </List>
                </Collapse>
              </List>
            </List>
          </Collapse>


          <ListItemButton onClick={() => { setopenHelp(true) }} >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Консультация" />
          </ListItemButton>
        </List>
      </Box>
      <Dialog
        open={openHelp}
        onClose={handleCloseHelp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Нужна помощь?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            По всем вопросам обращайтесь по номеру +375447595710
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
