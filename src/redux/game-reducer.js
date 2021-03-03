const PICK_BUTTON = "PICK-BUTTON";
const PICK_FLAG = "PICK-FLAG";
const START_NEW_GAME = "START-NEW-GAME";
const SET_TIME = "SET-TIME";
const SET_CURRENT_SCORE_PAGE = "SET-CURRENT-SCORE-PAGE";
const SAVE_SCORE = "SAVE-SCORE";
const SET_THEME = "SET-THEME";
const SET_SOUND_EFFECT_ON = "SET-SOUND-EFFECT-ON";
const SET_EFFECT_VOLUME = "SET-EFFECT-VOLUME";
const SET_VOLUME_ON = "SET-VOLUME-ON";
const SET_VOLUME = "SET-VOLUME";
const SET_SELECTED_ELEMENT_POSITION = "SET-SELECTED-ELEMENT-POSITION";
const SET_AUTO_PLAY = "SET-AUTO-PLAY";
const SET_KEY1 = "SET-KEY1";
const SET_KEY2 = "SET-KEY2";
const SET_KEY3 = "SET-KEY3";
const SET_KEY4 = "SET-KEY4";
const SET_KEY5 = "SET-KEY5";
const SET_KEY6 = "SET-KEY6";
const SET_KEY7 = "SET-KEY7";
const SET_KEY8 = "SET-KEY8";
const CHANGE_KEY = "CHANGE-KEY";
const SET_DATA = "SET-DATA";
const SET_LOG_LOGIN = "SET-LOG-LOGIN";
const SET_LOG_PASSWORD = "SET-LOG-PASSWORD";
const SET_REG_LOGIN = "SET-REG-LOGIN";
const SET_REG_EMAIL = "SET-REG-EMAIL";
const SET_REG_PASSWORD = "SET-REG-PASSWORD";
const SET_REG_PASSWORD_CONFIRM = "SET-REG-PASSWORD-CONFIRM";
const ADD_USER = "ADD-USER";
const SET_USER_NULL = "SET-USER-NULL";
const SET_LOGIN_REQ = "SET-LOGIN-REQ";
const SET_REG_REQ = "SET-REG-REQ";
const SET_SCORE = "SET-SCORE";

