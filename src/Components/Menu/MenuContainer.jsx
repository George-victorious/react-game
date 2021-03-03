import React from 'react'
import { connect } from 'react-redux'
import Menu from './Menu'

import menuMusic from "../../sounds/menuMusic.mp3";

const menuMusicAudio = new Audio(menuMusic);

export const setVolumeMenuSound = (volume) => {
    menuMusicAudio.volume = volume
}
const playMenuSound = (volume) => {
    if (menuMusicAudio.currentTime === 0) {
        menuMusicAudio.loop = true
        setVolumeMenuSound(volume)
        menuMusicAudio.play()
    }
}
export const stopMenuSound = () => {
    menuMusicAudio.pause()
    menuMusicAudio.currentTime = 0
}

class MenuContainer extends React.Component {
    componentDidMount() {
        if (this.props.isVolumeOn)
            playMenuSound(this.props.volume)
    }
    componentDidUpdate() {
        console.log('update')
    }

    render() {
        return (
            <div>
                <Menu effectsVolume={this.props.effectsVolume}
                    isSoundEffectsOn={this.props.isSoundEffectsOn}
                    theme={this.props.theme}
                    settings={this.props.settings}
                    user={this.props.user} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isSoundEffectsOn: state.settings.isSoundEffectsOn,
        effectsVolume: state.settings.effectsVolume,
        isVolumeOn: state.settings.isVolumeOn,
        volume: state.settings.volume,
        settings: state.settings,
        theme: state.settings.isDarkTheme,
        user: state.user
    }
}

export default connect(mapStateToProps, {})(MenuContainer)