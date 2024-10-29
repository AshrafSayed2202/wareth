// components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    React.useEffect(() => {
        document.title = 'الوارث | الصفحة غير موجودة'
    }, [])
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#333',
            margin: 'auto'
        },
        heading: {
            fontFamily: 'sans-serif',
            fontSize: '3rem',
            margin: '0',
            color: '#ff5e57',
        },
        message: {
            fontSize: '1.2rem',
            margin: '20px 0',
            color: '#555',
        },
        link: {
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
        },
        linkHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Not Found - 404</h1>
            <p style={styles.message}>معذرا, الصفحة التي تحاول الوصول اليها غير موجودة.</p>
            <Link
                to="/"
                style={styles.link}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
            >
                العودة للصفحة الرئيسية
            </Link>
        </div>
    );
};

export default NotFound;