let initialState
const data = JSON.parse(localStorage.getItem('state'))
if (data) {
    initialState = data
} else {
    initialState = {
        plane: [],
        userPlane: [],
        dificulty: 1,
        flagsCount: 10,
        planeWidth: 0,
        planeHeight: 0,
        time: 0,
        timerIsOn: false,
        isWin: null,
        loosePosition: [null, null],
        lastTenGames: [],
        begginerGames: [],
        mediumGames: [],
        expertGames: [],
        autoPlayMatrix: [],
        currentScorePage: 0,
        selectedElementPosition: [-10, -10],
        loginReq: false,
        registrReq: false,
        user: {
            login: '',
            token: ''
        },
        loginData: {
            logLogin: '',
            logPassword: '',
            regLogin: '',
            regEmail: '',
            regPassword: '',
            regPasswordConfirm: ''
        },
        settings: {
            isDarkTheme: true,
            isSoundEffectsOn: true,
            effectsVolume: 1,
            isVolumeOn: true,
            volume: 0.5,
            keys: {
                buttonValueNeedToChange: null,
                setFlagKey: 81,
                openScoreKey: 69,
                goUpKey: 87,
                goLeftKey: 65,
                goRightKey: 68,
                goDownKey: 83,
                newGameKey: 70,
                newBegginerGameKey: 49,
                newMediumGameKey: 50,
                newExpertGameKey: 51,
                autoPlay: 82
            }
        },
        autoPlay: false
    }
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case PICK_BUTTON:
            return {
                ...state,
                userPlane: [...action.oldUserPlane],
                isWin: action.isWin,
                loosePosition: [...action.loosePosition],
                timerIsOn: action.timerIsOn,
                lastTenGames: [...action.lastTenGames]
            }
        case PICK_FLAG:
            return {
                ...state,
                userPlane: [...action.oldUserPlane],
                isWin: action.isWin,
                flagsCount: action.flagsCount,
                timerIsOn: action.timerIsOn,
                lastTenGames: [...action.lastTenGames]
            }
        case START_NEW_GAME:
            return {
                ...state,
                dificulty: action.dificulty,
                plane: [...action.newPlane],
                flagsCount: action.newFlagsCount,
                planeWidth: action.newPlaneWidth,
                planeHeight: action.newPlaneHeight,
                userPlane: [...action.newUserPlane],
                isWin: null,
                time: 0,
                timerIsOn: false,
                loosePosition: [null, null],
                autoPlayMatrix: action.newAutoPlayMatrix,
                selectedElementPosition: [-10, -10]
            }
        case SAVE_SCORE:
            return {
                ...state
            }
        case SET_CURRENT_SCORE_PAGE:
            return {
                ...state,
                currentScorePage: action.newCurrentScorePage
            }
        case SET_TIME:
            return {
                ...state,
                time: action.timer
            }
        case SET_THEME:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    isDarkTheme: action.isDarkTheme
                }
            }
        case SET_SOUND_EFFECT_ON:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    isSoundEffectsOn: action.isSoundEffectsOn
                }
            }
        case SET_EFFECT_VOLUME:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    effectsVolume: action.effectsVolume
                }
            }
        case SET_VOLUME_ON:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    isVolumeOn: action.isVolumeOn
                }
            }
        case SET_VOLUME:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    volume: action.volume
                }
            }
        case SET_SELECTED_ELEMENT_POSITION:
            return {
                ...state,
                selectedElementPosition: action.newPos
            }
        case SET_AUTO_PLAY:
            return {
                ...state,
                autoPlay: action.autoPlay
            }
        case CHANGE_KEY:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        buttonValueNeedToChange: action.value
                    }
                }
            }
        case SET_KEY1:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        goUpKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY2:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        goLeftKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY3:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        goDownKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY4:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        goRightKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY5:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        setFlagKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY6:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        openScoreKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY7:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        newGameKey: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_KEY8:
            return {
                ...state,
                settings: {
                    ...state.settings, keys: {
                        ...state.settings.keys,
                        autoPlay: action.value,
                        buttonValueNeedToChange: null
                    }
                }
            }
        case SET_LOG_LOGIN:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    logLogin: action.data
                }
            }
        case SET_LOG_PASSWORD:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    logPassword: action.data
                }
            }
        case SET_REG_LOGIN:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    regLogin: action.data
                }
            }
        case SET_REG_EMAIL:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    regEmail: action.data
                }
            }
        case SET_REG_PASSWORD:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    regPassword: action.data
                }
            }
        case SET_REG_PASSWORD_CONFIRM:
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    regPasswordConfirm: action.data
                }
            }
        case ADD_USER:
            return {
                ...state,
                user: {
                    login: action.login,
                    token: action.token
                }

            }
        case SET_USER_NULL:
            return {
                ...state,
                user: {
                    ...state.user,
                    login: '',
                    token: ''
                },
                begginerGames: [],
                mediumGames: [],
                expertGames: []
            }
        case SET_DATA:
            return {
                ...action.data
            }
        case SET_LOGIN_REQ:
            return {
                ...state,
                loginReq: action.value
            }
        case SET_REG_REQ:
            return {
                ...state,
                registrReq: action.value
            }
        case SET_SCORE:
            return {
                ...state,
                begginerGames: action.begginer,
                mediumGames: action.medium,
                expertGames: action.expert
            }
        default:
            return state
    }
}

export const setScore = (begginer, medium, expert) => {
    return {
        type: SET_SCORE,
        begginer,
        medium,
        expert
    }
}
export const setRegReq = (value) => {
    return {
        type: SET_REG_REQ,
        value
    }
}

export const setLoginReq = (value) => {
    return {
        type: SET_LOGIN_REQ,
        value
    }
}

