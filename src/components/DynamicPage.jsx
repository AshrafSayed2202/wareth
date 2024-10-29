import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import NotFound from './NotFound.jsx';
// import styles from '../assets/styles/DynamicPage.module.css';

const DynamicPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const docRef = doc(db, "blogs", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const pageData = docSnap.data();
                    setData(pageData);
                    document.title = `الوارث | ${pageData.title}`;
                    setNotFound(false);
                } else {
                    document.title = "الوارث | الصفحة غير موجودة";
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                document.title = "الوارث | حدث خطأ";
                setNotFound(true);
            }
        };

        fetchPageData();
    }, [id]);

    if (notFound) {
        return <NotFound />;
    }

    return (
        <section>
            <div className="page-header">
                <div className="container">
                    <p><Link to={'/'}>الصفحة الرئيسية</Link>{' > '}<Link to={'/blogs'}>المدونات</Link>{' > '}<span>{data?.title}</span></p>
                    <p className="head">{data?.title}</p>
                </div>
            </div>
            <div className="container">
                <h1>{data?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            </div>
        </section>
    );
};

export default DynamicPage;
