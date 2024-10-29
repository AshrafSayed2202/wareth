import React from "react"
import { Link } from "react-router-dom"
import BlogsLanding from '../assets/images/blogs-landing.jpg'
const BlogsPage = () => {
    React.useEffect(() => {
        document.title = 'الوارث | المدونات'
    }, [])
    return (
        <section>
            <div className="page-header">
                <div className="container">
                    <p><Link to={'/'}>الصفحة الرئيسية</Link>{' > '}<span>المدونات</span></p>
                    <p className="head">المدونات</p>
                </div>
            </div>
            <img src={BlogsLanding} alt='blogs landing' className='blog-landing' />
            <div className="container">
                <h1 className='blog-header'>المدونات</h1>
            </div>
        </section>
    )
}
export default BlogsPage