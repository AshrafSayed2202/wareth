import React from 'react';
import styles from '../assets/styles/Landing.module.css';
import phoneIcon from '../assets/images/phone-icon.svg'
import { motion } from 'framer-motion';
import { animationDown } from '../helpers/animationDown'
import { animationLeft } from '../helpers/animationLeft'
const ContactSection = () => {
    return (
        <section className='container' id='contact'>
            <motion.h1 {...animationDown} className='heading'>تواصل معنا</motion.h1>
            <motion.div {...animationLeft} className="contact-landing">
                <div className={styles.overlay}>
                    <div className={styles.textContainer}>
                        <h1>شركة الوارث
                            <br />
                            <span className={styles.coloredtxt}>
                                لشراء الاثاث المستعمل بالرياض
                            </span>
                        </h1>
                        <p>اتصل بنا الآن</p>
                        <span dir='ltr'><a href="tel:+966506653804"><img src={phoneIcon} alt="phone icon" />+966 50 665 3804</a></span>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
export default ContactSection