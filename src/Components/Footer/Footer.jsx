import React from 'react'
import s from './Footer.module.css'
import github from '../../images/github.png'
import youtube from '../../images/youtube.png'

const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={s.string}>
                <div className={s.element}>
                    <a href="https://github.com/George-victorious/react-game">
                        <div className={s.gitlogo}>
                            <img src={github} alt="" />
                            <span>George-victorious</span>
                        </div>
                    </a>
                </div>
                <div className={s.element}>
                    <a href="https://rs.school/js/">
                        <img src={'https://rs.school/images/rs_school_js.svg'} alt="" />
                    </a>
                </div>
                <div className={s.element}>
                    <div className={s.year}>
                        2021
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer