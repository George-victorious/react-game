import React from 'react'
import { connect } from 'react-redux'
import { setTheme, setSoundEffectOn, setVolumeOn, setVolume, setSoundEffectVolume, changeKey, 
    setGoUpKey, setGoLeftKey, setGoDownKey, setGoRightKey, setSetFlagKey, setOpenScoreKey, setNewGameKey, setAutoPlayKey} from '../../redux/game-reducer'
import Settings from './Settings'
import { setVolumeMenuSound } from '../Menu/MenuContainer'
import { setVolumeHeaderSound } from '../Header/Header'

class SettingsContainer extends React.Component {
    componentDidMount() {

    }
    componentDidUpdate() {
        setVolumeMenuSound(this.props.settings.isVolumeOn ? this.props.settings.volume : 0)
        setVolumeHeaderSound(this.props.settings.isSoundEffectsOn ? this.props.settings.effectsVolume : 0)
        localStorage.setItem('state', JSON.stringify(this.props.state))
    }
    render() {
        return (
            <Settings settings={this.props.settings}
                setTheme={this.props.setTheme}
                setSoundEffectOn={this.props.setSoundEffectOn}
                setVolumeOn={this.props.setVolumeOn}
                setVolume={this.props.setVolume}
                changeKey={this.props.changeKey}
                setGoUpKey={this.props.setGoUpKey}
                setGoLeftKey={this.props.setGoLeftKey}
                setGoDownKey={this.props.setGoDownKey}
                setGoRightKey={this.props.setGoRightKey}
                setSetFlagKey={this.props.setSetFlagKey}
                setOpenScoreKey={this.props.setOpenScoreKey}
                setNewGameKey={this.props.setNewGameKey}
                setAutoPlayKey={this.props.setAutoPlayKey}
                login={this.props.login}
                setSoundEffectVolume={this.props.setSoundEffectVolume} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        settings: state.settings,
        login: state.user.login,
        state: state
    }
}

export default connect(mapStateToProps, {
    setTheme, setSoundEffectOn, setVolumeOn, setVolume, setSoundEffectVolume, changeKey,
    setGoUpKey, setGoLeftKey, setGoDownKey, setGoRightKey, setSetFlagKey, setOpenScoreKey, setNewGameKey, setAutoPlayKey})(SettingsContainer)