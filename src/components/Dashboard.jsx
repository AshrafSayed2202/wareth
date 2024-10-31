import React from "react";
import BlogTable from "./BlogTable";
const Dashboard = () => {
    React.useEffect(() => {
        document.title = 'الوارث | واجهة المالك'
    }, [])
    return (
        <div>
            <h1 className="container heading">مرحباً بك في واجهة المالك</h1>
            <BlogTable />
        </div>
    );
};

export default Dashboard;