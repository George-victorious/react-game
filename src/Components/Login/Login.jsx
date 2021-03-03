import React from 'react'
import s from './Login.module.css'
import style from '../Style.module.css'
import Header from '../Header/Header'
import darkBack from '../../images/dark_back.png'
import lightBack from '../../images/light_back.png'
import styled from 'styled-components';
import buttonClick from "../../sounds/sound3.mp3";
import axios from 'axios';


const Login = (props) => {

    let theme = props.theme

    const setLogLogin = (e) => {
        props.setLogLogin(e ? e.target.value : '')
    }
    const logPassword = (e) => {
        props.logPassword(e ? e.target.value : '')
    }
    const setRegLogin = (e) => {
        props.setRegLogin(e ? e.target.value : '')
    }
    const setRegEmail = (e) => {
        props.setRegEmail(e ? e.target.value : '')
    }
    const setRegPassword = (e) => {
        props.setRegPassword(e ? e.target.value : '')
    }
    const setRegPasswordConfirm = (e) => {
        props.setRegPasswordConfirm(e ? e.target.value : '')
    }

    const regestry = () => {
        playSound()
        if (props.loginData.regPassword !== props.loginData.regPasswordConfirm) {
            alert('Passwords do not match!')
            return
        } else if (props.loginData.regLogin.length < 3 || props.loginData.regEmail.length < 3) {
            alert('Too short login or email!')
            return
        } else if (props.loginData.regPassword.length < 3 || props.loginData.regPasswordConfirm.length < 3) {
            alert('Passwords too short!')
            return
        }
        axios({
            method: 'post', //you can set what request you want to be
            url: 'https://arcane-falls-07410.herokuapp.com/api/auth/register',
            data: {
                "login": props.loginData.regLogin,
                "email": props.loginData.regEmail,
                "password": props.loginData.regPassword
            }
        }).then(res => {
            alert('Account created.')
            setRegLogin()
            setRegEmail()
            setRegPassword()
            setRegPasswordConfirm()

        })
            .catch(e => alert('Account not created. User name taken!'))
    }

    const login = () => {
        playSound()
        if (props.loginData.logPassword && props.loginData.logLogin) {
            props.setLoginReq(true)
            axios({
                method: 'post', //you can set what request you want to be
                url: 'https://arcane-falls-07410.herokuapp.com/api/auth/login',
                data: {
                    login: props.loginData.logLogin,
                    password: props.loginData.logPassword
                }
            })
                .then(res => {
                    setLogLogin()
                    logPassword()
                    props.addUser(res.data.login, res.data.token)
                    props.setLoginReq(false)

                })
                .catch(e => {
                    alert('Bad Account data!')
                    props.setLoginReq(false)
                })
        }
    }
    const playSound = () => {
        const audioFile = new Audio(buttonClick);
        audioFile.volume = (props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
        audioFile.play()
    }
    return (
        <Background darkBack={darkBack} theme={theme} lightBack={lightBack}>
            <Header settings={props.settings} login={props.login} theme={theme} />
            <FullLogin theme={theme}>
                <div className={s.fullLogin}>
                    <div className={s.forms}>
                        <Logindiv theme={theme}>
                            <TextName theme={theme}><h3>Login</h3></TextName>
                            <form action="submit">
                                <div><input value={props.loginData.logLogin} onChange={setLogLogin} placeholder="User name" type="text" name="userName" id="Un" rows="1"></input></div>
                                <div><input value={props.loginData.logPassword} onChange={logPassword} placeholder="Password" type="password" name="password" id="Pass" rows="1"></input></div>
                            </form>
                            <div className={s.submitButton + ' ' + s.marginButton}>
                                <button className={theme ? style.dark_main : style.light_main} type="submit" onClick={login}>{props.loginReq ? 'Loading' : 'Login'}</button>
                            </div>
                        </Logindiv>
                        <Logindiv theme={theme}>
                            <TextName theme={theme}><h3>Registration</h3></TextName>
                            <form action="submit">
                                <div><input value={props.loginData.regLogin} onChange={setRegLogin} placeholder="User name" type="text" name="userName" id="regEn" rows="1"></input></div>
                                <div><input value={props.loginData.regEmail} onChange={setRegEmail} placeholder="Email" type="email" name="userEmail" id="2" rows="regEm"></input></div>
                                <div><input value={props.loginData.regPassword} onChange={setRegPassword} placeholder="Password" type="password" name="password" id="3" rows="regP"></input></div>
                                <div><input value={props.loginData.regPasswordConfirm} onChange={setRegPasswordConfirm} placeholder="Password confirm" type="password" name="passwordRepit" id="regPc" rows="1"></input></div>
                            </form>
                            <div className={s.submitButton}>
                                <button className={theme ? style.dark_main : style.light_main} type="submit" onClick={regestry}>{props.registrReq ? 'Loading' : 'Regestry'}</button>
                            </div>
                        </Logindiv>
                    </div>
                </div>
            </FullLogin>
        </Background>
    )
}

export default Login


const TextName = styled.div`
color: ${props => props.theme === true ? '#cccccc' : '#F2DDB3'};
`

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme === true ? `url(${props.darkBack}), #C4C4C4;` : `url(${props.lightBack}), #C4C4C4;`}
`

const FullLogin = styled.div`
    min-width: 490px;
    max-width: 50%;
    margin: 0 auto;
    margin-top: 10px;
    height: 600px;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    background-color: ${props => props.theme === true ? '#212121' : '#756035'};
    border-color: ${props => props.theme === true ? '#939393' : '#BFAF8E'};
`

const Logindiv = styled.div`

margin: 0 auto;

input::placeholder {
    color: #cccccc;
}

input {
    width: 200px;
    height: 20px;
    padding: 5px;
    margin-top: 5px;
    background-color: ${props => props.theme === true ? '#656565' : '#867043'};
    border-color: ${props => props.theme === true ? '#939393' : '#BFAF8E'};
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    color: white;
    outline: none;
}
`