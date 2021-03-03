import React, { useEffect } from 'react'
import s from './Game.module.css'
import style from '../Style.module.css'
import Timer from './Timer'
import bomb from './../../images/bomb.png'
import flag from './../../images/flag.png'
import none from './../../images/none.png'
import good from './../../images/good.png'
import bad from './../../images/bad.png'
import Header from '../Header/Header'

import styled from 'styled-components';
import darkBack from '../../images/dark_back.png'
import lightBack from '../../images/light_back.png'

const Game = (props) => {
    const getSEP = () => {
        return props.selectedElementPosition
    }

    let theme = props.settings.isDarkTheme
    useEffect(() => {

        const onKeypress = key => {
            let newPos
            let pos = getSEP()
            let width = props.planeWidth
            let height = props.planeHeight
            const isBordered = (pos, h, w) => {
                if (pos[0] < -1 && pos[1] < -1) {
                    pos[0] = 0
                    pos[1] = 0
                } else if (pos[0] > h - 1) {
                    pos[0] = 0
                } else if (pos[0] < 0) {
                    pos[0] = h - 1
                } else if (pos[1] > w - 1) {
                    pos[1] = 0
                } else if (pos[1] < 0) {
                    pos[1] = w - 1
                }
                return pos
            }
            switch (key.keyCode) {
                case props.keys.goUpKey: newPos = [pos[0] - 1, pos[1]]
                    pos = isBordered(newPos, height, width)
                    props.setSelectedElementPosition(pos)
                    break
                case props.keys.goLeftKey: newPos = [pos[0], pos[1] - 1]
                    pos = isBordered(newPos, height, width)
                    props.setSelectedElementPosition(pos)
                    break
                case props.keys.goRightKey: newPos = [pos[0], pos[1] + 1]
                    pos = isBordered(newPos, height, width)
                    props.setSelectedElementPosition(pos)
                    break
                case props.keys.goDownKey: newPos = [pos[0] + 1, pos[1]]
                    pos = isBordered(newPos, height, width)
                    props.setSelectedElementPosition(pos)
                    break
                default: props.setSelectedElementPosition(pos)
            }
            switch (key.keyCode) {
                case props.keys.setFlagKey: onHandleClick(3, props.selectedElementPosition[0], props.selectedElementPosition[1])
                    break
                case props.keys.openScoreKey: onHandleClick(1, props.selectedElementPosition[0], props.selectedElementPosition[1])
                    break
                case props.keys.newGameKey: NewGame(props.dificulty)
                    break
                case props.keys.newBegginerGameKey: NewGame(1)
                    break
                case props.keys.newMediumGameKey: NewGame(2)
                    break
                case props.keys.newExpertGameKey: NewGame(3)
                    break
                case props.keys.autoPlay: autoPlay()
                    break
                default:
            }
        }

        document.addEventListener('keydown', onKeypress)
        return () => {
            document.removeEventListener('keydown', onKeypress)
        }
    })

    const playSound = audioFile => {
        if (props.isSoundEffectsOn) {
            audioFile.volume = props.effectsVolume
            audioFile.play()
        }
    }

    const drawImg = (i, j) => {
        if (props.userPlane[i][j] === '*') {
            return <img className={s.bombImg} src={bomb} />
        } else if (props.userPlane[i][j] === 'P') {
            return <img className={s.flagImg} src={flag} />
        } else {
            return props.userPlane[i][j]
        }
    }

    const onHandleClick = (btnNum, i, j) => {
        if (props.isWin === null)
            switch (btnNum) {
                case 1:
                    playSound(props.scoreClickAudio)
                    props.clickButton(i, j, props.plane, props.userPlane, props.planeWidth, props.planeHeight, props.dificulty, props.time, props.lastTenGames)
                    break
                case 3:
                    playSound(props.flagClickAudio)
                    props.clickFlag(i, j, props.userPlane, props.flagsCount, props.dificulty, props.time, props.lastTenGames)
                    break
            }
    }

    const NewGame = (e) => {
        playSound(props.buttonClickAudio)
        typeof e.target === 'undefined'
            ? props.startNewGame(e)
            : props.startNewGame(parseInt(e.target.value ? e.target.value : props.dificulty))
    }
    const autoPlay = () => {
        if(!props.autoPlay)
        console.log('not implemented')
        playSound(props.buttonClickAudio)
        props.setAutoPlay(!props.autoPlay)
    }

    const chooseColor = (value) => {
        switch (value) {
            case 1: return s.red1
            case 2: return s.green2
            case 3: return s.blue3
            case 4: return s.indigo4
            case 5: return s.greenYellow5
            case 6: return s.darkBlue6
            case 7: return s.fuchsia7
            case 8: return s.brown8
            case 9: return s.gold9
            default: return s.zero
        }
    }
    const onMouseFocus = (e, i, j) => {
        props.setMouseSelectedElementPosition(i, j)
    }

    const makeGamePlane = () => {
        let gamePlane = []
        let gamePlane1 = []
        for (let i = 0; i < props.planeHeight; i++) {
            for (let j = 0; j < props.planeWidth; j++) {
                gamePlane1 = [...gamePlane1,
                <button className={s.gameElement + ' ' + (props.isWin === false && props.loosePosition[0] === i && props.loosePosition[1] === j ? s.redBG : '') + ' ' +
                    (props.userPlane[i][j] === props.plane[i][j] && props.plane[i][j] !== '*' ? (theme ? style.dark_opend : style.light_opend) + ' ' + chooseColor(props.plane[i][j]) : (theme ? style.dark_notOpend : style.light_notOpend))
                    + ' ' + (props.selectedElementPosition[0] == i && props.selectedElementPosition[1] == j ? (theme ? style.dark_hovered : style.light_hovered) : '')}
                    onClick={props.isWin !== null ? null : (e) => onHandleClick(1, i, j)} onContextMenu={props.isWin !== null ? null : (e) => onHandleClick(3, i, j)}
                    onMouseOver={e => onMouseFocus(e, i, j)} key={i * props.planeWidth + j} >
                    {drawImg(i, j)}
                </button>
                ]
            }
        }
        for (let i = 0; i < props.planeWidth * props.planeHeight; i += props.planeWidth) {
            gamePlane = [...gamePlane, <div key={i}>{gamePlane1.slice(i, i + props.planeWidth)}</div>]
        }
        return gamePlane
    }

    let gamePlane = makeGamePlane()

    return (
        <Background darkBack={darkBack} theme={theme} lightBack={lightBack}>
            <Header settings={props.settings} login={props.login} theme={theme} />
            <FullGame theme={theme}>
                <div className={s.mineSweaper}>
                    <div className={s.mineSweaperItems}>
                        <div className={s.newGameButtons}>
                            <button className={props.dificulty === 1 ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons)}
                                onClick={NewGame} value={1}>Begginer</button>
                            <button className={props.dificulty === 2 ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons)}
                                onClick={NewGame} value={2}>Medium</button>
                            <button className={props.dificulty === 3 ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons)}
                                onClick={NewGame} value={3}>Expert</button>
                            <button className={props.autoPlay === true ? style.checked : ' ' + (theme ? style.dark_newGameButtons : style.light_newGameButtons)}
                                onClick={autoPlay}>Auto play</button>
                        </div>
                        <div className={s.topButtonsAndPlane}>
                            <div className={s.topBar}>
                                <div className={s.topBarItem}>
                                    {props.flagsCount < 100 && props.flagsCount > 9 ? '0' + props.flagsCount : '00' + props.flagsCount}
                                </div>
                                <div className={s.topBarItem}>
                                    <button className={s.topNewGameButton + ' ' + (theme ? style.dark_topNewGameButton : style.light_topNewGameButton)}
                                        onClick={NewGame}><img src={props.isWin === null ? none : props.isWin ? good : bad} /></button>
                                </div>
                                <div className={s.topBarItem}>
                                    {props.time <= 9 ? '00' : props.time <= 99 ? '0' : null}
                                    {props.isWin === null && props.timerIsOn ? <Timer setTime={props.setTime} time={props.time} /> : props.time}
                                </div>
                            </div>
                            <div className={s.gamePlane}>
                                {gamePlane}
                            </div>
                        </div>
                    </div>
                </div>
            </FullGame>
        </Background>
    )
}

export default Game


const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme === true ? `url(${props.darkBack}), #C4C4C4;` : `url(${props.lightBack}), #C4C4C4;`}
`

const FullGame = styled.div`
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