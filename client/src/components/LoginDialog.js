import React, { useContext, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import { Box, Button, Dialog, TextField, Typography, responsiveFontSizes } from '@mui/material'
import styled from '@emotion/styled'
import { DataContext } from '../context/DataProvider'
import { authenticateLogin, authenticateSignup } from '../services/api';

const Component = styled(Box)`
    height:70vh;
    width:90vh;
`
const IBox = styled(Box)`
    background : #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height:82%;
    width:30%;
    padding:45px 35px;
    & > p, & > h5{
        color:#FFFFFF;
        
    }
`
const Wrapper = styled(Box)`
    display:flex;
    flex-direction:column;
    padding:45px 35px;
    flex : 1;
    & > div, & > button, & > p{
        margin-top:15px;
    }
`

const LoginButton = styled(Button)`
    text-transform:none;
    background : #fB641B;
    color:#fff;
    height:48px;
    border-radius:2px;
    &:hover{
        background : #fB641B;
    }
`
const OTPButton = styled(Button)`
    text-transform:none;
    background : #fff;
    color:#2874f0;
    height:48px;
    border-radius:2px;   
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text = styled(Typography)`
    font-size:12px;
    color:#878787;
`
const CreateAccountText = styled(Typography)`
    font-size:12px;
    color:#2874f0;
    text-align:center;
    cursor:pointer;
    font-weight:600;
`


const LoginDialog = ({ open, setOpen }) => {

    const navigate = useNavigate()

    const initialValue = {
        login: {
            view: 'login',
            heading: "Login",
            subHeading: "Get access to your Orders, Wishlist and Recommendations"
        },
        signup: {
            view: 'signup',
            heading: "Looks like you're new here!",
            subHeading: "Sign up with your mobile number to get started"
        }
    }

    const [flag, setFlag] = useState(false);


    const [signupUserData, setSignupUserData] = useState({
        email: '',
        password: '',
        mobile: ''
    })

    const [signinUserData, setSigninUserData] = useState({
        email: '',
        password: ''
    })

    const setSignup = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setSignupUserData({
            ...signupUserData, [name]: value
        })
    }
    const setSignin = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setSigninUserData({
            ...signinUserData, [name]: value
        })
    }

    const [toggleAccount, setToggleAccount] = useState(initialValue.login)

    const [errorMessage, setErrorMessage] = useState({
        success: '',
        msg: ''
    });

    const { account, setAccount } = useContext(DataContext)

    const changeAccount = (toggle) => {
        setToggleAccount(toggle)
    }

    const closeDialog = ({ flag }) => {
        setOpen(false)
        setToggleAccount(initialValue.login)
        setFlag(flag)  
    }

    const signupUser = async (e) => {
        e.preventDefault();

        setFlag(true)

        const response = await authenticateSignup(signupUserData)

        if (response.success) {

            //setAccount(response.data.email)

            setErrorMessage({
                success: response.success,//true
                msg: response.msg
            })

            setSignupUserData({
                email: '',
                password: '',
                mobile: '',
            })

            setTimeout(() => {
                closeDialog(false)
            }, 5000)

        } else {
            setErrorMessage({
                success: response.success,//false
                msg: response.msg
            })
        }
    }

    const signinUser = async (e) => {
        e.preventDefault();

        setFlag(false)

        const response = await authenticateLogin(signinUserData)

        if (response.success) {

            console.log(response);

            setAccount(response.data.email)

            setErrorMessage({
                success: response.success,//true
                msg: response.msg
            })

            setSigninUserData({
                email: '',
                password: '',
            })

            setTimeout(() => {
                closeDialog(true)
            }, 2000)

        } else {
            console.log(response);
            setErrorMessage({
                success: response.success,//false
                msg: response.msg
            })
        }
    }

    return (

        <Dialog open={open} onClose={closeDialog} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component style={{ display: 'flex' }}>
                <IBox>
                    <Typography variant='h5'>{toggleAccount.heading}</Typography>
                    <Typography style={{ marginTop: 20, color: '#DBDBDC' }}>{toggleAccount.subHeading}</Typography>
                </IBox>

                {
                    toggleAccount.view === "login" ?
                        <Wrapper>
                            {
                                //when signup button click then only this message show
                                //for this i set flag on signup submit form flag true
                                (flag==false) &&
                                <Typography style={{ color: `${errorMessage.success ? 'green' : 'red'}` }}>
                                    {errorMessage.msg}
                                </Typography>
                            }

                            <TextField name='email' value={signinUserData.email} onChange={(e) => setSignin(e)} variant='standard' label="Enter Email/Mobile number" />
                            <TextField name='password' value={signinUserData.password} onChange={(e) => setSignin(e)} variant='standard' label="Enter Password" />
                            <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={signinUser}>Login</LoginButton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <OTPButton>Request OTP</OTPButton>
                            <CreateAccountText onClick={()=>changeAccount(initialValue.signup)}>New to Flipkart? Create an account</CreateAccountText>
                        </Wrapper>

                        :

                        <Wrapper>
                            {

                                //when signup button click then only this message show
                                //for this i set flag on signup submit form flag true
                                (flag) &&
                                <Typography style={{ color: `${errorMessage.success ? 'green' : 'red'}` }}>
                                    {errorMessage.msg}
                                </Typography>
                            }
                            {
                                //if user if successfully register and flag is true then only so Redirecting message, else 
                                //showing register form
                                (flag && errorMessage.success) ? <Typography>Please open Login Form and Signin!!!</Typography> : <><TextField name='email' value={signupUserData.email} onChange={(e) => setSignup(e)} variant='standard' label="Enter Email" />
                                    <TextField name='password' value={signupUserData.password} onChange={(e) => setSignup(e)} variant='standard' label="Enter Password" />
                                    <TextField name='mobile' value={signupUserData.mobile} onChange={(e) => setSignup(e)} variant='standard' label="Enter Phone" />
                                    <LoginButton onClick={signupUser} type='submit'>Continue</LoginButton>
                                    <OTPButton onClick={()=>changeAccount(initialValue.login)}>Existing User? Log in</OTPButton></>

                            }


                        </Wrapper>
                }
            </Component>
        </Dialog>
    )
}

export default LoginDialog;