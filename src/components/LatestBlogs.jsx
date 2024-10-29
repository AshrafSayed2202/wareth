import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import styles from '../assets/styles/blogs.module.css';

const LatestBlogs = (props) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const blogsRef = collection(db, "blogs");
                const blogsQuery = query(blogsRef, orderBy("date", "desc"), limit(3));
                const querySnapshot = await getDocs(blogsQuery);

                const latestBlogs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setBlogs(latestBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchLatestBlogs();
    }, []);

    const truncateHTML = (htmlContent, limit = 100) => {
        const plainText = new DOMParser().parseFromString(htmlContent, "text/html").body.textContent || "";
        return plainText.length > limit ? `${plainText.substring(0, limit)}...` : plainText;
    };

    return (
        <section className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '80px', marginBottom: '40px' }}>
                <h1 className="heading" style={{ margin: 0 }}>
                    {props.title}
                </h1>
                <Link to={'blogs'} className={styles.showMore}>
                    المزيد
                    <svg width={24} fill="#46C752" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </Link>
            </div>
            <div className={styles.latestBlogs}>
                {blogs.map(blog => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`} className={styles.blogLink}>
                        <div className={styles.blogCard}>
                            <img src={blog.image} alt={blog.title} className={styles.blogImage} />
                            <div className={styles.cardText}>
                                <h2 className={styles.blogTitle}>{blog.title}</h2>
                                <p
                                    className={styles.blogContent}
                                    dangerouslySetInnerHTML={{
                                        __html: truncateHTML(blog.content, 100)
                                    }}
                                />
                                <div className={styles.blogDetails} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                        <div className={styles.detailsArrange}>
                                            <span className={styles.blogIcon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" /></svg>
                                            </span>
                                            <span>
                                                {blog.date.normal}
                                            </span>
                                        </div>
                                        <div className={styles.detailsArrange}>
                                            <span className={styles.blogIcon}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" /></svg>
                                            </span>
                                            <span>
                                                {blog.date.hijri}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.detailsArrange}>
                                        <span className={styles.blogIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                        </span>
                                        <span>
                                            {blog.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LatestBlogs;
