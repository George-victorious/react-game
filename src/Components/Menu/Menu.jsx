import React from 'react'
import { NavLink } from 'react-router-dom';
import s from './Menu.module.css'
import style from '../Style.module.css'
import Header from '../Header/Header'
import buttonClick from "../../sounds/sound3.mp3";
import styled from 'styled-components';
import darkBack from '../../images/dark_back.png'
import lightBack from '../../images/light_back.png'


const Menu = (props) => {

    let theme = props.theme

    const clearStore = () => {
        playSound()
        localStorage.removeItem('state');
    }

    const playSound = () => {
        const audioFile = new Audio(buttonClick);
        audioFile.volume = (props.isSoundEffectsOn ? props.effectsVolume : 0)
        audioFile.play()
    }

    return (
        <Background darkBack={darkBack} theme={theme} lightBack={lightBack}>
            <Header settings={props.settings} login={props.user.login} theme={theme} />
            <FullMenu theme={theme}>
                <TextName theme={theme}><h1>Menu</h1></TextName>
                <div className={s.menuButtons}>
                    <NavLink to='/game'><button className={theme ? style.dark_main : style.light_main} onClick={playSound}>Start game</button></NavLink>
                </div>
                <div className={s.menuButtons}>
                    <NavLink to='/score/last'><button className={theme ? style.dark_main : style.light_main} onClick={playSound}>Score</button></NavLink>
                </div>
                <div className={s.menuButtons}>
                    <NavLink to='/settings'><button className={theme ? style.dark_main : style.light_main} onClick={playSound}>Settings</button></NavLink>
                </div>
                <div className={s.menuButtons}>
                    <div className={s.close}>
                        <button className={theme ? style.dark_main : style.light_main} onClick={clearStore}>Clear locat store</button>
                    </div>
                </div>
            </FullMenu>
        </Background>
    )
}

export default Menu

const TextName = styled.div`
color: ${props => props.theme === true ? '#cccccc' : '#F2DDB3'};
`


const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme === true ? `url(${props.darkBack}), #C4C4C4;` : `url(${props.lightBack}), #C4C4C4;`}
`

const FullMenu = styled.div`
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