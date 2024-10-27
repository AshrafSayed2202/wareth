import React, { useState, useRef } from "react";
import styles from "../assets/styles/FAQs.module.css"

const FAQs = () => {
    const [activeIndices, setActiveIndices] = useState([]);
    const contentRefs = useRef([]);

    const toggleQuestion = (index) => {
        setActiveIndices((prevIndices) =>
            prevIndices.includes(index) ? prevIndices.filter((i) => i !== index) : [...prevIndices, index]
        );

        // Apply smooth height transition
        const content = contentRefs.current[index];
        if (content) {
            if (content.style.height) {
                content.style.height = null; // Collapse to 0
            } else {
                content.style.height = `${content.scrollHeight}px`; // Expand to full height
            }
        }
    };

    const faqs = [
        {
            question: "كيف تقوم شركة الوارث لشراء الأثاث المستعمل بالرياض بتقدير قيمة الأثاث؟",
            answer: "تقوم الشركة بإرسال فريق العمل المتكون من عمال و فنيين ونجارين لفحص الأثاث او الأجهزة المراد بيعها لمعرفة قيمته وتقديم سعر مناسب يرضي العميل، كما تقوم بالتواصل معك لإبلاغك بالسعر التي تم الإتفاق عليه",
        },
        {
            question: "هل توجد رسوم على نقل الاثاث؟",
            answer: "تقوم الشركة بإرسال فريق العمل المتكون من عمال و فنيين ونجارين لفحص الأثاث او الأجهزة المراد بيعها لمعرفة قيمته وتقديم سعر مناسب يرضي العميل، كما تقوم بالتواصل معك لإبلاغك بالسعر التي تم الإتفاق عليه",
        },
        {
            question: "اين تقدمون خدماتكم فى احياء الرياض؟",
            answer: "تقوم الشركة بإرسال فريق العمل المتكون من عمال و فنيين ونجارين لفحص الأثاث او الأجهزة المراد بيعها لمعرفة قيمته وتقديم سعر مناسب يرضي العميل، كما تقوم بالتواصل معك لإبلاغك بالسعر التي تم الإتفاق عليه",
        },
        {
            question: "كيف يتم شراء الأثاث المستعمل فى الرياض؟",
            answer: "تقوم الشركة بإرسال فريق العمل المتكون من عمال و فنيين ونجارين لفحص الأثاث او الأجهزة المراد بيعها لمعرفة قيمته وتقديم سعر مناسب يرضي العميل، كما تقوم بالتواصل معك لإبلاغك بالسعر التي تم الإتفاق عليه",
        },
    ];

    return (
        <div className="container">
            <h1 className={styles.heading}>الأسئلة الشائعة</h1>
            <div className={styles.faqContainer}>
                {faqs.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <div className={styles.question} onClick={() => toggleQuestion(index)}>
                            <span>{faq.question}</span>
                            <div className={`${styles.icon} ${activeIndices.includes(index) ? styles.iconOpen : ""}`} />
                        </div>
                        <div
                            ref={(el) => (contentRefs.current[index] = el)}
                            className={styles.answer}
                            style={{
                                height: activeIndices.includes(index) ? `${contentRefs.current[index]?.scrollHeight}px` : "0",
                            }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;