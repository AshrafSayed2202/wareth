import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/Nav.module.css';
import Logo from '../assets/images/Logo.png'
import FloatingIcons from './FloatingIcons';
const Nav = () => {
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleScroll = () => {
        const sections = ['FAQs', 'business', 'contact'];
        let currentSection = '';

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) {
                const { top } = element.getBoundingClientRect();
                if (top >= 0 && top < window.innerHeight / 2) {
                    currentSection = section;
                }
            }
        });

        setActiveSection(currentSection);
    };

    const handleLinkClick = (e, sectionId) => {
        e.preventDefault();

        if (location.pathname !== '/') {
            navigate('/');
        }

        const element = document.getElementById(sectionId);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav className={styles.nav}>
            <div className='container'>
                <FloatingIcons />
                <div className={styles.logo}>
                    <img src={Logo} alt="Logo" className={styles.logoImage} />
                </div>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
                        >
                            الصفحة الرئيسة
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            to="/blogs"
                            className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
                        >
                            المدونات
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            href="#FAQs"
                            onClick={(e) => handleLinkClick(e, 'FAQs')}
                            className={activeSection === 'FAQs' ? styles.active : styles.navLink}
                        >
                            الاسئلة الشائعة
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            href="#business"
                            onClick={(e) => handleLinkClick(e, 'business')}
                            className={activeSection === 'business' ? styles.active : styles.navLink}
                        >
                            ماذا نشتري
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            href="#contact"
                            onClick={(e) => handleLinkClick(e, 'contact')}
                            className={activeSection === 'contact' ? styles.active : styles.navLink}
                        >
                            اتصل بنا
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
