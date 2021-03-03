import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { setCurrentScorePage, setScore } from '../../redux/game-reducer'
import Score from './Score'

class ScoreContainer extends React.Component {
    componentDidMount() {
        if (this.props.user.login !== '') {
            axios({
                method: 'get', //you can set what request you want to be
                url: 'https://arcane-falls-07410.herokuapp.com/api/score/',
                headers: { 'Authorization': this.props.user.token }
            })
                .then(res => (
                    this.props.setScore(res.data.begginer, res.data.medium, res.data.expert)
                ))
                .catch(res => { console.log('nothing found') })
        }
    }

    render() {
        return (
            <div>
                <Score currentScorePage={this.props.currentScorePage}
                    lastTenGames={this.props.lastTenGames}
                    begginerGames={this.props.begginerGames}
                    mediumGames={this.props.mediumGames}
                    expertGames={this.props.expertGames}
                    settings={this.props.settings}
                    login={this.props.user.login}
                    setCurrentScorePage={this.props.setCurrentScorePage} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentScorePage: state.currentScorePage,
        lastTenGames: state.lastTenGames,
        begginerGames: state.begginerGames,
        mediumGames: state.mediumGames,
        expertGames: state.expertGames,
        settings: state.settings,
        user: state.user

    }
}

export default connect(mapStateToProps, { setCurrentScorePage, setScore })(ScoreContainer)