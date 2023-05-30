import './App.css';
import  Header from './Header';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function HomePage() {


    let artem = 1
    return (
        <div className="HomePage">
            <Header />
            <Button onClick={() => {}} > da </Button>
        </div > 
    );
}

export default HomePage;
