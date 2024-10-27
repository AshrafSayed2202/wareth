import React from "react";
import styles from "../assets/styles/BusinessSection.module.css"; // Import CSS module
import BusinessIcon1 from "../assets/images/BusinessIcon1.svg"
import BusinessIcon2 from "../assets/images/BusinessIcon2.svg"
import BusinessIcon3 from "../assets/images/BusinessIcon3.svg"
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
            description: "نقوم بتسليمك النقدية قمن الاثاث و نقوم بفك و نقل الاثاث بكل سرعة و سهولة",
        },
    ];

    return (
        <div className='container'>
            <h1 className={styles.heading}>كيف يتم شراء العفش المستعمل في الرياض؟</h1>
            <div className={styles.cardContainer}>
                {cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.icon}>{card.icon}</div>
                        <h2 className={styles.title}>{card.title}</h2>
                        <p className={styles.description}>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessSection;
