import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/about" className={styles.navLink}>About</Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/services" className={styles.navLink}>Services</Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/contact" className={styles.navLink}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