export const setUserNull = () => {
    return {
        type: SET_USER_NULL
    }
}
export const addUser = (login, token) => {
    return {
        type: ADD_USER,
        login,
        token
    }
}
export const setLogLogin = (data) => {
    return {
        type: SET_LOG_LOGIN,
        data
    }
}
export const logPassword = (data) => {
    return {
        type: SET_LOG_PASSWORD,
        data
    }
}
export const setRegLogin = (data) => {
    return {
        type: SET_REG_LOGIN,
        data
    }
}
export const setRegEmail = (data) => {
    return {
        type: SET_REG_EMAIL,
        data
    }
}
export const setRegPassword = (data) => {
    return {
        type: SET_REG_PASSWORD,
        data
    }
}
export const setRegPasswordConfirm = (data) => {
    return {
        type: SET_REG_PASSWORD_CONFIRM,
        data
    }
}
export const setAllState = (data) => {
    return {
        type: SET_DATA,
        data
    }
}
export const setGoUpKey = (value) => {
    return {
        type: SET_KEY1,
        value
    }
}
export const setGoLeftKey = (value) => {
    return {
        type: SET_KEY2,
        value
    }
}
export const setGoDownKey = (value) => {
    return {
        type: SET_KEY3,
        value
    }
}
export const setGoRightKey = (value) => {
    return {
        type: SET_KEY4,
        value
    }
}
export const setSetFlagKey = (value) => {
    return {
        type: SET_KEY5,
        value
    }
}
export const setOpenScoreKey = (value) => {
    return {
        type: SET_KEY6,
        value
    }
}
export const setNewGameKey = (value) => {
    return {
        type: SET_KEY7,
        value
    }
}
export const setAutoPlayKey = (value) => {
    return {
        type: SET_KEY8,
        value
    }
}

export const changeKey = (value) => {
    return {
        type: CHANGE_KEY,
        value
    }
}

export const setAutoPlay = (autoPlay) => {
    return {
        type: SET_AUTO_PLAY,
        autoPlay
    }
}

export const setMouseSelectedElementPosition = (i, j) => {
    let newPos = [i, j]
    return {
        type: SET_SELECTED_ELEMENT_POSITION,
        newPos
    }
}

export const setSelectedElementPosition = (newPos) => {
    return {
        type: SET_SELECTED_ELEMENT_POSITION,
        newPos
    }
}

export const setTime = (timer) => {
    return {
        type: SET_TIME,
        timer
    }
}

export const setTheme = (isDarkTheme) => {
    return {
        type: SET_THEME,
        isDarkTheme
    }
}

export const setSoundEffectOn = (isSoundEffectsOn) => {
    return {
        type: SET_SOUND_EFFECT_ON,
        isSoundEffectsOn
    }
}

export const setSoundEffectVolume = (effectsVolume) => {
    return {
        type: SET_EFFECT_VOLUME,
        effectsVolume
    }
}

export const setVolumeOn = (isVolumeOn) => {
    return {
        type: SET_VOLUME_ON,
        isVolumeOn
    }
}

export const setVolume = (volume) => {
    return {
        type: SET_VOLUME,
        volume
    }
}

export const startNewGame = (dificulty) => {

    let newPlane = []
    let newAutoPlayMatrix = []
    let newUserPlane = []
    let newFlagsCount = 0
    let newPlaneWidth = 0
    let newPlaneHeight = 0

    //назначение сложности
    switch (dificulty) {
        case 1: newFlagsCount = 10
            newPlaneWidth = 8
            newPlaneHeight = 8
            break
        case 2: newFlagsCount = 30
            newPlaneWidth = 12
            newPlaneHeight = 12
            break
        case 3: newFlagsCount = 50
            newPlaneWidth = 20
            newPlaneHeight = 20
            break
    }

    //инидиализация обнуление поля игрока
    for (var i = 0; i < newPlaneHeight; i++) {
        newUserPlane[i] = [];
        for (var j = 0; j < newPlaneWidth; j++) {
            newUserPlane[i][j] = '-';
        }
    }

    //инидиализация всех полей нулями
    for (var i = 0; i < newPlaneHeight; i++) {
        newPlane[i] = [];
        newAutoPlayMatrix[i] = [];
        for (var j = 0; j < newPlaneWidth; j++) {
            newPlane[i][j] = 0;
            newAutoPlayMatrix[i][j] = 1;
        }
    }

    //размещение бомб
    let setBombs = 0
    while (setBombs < newFlagsCount) {
        let counter = 0
        let indexI = Math.floor(Math.random() * newPlaneWidth)
        let indexY = Math.floor(Math.random() * newPlaneHeight)
        newPlane[indexY][indexI] = '*'
        newPlane.map((r) => {
            r.map(e => {
                if (e === '*') { counter++ }
            })
        })
        setBombs = counter
    }
    //присваение полям количества бомб рядом
    for (var i = 0; i < newPlaneHeight; i++) {
        for (var j = 0; j < newPlaneWidth; j++) {
            if (newPlane[i][j] === '*') {
                if (typeof newPlane[i - 1] !== 'undefined')
                    if (typeof newPlane[i - 1][j - 1] !== 'undefined')
                        if (newPlane[i - 1][j - 1] !== '*') {
                            newPlane[i - 1][j - 1]++
                        }
                if (typeof newPlane[i - 1] !== 'undefined')
                    if (typeof newPlane[i - 1][j] !== 'undefined')
                        if (newPlane[i - 1][j] !== '*') {
                            newPlane[i - 1][j]++
                        }
                if (typeof newPlane[i - 1] !== 'undefined')
                    if (typeof newPlane[i - 1][j + 1] !== 'undefined')
                        if (newPlane[i - 1][j + 1] !== '*') {
                            newPlane[i - 1][j + 1]++
                        }
                if (typeof newPlane[i] !== 'undefined')
                    if (typeof newPlane[i][j - 1] !== 'undefined')
                        if (newPlane[i][j - 1] !== '*') {
                            newPlane[i][j - 1]++
                        }
                if (typeof newPlane[i] !== 'undefined')
                    if (typeof newPlane[i][j + 1] !== 'undefined')
                        if (newPlane[i][j + 1] !== '*') {
                            newPlane[i][j + 1]++
                        }
                if (typeof newPlane[i + 1] !== 'undefined')
                    if (typeof newPlane[i + 1][j - 1] !== 'undefined')
                        if (newPlane[i + 1][j - 1] !== '*') {
                            newPlane[i + 1][j - 1]++
                        }
                if (typeof newPlane[i + 1] !== 'undefined')
                    if (typeof newPlane[i + 1][j] !== 'undefined')
                        if (newPlane[i + 1][j] !== '*') {
                            newPlane[i + 1][j]++
                        }
                if (typeof newPlane[i + 1] !== 'undefined')
                    if (typeof newPlane[i + 1][j + 1] !== 'undefined')
                        if (newPlane[i + 1][j + 1] !== '*') {
                            newPlane[i + 1][j + 1]++
                        }
            }
        }
    }

    return {
        type: START_NEW_GAME,
        dificulty,
        newPlane,
        newPlaneWidth,
        newPlaneHeight,
        newFlagsCount,
        newUserPlane,
        newAutoPlayMatrix
    }
}

export const setCurrentScorePage = (newCurrentScorePage) => {
    return {
        type: SET_CURRENT_SCORE_PAGE,
        newCurrentScorePage
    }
}

function addScore(dificulty, time, isWin, lastTenGames) {
    let winLoose = isWin ? 'Win' : 'Loose'
    let dificultyName = dificulty === 1 ? 'Begginer' : dificulty === 2 ? 'Medium' : 'Expert'
    lastTenGames = [[winLoose, dificultyName, time], ...lastTenGames].splice(0, 10)
    return lastTenGames
}

