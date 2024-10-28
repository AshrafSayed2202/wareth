import React from 'react';
import styles from '../assets/styles/Landing.module.css';
import phoneIcon from '../assets/images/phone-icon.svg'

const ContactSection = () => {
    return (
        <section className='container'>
            <h1 className='heading'>تواصل معنا</h1>
            <div className="contact-landing">
                <div className={styles.overlay}>
                    <div className={styles.textContainer}>
                        <h1>شركة الوارث
                            <br />
                            <span className={styles.coloredtxt}>
                                لشراء الاثاث المستعمل بالرياض
                            </span>
                        </h1>
                        <p>اتصل بنا الآن</p>
                        <span dir='ltr'> <img src={phoneIcon} alt="phone icon" />+966 50 665 3804</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ContactSection