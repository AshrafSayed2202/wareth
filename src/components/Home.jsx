import React from 'react';
import LandingSection from './LandingSection';
import ImageCardSection from './ImageCardSection';
import BusinessSection from './BusinessSection';
import LatestBlogs from './LatestBlogs';
import FAQs from './FAQs';
import ContactSection from './ContactSection';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>الوارث | الصفحة الرئيسية</title>
                <meta name="robots" content="index,follow" />
                <meta
                    name="description"
                    content="نشترى جميع الاثاث المنزلى و المجالس و غرف النوم المستعملة مهما كانت حالتة و بافضل الاسعار الفك و التحميل و النقل مسؤليتنا فقط اتصل بنا و سنصلك فورا فى جميع انحاء و احياء الرياض"
                />
            </Helmet>
            <LandingSection />
            <ImageCardSection />
            <BusinessSection />
            <LatestBlogs title="المدونات" />
            <FAQs />
            <ContactSection />
        </>
    )
};

export default Home;
