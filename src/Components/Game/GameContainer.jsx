import React from 'react'
import Game from './Game'
import { startNewGame, clickButton, clickFlag, setTime, setSelectedElementPosition, setMouseSelectedElementPosition, setAutoPlay, setAllState, setScore } from '../../redux/game-reducer'
import { connect } from 'react-redux'

import scoreClick from "../../sounds/sound1.mp3";
import flagClick from "../../sounds/sound2.mp3";
import buttonClick from "../../sounds/sound3.mp3";
import backMusic from "../../sounds/backMusic.mp3";

import { stopMenuSound } from '../Menu/MenuContainer'
import axios from 'axios';

const scoreClickAudio = new Audio(scoreClick);
const flagClickAudio = new Audio(flagClick);
const buttonClickAudio = new Audio(buttonClick);
const backMusicAudio = new Audio(backMusic);

let sended = false

const playSound = (audioFile, volume) => {
    stopMenuSound()
    audioFile.loop = true
    audioFile.volume = volume
    audioFile.play()
}
const stopSound = audioFile => {
    audioFile.currentTime = 0
    audioFile.pause()
}

class GameContainer extends React.Component {
    componentDidMount() {
        if (this.props.time === 0)
            this.props.startNewGame(this.props.dificulty)
        document.oncontextmenu = function () { return false };
        if (this.props.isVolumeOn)
            playSound(backMusicAudio, this.props.volume)
    }

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.props.state))
        if (this.props.isWin) {
            if (sended) {
                sended = false
                console.log(this.props.lastTenGames[0][1])
                axios({
                    method: 'patch',
                    url: 'https://arcane-falls-07410.herokuapp.com/api/score/',
                    headers: { 'Authorization': this.props.user.token },
                    data: {
                        "lastGame": {
                            "dificulty": this.props.lastTenGames[0][1] === 'Begginer' ? 1 : this.props.lastTenGames[0][1] === 'Medium' ? 2 : 3,
                            "time": this.props.lastTenGames[0][2],
                            "isWin": true
                        }
                    }
                })
                    .then(res => {
                        if (res.data.updatedScore)
                            this.props.setScore(res.data.updatedScore.begginer, res.data.updatedScore.medium, res.data.updatedScore.expert)
                    })

            }
        } else {
            sended = true
        }
    }

    componentWillUnmount() {
        stopSound(backMusicAudio)
    }

    render() {
        return (
            <div>
                <Game plane={this.props.plane}
                    dificulty={this.props.dificulty}
                    sended={this.sended}
                    flagsCount={this.props.flagsCount}
                    planeHeight={this.props.planeHeight}
                    planeWidth={this.props.planeWidth}
                    time={this.props.time}
                    isWin={this.props.isWin}
                    autoPlay={this.props.autoPlay}
                    loosePosition={this.props.loosePosition}
                    timerIsOn={this.props.timerIsOn}
                    lastTenGames={this.props.lastTenGames}
                    userPlane={this.props.userPlane}
                    clickButton={this.props.clickButton}
                    clickFlag={this.props.clickFlag}
                    startNewGame={this.props.startNewGame}
                    setTime={this.props.setTime}
                    setMouseSelectedElementPosition={this.props.setMouseSelectedElementPosition}
                    isPressedSpecial={this.props.isPressedSpecial}
                    settings={this.props.settings}
                    scoreClickAudio={scoreClickAudio}
                    flagClickAudio={flagClickAudio}
                    buttonClickAudio={buttonClickAudio}
                    isSoundEffectsOn={this.props.isSoundEffectsOn}
                    setAutoPlay={this.props.setAutoPlay}
                    selectedElementPosition={this.props.selectedElementPosition}
                    setSelectedElementPosition={this.props.setSelectedElementPosition}
                    effectsVolume={this.props.effectsVolume}
                    login={this.props.user.login}
                    aPM={this.props.aPM}
                    keys={this.props.keys} />
            </div >
        )
    }
}

let mapStateToProps = (state) => {
    return {
        plane: state.plane,
        dificulty: state.dificulty,
        flagsCount: state.flagsCount,
        planeHeight: state.planeHeight,
        planeWidth: state.planeWidth,
        time: state.time,
        isWin: state.isWin,
        autoPlay: state.autoPlay,
        timerIsOn: state.timerIsOn,
        lastTenGames: state.lastTenGames,
        loosePosition: state.loosePosition,
        isPressedSpecial: state.isPressedSpecial,
        userPlane: state.userPlane,
        isSoundEffectsOn: state.settings.isSoundEffectsOn,
        effectsVolume: state.settings.effectsVolume,
        isVolumeOn: state.settings.isVolumeOn,
        volume: state.settings.volume,
        settings: state.settings,
        selectedElementPosition: state.selectedElementPosition,
        keys: state.settings.keys,
        user: state.user,
        aPM: state.autoPlayMatrix,
        lastTenGames: state.lastTenGames,
        begginerGames: state.begginerGames,
        mediumGames: state.mediumGames,
        expertGames: state.expertGames,
        state: state
    }
}

export default connect(mapStateToProps, {
    startNewGame, clickButton, clickFlag, setTime, setScore,
    setSelectedElementPosition, setMouseSelectedElementPosition, setAutoPlay, setAllState
})(GameContainer)
