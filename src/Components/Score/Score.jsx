import React from 'react'
import ShowScore from './ShowScore';
import s from './Score.module.css'
import style from '../Style.module.css'
import styled from 'styled-components';
import darkBack from '../../images/dark_back.png'
import lightBack from '../../images/light_back.png'
import buttonClick from "../../sounds/sound3.mp3";
import Header from '../Header/Header';

const Score = (props) => {
    let theme = props.settings.isDarkTheme

    const playSound = () => {
        const audioFile = new Audio(buttonClick);
        audioFile.volume = props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0
        audioFile.play()
    }

    const setPage = (e) => {
        playSound()
        props.setCurrentScorePage(e.target.value)
    }

    const chooseArray = (value) => {
        switch (value) {
            case '1': { return props.begginerGames }
            case '2': { return props.mediumGames }
            case '3': { return props.expertGames }
            default: { return props.lastTenGames }
        }
    }
    return (
        <Background darkBack={darkBack} theme={theme} lightBack={lightBack}>
            <Header settings={props.settings} login={props.login} theme={theme} />
            <FullScore theme={theme}>
                <div>
                    <TextName theme={theme}><h1>Score</h1></TextName>
                    <div className={s.newGameButtons}>
                        <button className={s.scoreButton + ' ' + (props.currentScorePage === '0' ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons))} onClick={setPage} value={0} >Last games</button>
                        <button className={s.scoreButton + ' ' + (props.currentScorePage === '1' ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons))} onClick={setPage} value={1} >Begginer</button>
                        <button className={s.scoreButton + ' ' + (props.currentScorePage === '2' ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons))} onClick={setPage} value={2} >Medium</button>
                        <button className={s.scoreButton + ' ' + (props.currentScorePage === '3' ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons))} onClick={setPage} value={3} >Expert</button>
                    </div>
                </div>
                <ShowScore theme={theme} scoreArray={chooseArray(props.currentScorePage)} cP={props.currentScorePage !== '0' ? true : false} />
            </FullScore>
        </Background>
    )
}

export default Score

const TextName = styled.div`
color: ${props => props.theme === true ? '#cccccc' : '#F2DDB3'};
`


const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme === true ? `url(${props.darkBack}), #C4C4C4;` : `url(${props.lightBack}), #C4C4C4;`}
`
const FullScore = styled.div`
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