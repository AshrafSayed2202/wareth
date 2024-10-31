import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { db, auth } from '../firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import styles from '../assets/styles/BlogTable.module.css'; // Adjust the path as necessary

const BlogTable = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const blogsCollection = collection(db, 'blogs');
                const blogsSnapshot = await getDocs(blogsCollection);
                const blogsData = blogsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        location: data.location,
                        date: data.date ? data.date.toDate() : null, // Convert to Date object
                    };
                });

                // Sort blogs by date (descending)
                blogsData.sort((a, b) => (b.date ? b.date.getTime() : 0) - (a.date ? a.date.getTime() : 0));

                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            const blogDocRef = doc(db, 'blogs', id);
            await deleteDoc(blogDocRef);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/dashboard/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };
    const columns = React.useMemo(
        () => [
            {
                Header: 'رقم المعرف (ID)',
                accessor: 'id',
            },
            {
                Header: 'العنوان',
                accessor: 'title',
            },
            {
                Header: 'الموقع',
                accessor: 'location',
            },
            {
                Header: 'التاريخ',
                accessor: 'date',
                Cell: ({ value }) => (value ? value.toLocaleDateString() : 'N/A'), // Format date or show N/A
            },
            {
                Header: 'التحكم',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <>
                        <button className={styles.button} onClick={() => handleDelete(row.original.id)}>حذف<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg></button>
                        <button className={styles.button} onClick={() => navigate(`/dashboard/edit-blog/${row.original.id}`)}>تعديل<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" /></svg></button>
                    </>
                ),
            },
        ],
        [navigate]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: blogs,
    });

    return (
        <div className='container'>
            {loading ? (
                <p>Loading...</p>
            ) : blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                <table {...getTableProps()} className={styles.table}>
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index} className={styles.tr}>
                                {headerGroup.headers.map((column, index) => (
                                    <th {...column.getHeaderProps()} key={index} className={styles.th}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={index} className={styles.tr}>
                                    {row.cells.map((cell, index) => (
                                        <td {...cell.getCellProps()} key={index} className={styles.td}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            <button onClick={handleLogout} className={styles.logoutButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>تسجيل الخروج</button>
        </div>
    );
};

export default BlogTable;
