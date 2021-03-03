import React, { useEffect } from 'react'
import s from './Settings.module.css'
import style from '../Style.module.css'
import Header from '../Header/Header';
import buttonClick from "../../sounds/sound3.mp3";
import buttonBadClick from "../../sounds/badButton.mp3";
import styled from 'styled-components';
import darkBack from '../../images/dark_back.png'
import lightBack from '../../images/light_back.png'


const Settings = (props) => {
  let keys = props.settings.keys

  const getValue = () => keys.buttonValueNeedToChange

  const changeKey = (e) => {
    playSound(true, props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
    props.changeKey(e.target.value)
  }

  useEffect(() => {
    const onKeypress = key => {

      if (Object.values(keys).includes(key.keyCode)) {
        if (getValue()) {
          playSound(false, props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
          props.changeKey(null)
        }
        return
      }

      switch (getValue()) {
        case '1': props.setGoUpKey(key.keyCode)
          break
        case '2': props.setGoLeftKey(key.keyCode)
          break
        case '3': props.setGoDownKey(key.keyCode)
          break
        case '4': props.setGoRightKey(key.keyCode)
          break
        case '5': props.setSetFlagKey(key.keyCode)
          break
        case '6': props.setOpenScoreKey(key.keyCode)
          break
        case '7': props.setNewGameKey(key.keyCode)
          break
        case '8': props.setAutoPlayKey(key.keyCode)
          break
        default:
      }

    }
    document.addEventListener('keydown', onKeypress)
    return () => {
      document.removeEventListener('keydown', onKeypress)
    }
  })
  const playSound = (goodSound, volume) => {
    let audioFile
    if (goodSound) audioFile = new Audio(buttonClick)
    else audioFile = new Audio(buttonBadClick)

    audioFile.volume = volume
    audioFile.play()
  }
  const changeTheme = (e) => {
    playSound(true, props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
    props.setTheme(e.target.value === 'false' ? true : false)
  }
  const changeSoundEffectOn = (e) => {
    playSound(true, !props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
    props.setSoundEffectOn(e.target.value === 'false' ? true : false)
  }
  const changeSoundEffectVolume = (e) => {
    playSound(true, props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
    props.setSoundEffectVolume(e.target.value)
  }
  const changeVolumeOn = (e) => {
    playSound(true, props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
    props.setVolumeOn(e.target.value === 'false' ? true : false)
  }
  const changeVolume = (e) => {
    playSound(true, props.settings.isSoundEffectsOn ? props.settings.effectsVolume : 0)
    props.setVolume(e.target.value)
  }
  return (
    <Background darkBack={darkBack} theme={props.settings.isDarkTheme} lightBack={lightBack}>
      <Header settings={props.settings} login={props.login} theme={props.settings.isDarkTheme} />
      <FullSettings theme={props.settings.isDarkTheme}>
        <div className={s.settings}>
          <TextName theme={props.settings.isDarkTheme}><h1>Settings</h1></TextName>
          <div className={s.currentSetting}>
            <div className={s.settingName}>
              <TextName theme={props.settings.isDarkTheme}>Game area theme:</TextName>
                    </div>
            <div className={s.settingValue}>
              <button className={(props.settings.isDarkTheme ? style.dark_main : style.light_main)
                + ' ' + (props.settings.isDarkTheme ? style.checked : '')} value={props.settings.isDarkTheme} onClick={changeTheme} />
            </div>
          </div>
          <div className={s.currentSetting}>
            <div className={s.settingName}>
              <TextName theme={props.settings.isDarkTheme}>Sounds:</TextName>
                    </div>
            <div className={s.settingValue}>
              <button className={(props.settings.isDarkTheme ? style.dark_main : style.light_main)
                + ' ' + (props.settings.isSoundEffectsOn ? style.checked : '')} value={props.settings.isSoundEffectsOn} onClick={changeSoundEffectOn} />
            </div>
            <div className={s.settingValue}>
              <Input theme={props.settings.isDarkTheme}>
                <input type="range" min="0" max="1" step="0.1" value={props.settings.effectsVolume} onChange={changeSoundEffectVolume} />
              </Input>
            </div>
          </div>
          <div className={s.currentSetting}>
            <div className={s.settingName}>
              <TextName theme={props.settings.isDarkTheme}>Music:</TextName>
                    </div>
            <div className={s.settingValue}>
              <button className={(props.settings.isDarkTheme ? style.dark_main : style.light_main)
                + ' ' + (props.settings.isVolumeOn ? style.checked : '')} value={props.settings.isVolumeOn} onClick={changeVolumeOn} />
            </div>
            <div className={s.settingValue}>
              <Input theme={props.settings.isDarkTheme}>
                <input type="range" min="0" max="0.5" step="0.05" value={props.settings.volume} onChange={changeVolume} />
              </Input>
            </div>
          </div>
          <div className={s.settingName}>
            <TextName theme={props.settings.isDarkTheme}>Keys:</TextName>
                    </div>
          <SettingsKeys theme={props.settings.isDarkTheme} className={props.settings.isDarkTheme ? style.dark_setKeyBlock : style.light_setKeyBlock}>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Up key
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={1}>{String.fromCharCode(keys.goUpKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Left key
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={2}>{String.fromCharCode(keys.goLeftKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Down key
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={3}>{String.fromCharCode(keys.goDownKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Right key
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={4}>{String.fromCharCode(keys.goRightKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Set flag
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={5}>{String.fromCharCode(keys.setFlagKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Open cell
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={6}>{String.fromCharCode(keys.openScoreKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                New game
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={7}>{String.fromCharCode(keys.newGameKey)}</button>
              </div>
            </div>
            <div className={s.settingValueKeys}>
              <div className={s.element}>
                Auto play
                        </div>
              <div className={s.element}>
                <button onClick={changeKey} className={s.setKey + ' ' + (props.settings.isDarkTheme ? style.dark_main : style.light_main)} value={8}>{String.fromCharCode(keys.autoPlay)}</button>
              </div>
            </div>
          </SettingsKeys>
        </div>
      </FullSettings>
    </Background>
  )
}

export default Settings



const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme === true ? `url(${props.darkBack}), #C4C4C4;` : `url(${props.lightBack}), #C4C4C4;`}
`

const FullSettings = styled.div`
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

const TextName = styled.div`
color: ${props => props.theme === true ? '#cccccc' : '#F2DDB3'};
`

const SettingsKeys = styled.div`

    padding: 5px;
    border-radius: 8px;
    margin: 0 auto;
    width: 300px;
    height: 180px;
    overflow: auto;

  &::-webkit-scrollbar {
    width: 15px;
  }
  
  &::-webkit-scrollbar-track {
    border: 2px solid ${props => props.theme === true ? '#939393' : '#BFAF8E'};
    border-radius: 5px;
    background-color: ${props => props.theme === true ? '#656565' : '#F2DDB3'};/*cvtybnm*/
  }
  
  &::-webkit-scrollbar-thumb {
    border: 2px solid ${props => props.theme === true ? '#939393' : '#BFAF8E'};
    background-color: #4CAF50;
    border-radius: 5px;
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  
  &::-ms-thumb {
    width: 25px;
    height: 25px;
    background: #4CAF50;
    border: 2px solid ${props => props.theme === true ? '#939393' : '#BFAF8E'};
    border-radius: 5px;
    cursor: pointer;
    margin-top: 0px;
  }
  
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4CAF50;
    border: 2px solid ${props => props.theme === true ? '#939393' : '#BFAF8E'};
    border-radius: 5px;
    cursor: pointer;
  }
`

const Input = styled.div`
input[type=range] {
  width: 200px;
  margin: 5px 0;
  background-color: transparent;
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  background: ${props => props.theme === true ? '#656565' : '#F2DDB3'};
  border: 2px solid ${props => props.theme === true ? '#939393' : '#BFAF8E'};
  border-radius: 5px;
  width: 100%;
  height: 15px;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb {
  margin-top: -7px;
  width: 25px;
  height: 25px;
  background: #4CAF50;
  border: 2px solid ${props => props.theme === true ? '#939393' : '#BFAF8E'};
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
}

@supports (-ms-ime-align:auto) {
  input[type=range] {
    margin: 0;
  }
}
`