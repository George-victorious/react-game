import React from 'react'
import Login from './Login'
import { setLogLogin, logPassword, setRegLogin, setRegEmail, setRegPassword, setRegPasswordConfirm, addUser, setUserNull, setLoginReq, setRegReq } from '../../redux/game-reducer'
import { connect } from 'react-redux'

class LoginContainer extends React.Component {
    componentDidMount() {
        this.props.setUserNull()
        localStorage.setItem('state', JSON.stringify(this.props.state))
    }

    render() {
        return (
            <div>
                <Login settings={this.props.settings}
                    setLogLogin={this.props.setLogLogin}
                    logPassword={this.props.logPassword}
                    setRegLogin={this.props.setRegLogin}
                    setRegEmail={this.props.setRegEmail}
                    setRegPassword={this.props.setRegPassword}
                    setRegPasswordConfirm={this.props.setRegPasswordConfirm}
                    addUser={this.props.addUser}
                    valume={this.props.valume}
                    loginData={this.props.loginData}
                    login={this.props.login}
                    loginReq={this.props.loginReq}
                    setLoginReq={this.props.setLoginReq}
                    registrReq={this.props.registrReq}
                    setRegReq={this.props.setRegReq}
                    theme={this.props.theme}
                    user={this.props.user} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        settings: state.settings,
        loginData: state.loginData,
        login: state.user.login,
        valume: state.settings.volume,
        registrReq: state.registrReq,
        loginReq: state.loginReq,
        state: state,
        theme: state.settings.isDarkTheme
    }
}

export default connect(mapStateToProps, {setLogLogin, logPassword, setRegLogin, setRegEmail, setRegPassword, setRegPasswordConfirm, addUser, setUserNull, setLoginReq, setRegReq })(LoginContainer)