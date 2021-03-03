import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import bomb from './../../images/bomb.png'
import style from '../Style.module.css'

import buttonClick from "../../sounds/sound3.mp3";
import styled from 'styled-components'

const buttonClickSound = new Audio(buttonClick);

export const setVolumeHeaderSound = () => {
    
}

const Header = (props) => {

    const playSound = () => {
        buttonClickSound.volume = props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0
        buttonClickSound.play()
    }

    return (
        <div className={s.header}>
            <div className={s.headerContent + ' ' + (props.theme ? style.dark_header_bg : style.light_header_bg)}>
                <div className={s.header__section}>
                    <div className={s.header__item}>
                        <NavLink to={'/'} onClick={playSound}>
                            <img src={bomb} />
                            Sapper (back)
                        </NavLink>
                    </div>
                </div>
                <div className={s.header__section}>
                    <TextName theme={props.theme}>{props.login == '' ? 'No User' : props.login}</TextName>
                    <div className={s.header__item}>
                        {props.login
                            ? <NavLink to={'/login'}><button className={props.theme ? style.dark_newGameButtons : style.light_newGameButtons} onClick={playSound}>Log out</button></NavLink>
                            : <NavLink to={'/login'}><button className={props.theme ? style.dark_newGameButtons : style.light_newGameButtons} onClick={playSound}>Login</button></NavLink>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

const TextName = styled.div`
margin: 5px;
font-style: italic;
font-weight: bold;
color: ${props => props.theme === true ? '#cccccc' : '#F2DDB3'};
`