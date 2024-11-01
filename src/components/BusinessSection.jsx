import React from "react";
import styles from "../assets/styles/BusinessSection.module.css"; // Import CSS module
import BusinessIcon1 from "../assets/images/BusinessIcon1.svg"
import BusinessIcon2 from "../assets/images/BusinessIcon2.svg"
import BusinessIcon3 from "../assets/images/BusinessIcon3.svg"
import { motion } from 'framer-motion';
import { animationDown } from '../helpers/animationDown'
import { animationUp } from '../helpers/animationUp'
const BusinessSection = () => {
    const cards = [
        {
            icon: <img src={BusinessIcon1} alt="Icon 1" className={styles.icon} />,
            title: "نعاين الاثاث",
            description: "نقوم بارسال مندوبينا و خبرا فى معاينة حالة الاثاث للفحص و المعاينة",
        },
        {
            icon: <img src={BusinessIcon2} alt="Icon 2" className={styles.icon} />,
            title: "نقيم الاثاث",
            description: "نقوم بتقيم سعر الاثاث و اعطائك افضل سعر للاثاث المستعمل ",
        },
        {
            icon: <img src={BusinessIcon3} alt="Icon 3" className={styles.icon} />,
            title: "نشتري الاثاث",
            description: "نقوم بتسليمك النقدية ثمن الاثاث و نقوم بفك و نقل الاثاث بكل سرعة و سهولة",
        },
    ];

    return (
        <section className='container'>
            <motion.h1 {...animationDown} className={styles.heading}>كيف يتم شراء العفش المستعمل في الرياض؟</motion.h1>
            <div className={styles.cardContainer}>
                {cards.map((card, index) => (
                    <motion.div {...animationUp} transition={{ delay: index * 0.3 }} key={index} className={styles.card}>
                        <div className={styles.icon}>{card.icon}</div>
                        <h2 className={styles.title}>{card.title}</h2>
                        <p className={styles.description}>{card.description}</p>
                    </motion.div>
                ))}
            </div>
        </section >
    );
};

export default BusinessSection;
