import React from 'react';
import LandingSection from './LandingSection';
import ImageCardSection from './ImageCardSection';
import BusinessSection from './BusinessSection';
import FAQs from './FAQs';
import ContactSection from './ContactSection';

const Home = () => {
    React.useEffect(() => {
        document.title = 'الوارث | الصفحة الرئيسية'
    }, [])
    return (
        <>
            <LandingSection />
            <ImageCardSection />
            <BusinessSection />
            <FAQs />
            <ContactSection />
        </>
    )
};

export default Home;
