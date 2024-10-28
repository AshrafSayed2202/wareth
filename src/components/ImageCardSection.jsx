import React, { useState, useEffect } from 'react';
import styles from '../assets/styles/ImageCardComponent.module.css';
import Card1Image1 from '../assets/images/Card1Image1.jpg'
import Card1Image2 from '../assets/images/Card1Image2.jpg'
import Card1Image3 from '../assets/images/Card1Image3.jpg'
import Card2Image1 from '../assets/images/Card2Image1.jpg'
import Card3Image1 from '../assets/images/Card3Image1.jpg'
import Card3Image2 from '../assets/images/Card3Image2.jpg'
import Card3Image3 from '../assets/images/Card3Image3.jpg'
import locationIcon from '../assets/images/locationIcon.svg'
const ImageCardSection = () => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cards = [
        {
            images: [Card1Image1, Card1Image2, Card1Image3],
            keywords: ['أثاث منزل', 'مجالس', 'غرف نوم'],
            text: 'نشترى جميع الاثاث المنزلى و المجالس و غرف النوم المستعملة مهما كانت حالتة و بافضل الاسعار الفك و التحميل و النقل مسؤليتنا فقط اتصل بنا و سنصلك فورا فى جميع انحاء و احياء الرياض'
        },
        {
            images: [Card2Image1],
            keywords: ['أثاث مكتبي'],
            text: 'نشترى جميع الاثاث المكتبى و  المستعمل مهما كانت حالتة و بافضل الاسعار الفك و التحميل و النقل مسؤليتنا فقط اتصل بنا و سنصلك فورا فى جميع انحاء و احياء الرياض'
        },
        {
            images: [Card3Image1, Card3Image2, Card3Image3],
            keywords: ['أجهزة كهربائية ', 'مكيفات هوائية', 'معدات مطاعم'],
            text: 'نشترى جميع الاجهزة الكهربائة و مكيفات الهواء و معدات المطاعم  المستعملة مهما كانت حالتة و بافضل الاسعار الفك و التحميل و النقل مسؤليتنا فقط اتصل بنا و سنصلك فورا فى جميع انحاء و احياء الرياض'
        },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            if (cards[activeCardIndex].images.length > 1) {
                setCurrentImageIndex((prev) => (prev + 1) % cards[activeCardIndex].images.length);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [activeCardIndex, cards]);
    const handleCardClick = (index) => {
        setActiveCardIndex(index);
        setCurrentImageIndex(0);
    };
    return (
        <section className='container' id="business">
            <h1 className={styles.header}>ماذا نشترى</h1>
            <div className={styles.cards}>
                {cards.map((card, index) => {
                    const isActive = index === activeCardIndex;
                    const currentImage = isActive ? card.images[currentImageIndex] : card.images[0];
                    return (
                        <div
                            key={index}
                            className={`${styles.card} ${isActive ? styles.active : styles.inactive}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <img
                                src={currentImage}
                                alt={`Card ${index + 1}`}
                                className={styles.cardImage}
                            />
                            <div className={styles.cardGadgets}>
                                <div className={styles.location}><img src={locationIcon} alt="location icon" />الرياض، المملكة العربية السعودية</div>
                                <div className={styles.keywords}>
                                    {card.keywords.map((keyword) => {
                                        return (
                                            <span className={styles.keyword}>
                                                {keyword}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            <p className={styles.cardText}>{card.text}</p>
                            <div className={styles.contacts}>
                                <span>اتصل بنا</span>
                                <span dir='ltr'>+966 50 665 3804</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ImageCardSection;
