import React from "react"
import { Link } from "react-router-dom"
import BlogsLanding from '../assets/images/blogs-landing.jpg'
import styles from '../assets/styles/blogs.module.css';
const BlogsPage = () => {
    React.useEffect(() => {
        document.title = 'الوارث | المدونات'
    }, [])
    return (
        <section>
            <div className={styles.pageHeader}>
                <div className="container">
                    <p><Link to={'/'}>الصفحة الرئيسية</Link>{' > '}<span>المدونات</span></p>
                    <p className={styles.head}>المدونات</p>
                </div>
            </div>
            <img src={BlogsLanding} alt='blogs landing' className={styles.blogLanding} />
            <div className="container">
                <h1 className={styles.blogHeader}>المدونات</h1>
            </div>
        </section>
    )
}
export default BlogsPage