export const clickFlag = (i, j, oldUserPlane, flagsCount, dificulty, time, lastTenGames) => {
    if (oldUserPlane[i][j] === '-') {
        if (flagsCount > 0) {
            oldUserPlane[i][j] = 'P'
            flagsCount--
        }
    } else if (oldUserPlane[i][j] === 'P') {
        oldUserPlane[i][j] = '-'
        flagsCount++
    }
    let isWin = checkForWin(oldUserPlane)
    let timerIsOn = isWin ? false : true
    if (isWin !== null)
        lastTenGames = addScore(dificulty, time, isWin, lastTenGames)
    return {
        type: PICK_FLAG,
        oldUserPlane,
        isWin,
        flagsCount,
        timerIsOn,
        lastTenGames
    }
}

export const clickButton = (i, j, oldPlane, oldUserPlane, width, height, dificulty, time, lastTenGames) => {
    let isWin = null
    let loosePosition = [null, null]
    let timerIsOn = isWin === false ? false : true
    timerIsOn = isWin === null ? true : false
    if (oldUserPlane[i][j] === 'P') {
        isWin = checkForWin(oldUserPlane)
        return {
            type: PICK_BUTTON,
            oldUserPlane,
            isWin,
            loosePosition,
            timerIsOn,
            lastTenGames
        }
    }
    if (oldPlane[i][j] === '*') {
        isWin = false
        loosePosition = [i, j]
        for (let h = 0; h < height; h++)
            for (let w = 0; w < width; w++)
                if (oldPlane[h][w] === '*' && oldUserPlane[h][w] !== 'P')
                    oldUserPlane[h][w] = '*'
    }
    if (oldPlane[i][j] === 0) {
        oldUserPlane[i][j] = 0
        oldUserPlane = toZeroCheck(oldUserPlane, oldPlane, i, j)
        oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i, j)
        isWin = checkForWin(oldUserPlane)
    }
    if (oldPlane[i][j] !== '*' && oldPlane[i][j] !== 0) {
        oldUserPlane[i][j] = oldPlane[i][j]
        isWin = checkForWin(oldUserPlane)
    }
    if (isWin !== null)
        lastTenGames = addScore(dificulty, time, isWin, lastTenGames)
    return {
        type: PICK_BUTTON,
        oldUserPlane,
        isWin,
        loosePosition,
        timerIsOn,
        lastTenGames
    }
}

function checkForWin(oldUserPlane) {
    if (oldUserPlane.flat(Infinity).filter(item => item === '-').length > 0) {
        return null
    }
    return true
}

function OpenNotZero(oldUserPlane, newPlane, i, j) {
    if (typeof newPlane[i - 1] !== 'undefined')
        if (typeof newPlane[i - 1][j - 1] !== 'undefined')
            if (newPlane[i - 1][j - 1] !== 0) {
                oldUserPlane[i - 1][j - 1] = newPlane[i - 1][j - 1]
            }
    if (typeof newPlane[i - 1] !== 'undefined')
        if (typeof newPlane[i - 1][j] !== 'undefined')
            if (newPlane[i - 1][j] !== 0) {
                oldUserPlane[i - 1][j] = newPlane[i - 1][j]
            }
    if (typeof newPlane[i - 1] !== 'undefined')
        if (typeof newPlane[i - 1][j + 1] !== 'undefined')
            if (newPlane[i - 1][j + 1] !== '*') {
                oldUserPlane[i - 1][j + 1] = newPlane[i - 1][j + 1]
            }
    if (typeof newPlane[i] !== 'undefined')
        if (typeof newPlane[i][j - 1] !== 'undefined')
            if (newPlane[i][j - 1] !== 0) {
                oldUserPlane[i][j - 1] = newPlane[i][j - 1]
            }
    if (typeof newPlane[i] !== 'undefined')
        if (typeof newPlane[i][j + 1] !== 'undefined')
            if (newPlane[i][j + 1] !== 0) {
                oldUserPlane[i][j + 1] = newPlane[i][j + 1]
            }
    if (typeof newPlane[i + 1] !== 'undefined')
        if (typeof newPlane[i + 1][j - 1] !== 'undefined')
            if (newPlane[i + 1][j - 1] !== 0) {
                oldUserPlane[i + 1][j - 1] = newPlane[i + 1][j - 1]
            }
    if (typeof newPlane[i + 1] !== 'undefined')
        if (typeof newPlane[i + 1][j] !== 'undefined')
            if (newPlane[i + 1][j] !== 0) {
                oldUserPlane[i + 1][j] = newPlane[i + 1][j]
            }
    if (typeof newPlane[i + 1] !== 'undefined')
        if (typeof newPlane[i + 1][j + 1] !== 'undefined')
            if (newPlane[i + 1][j + 1] !== 0) {
                oldUserPlane[i + 1][j + 1] = newPlane[i + 1][j + 1]
            }
    return oldUserPlane

}

function toZeroCheck(oldUserPlane, oldPlane, i, j) {
    if (typeof oldPlane[i][j - 1] !== 'undefined') {
        if (oldPlane[i][j - 1] === 0 && oldUserPlane[i][j - 1] !== 0) {
            oldUserPlane[i][j - 1] = 0
            toZeroCheck(oldUserPlane, oldPlane, i, j - 1)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i, j - 1)
        }
    }
    if (typeof oldPlane[i][j + 1] !== 'undefined') {
        if (oldPlane[i][j + 1] === 0 && oldUserPlane[i][j + 1] !== 0) {
            oldUserPlane[i][j + 1] = 0
            toZeroCheck(oldUserPlane, oldPlane, i, j + 1)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i, j + 1)
        }
    }
    if (typeof oldPlane[i - 1] !== 'undefined') {
        if (oldPlane[i - 1][j] === 0 && oldUserPlane[i - 1][j] !== 0) {
            oldUserPlane[i - 1][j] = 0
            toZeroCheck(oldUserPlane, oldPlane, i - 1, j)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i - 1, j)
        }
    }
    if (typeof oldPlane[i + 1] !== 'undefined') {
        if (oldPlane[i + 1][j] === 0 && oldUserPlane[i + 1][j] !== 0) {
            oldUserPlane[i + 1][j] = 0
            toZeroCheck(oldUserPlane, oldPlane, i + 1, j)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i + 1, j)
        }
    }
    if (typeof oldPlane[i - 1] !== 'undefined') {
        if (oldPlane[i - 1][j - 1] === 0 && oldUserPlane[i - 1][j - 1] !== 0) {
            oldUserPlane[i - 1][j - 1] = 0
            toZeroCheck(oldUserPlane, oldPlane, i - 1, j - 1)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i - 1, j - 1)
        }
    }
    if (typeof oldPlane[i - 1] !== 'undefined') {
        if (oldPlane[i - 1][j + 1] === 0 && oldUserPlane[i - 1][j + 1] !== 0) {
            oldUserPlane[i - 1][j + 1] = 0
            toZeroCheck(oldUserPlane, oldPlane, i - 1, j + 1)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i - 1, j + 1)
        }
    }
    if (typeof oldPlane[i + 1] !== 'undefined') {
        if (oldPlane[i + 1][j - 1] === 0 && oldUserPlane[i + 1][j - 1] !== 0) {
            oldUserPlane[i + 1][j - 1] = 0
            toZeroCheck(oldUserPlane, oldPlane, i + 1, j - 1)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i + 1, j - 1)
        }
    }
    if (typeof oldPlane[i + 1] !== 'undefined') {
        if (oldPlane[i + 1][j + 1] === 0 && oldUserPlane[i + 1][j + 1] !== 0) {
            oldUserPlane[i + 1][j + 1] = 0
            toZeroCheck(oldUserPlane, oldPlane, i + 1, j + 1)
            oldUserPlane = OpenNotZero(oldUserPlane, oldPlane, i + 1, j + 1)
        }
    }
    return oldUserPlane
}

export default gameReducer;
