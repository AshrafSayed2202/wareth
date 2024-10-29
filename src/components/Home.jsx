import React from 'react';
import LandingSection from './LandingSection';
import ImageCardSection from './ImageCardSection';
import BusinessSection from './BusinessSection';
import LatestBlogs from './LatestBlogs';
import FAQs from './FAQs';

const Home = () => {
    React.useEffect(() => {
        document.title = 'الوارث | الصفحة الرئيسية'
    }, [])
    return (
        <>
            <LandingSection />
            <ImageCardSection />
            <BusinessSection />
            <LatestBlogs title="المدونات" />
            <FAQs />
        </>
    )
};

export default Home;
