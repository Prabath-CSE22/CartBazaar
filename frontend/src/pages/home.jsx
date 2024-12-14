import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import Login from './login'
const home = () => {
    const navigate = useNavigate();
return (
    <body className={styles.homePageBody}>
            <nav>
                    <div className={styles.navbar}>
                            <div className={styles.navbar__logo}>
                                    <h1>Home</h1>
                            </div>
                    </div>
            </nav>

            <Login />
    </body>
)
}

export default home
