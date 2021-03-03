import React from 'react'
import styled from 'styled-components'
import s from './Score.module.css'

const ShowScore = (props) => {
    let score = []
    let scoreArray = []
    if (props.cP) {
        for (let i = 0; i < props.scoreArray.length; i++){
            scoreArray[i]= []
            let middleArray = []
            middleArray[i] = Object.values(props.scoreArray[i])
            scoreArray[i][0] = middleArray[i][2] ? 'Win' : 'Loose'
            scoreArray[i][1] = middleArray[i][0] === 1 ? 'Begginer' : middleArray[i][0] === 2 ? 'Medium' : 'Expert'
            scoreArray[i][2] = middleArray[i][1]
        }
    } else {
        scoreArray = props.scoreArray
    }
    for (let i = 0; i < 10; i++) {
        if (typeof scoreArray[i] !== 'undefined')
            score = [...score,
            <div className={s.lastGameBox}>
                <Show theme={props.theme} isWin={scoreArray[i][0] === 'Win' ? true : false}>
                    <div className={s.gameValue}>
                        {scoreArray[i][0]}
                    </div>
                    <div className={s.gameValue}>
                        {scoreArray[i][1]}
                    </div>
                    <div className={s.gameValue}>
                        {scoreArray[i][2]}
                    </div>
                </Show>
            </div>
            ]
    }
    return (
        <div className={s.allScore}>
            {score.length > 0 ? score : <Show theme={props.theme} close={true}>Enter your account or play/win a game!</Show>}
        </div>
    )
}

export default ShowScore

const Show = styled.div`
    padding: 5px;
    background-color: ${props => props.close === true ? '#f44336' : props.theme === true ? '#656565'  : '#F2DDB3'};
    border-color: ${props => props.isWin === true ? '#4CAF50' : props.isWin === false ? '#f44336' : props.theme === true ? '#939393' : '#BFAF8E'};
    color: ${props => props.theme === true || props.close === true ? '#cccccc' : '#756035'};
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    outline: none;
    display: flex;
    justify-content: space-evenly;
    max-width: 50%;
    margin: 0 auto;
`