import React from 'react';
import styles from '../assets/styles/FloatingIcons.module.css';
import Snapchat from '../assets/images/snapchat.svg'
import Instagram from '../assets/images/instagram.svg'
import TikTok from '../assets/images/tiktok.svg'
import WhatsApp from '../assets/images/whatsapp.svg'
const FloatingIcons = () => {
    return (
        <div className={styles.container}>
            <div className={styles.iconColumn}>
                <div className={styles.icon}>
                    <img src={Snapchat} alt="Snapchat" />
                </div>
                <div className={styles.icon}>
                    <img src={Instagram} alt="Instagram" />
                </div>
                <div className={styles.icon}>
                    <img src={TikTok} alt="TikTok" />
                </div>
            </div>
            <div className={styles.floatingButton}>
                <div className={styles.circleIcon}>
                    <div className={styles.text} dir='ltr'>+966 50 665 3804</div>
                    <img src={WhatsApp} alt="WhatsApp" />
                </div>
            </div>
        </div>
    );
};

export default FloatingIcons;
