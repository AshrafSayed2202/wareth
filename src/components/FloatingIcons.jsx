import React from 'react';
import styles from '../assets/styles/FloatingIcons.module.css';
import Snapchat from '../assets/images/snapchat.svg'
import Instagram from '../assets/images/instagram.svg'
import TikTok from '../assets/images/tiktok.svg'
import WhatsApp from '../assets/images/whatsapp.svg'
import { motion } from 'framer-motion';
import { animationRight } from '../helpers/animationRight'
const FloatingIcons = () => {
    return (
        <motion.div {...animationRight} className={styles.container}>
            <div className={styles.iconColumn}>
                <span className={styles.iconText}>تابعنا</span>
                <a className={styles.icon} href='https://www.tiktok.com/@user7yrqbiqnnt?_t=8qvCN6LXuFt&_r=1' target='_blank' rel="noreferrer">
                    <img src={Snapchat} alt="Snapchat" />
                </a>
                <a className={styles.icon} href='https://www.tiktok.com/@user7yrqbiqnnt?_t=8qvCN6LXuFt&_r=1' target='_blank' rel="noreferrer">
                    <img src={Instagram} alt="Instagram" />
                </a>
                <a className={styles.icon} href='https://www.tiktok.com/@user7yrqbiqnnt?_t=8qvCN6LXuFt&_r=1' target='_blank' rel="noreferrer">
                    <img src={TikTok} alt="TikTok" />
                </a>
            </div>
            <a className={styles.floatingButton} href='https://wa.me/+966506653804' target='_blank' rel="noreferrer">
                <div className={styles.circleIcon}>
                    <div className={styles.text} dir='ltr'>+966 50 665 3804</div>
                    <img src={WhatsApp} alt="WhatsApp" />
                </div>
            </a>
        </motion.div>
    );
};

export default FloatingIcons;
