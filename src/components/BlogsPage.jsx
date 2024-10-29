import React from "react"
import { Link } from "react-router-dom"
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
        </section>
    )
}
export default BlogsPage