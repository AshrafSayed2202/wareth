import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { db } from '../firebaseConfig'; // Make sure the path is correct
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const BlogTable = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsCollection = collection(db, 'blogs'); // Reference collection properly
                const blogsSnapshot = await getDocs(blogsCollection);
                const blogsData = blogsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date.toDate().toLocaleDateString(),
                }));
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            }
        };

        fetchBlogs();
    }, []);
    const handleDelete = async (id) => {
        try {
            await db.collection('blogs').doc(id).delete();
            // Ensure that we update state conditionally
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Location',
                accessor: 'location',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Actions',
                accessor: 'actions', // Custom accessor for buttons
                Cell: ({ row }) => (
                    <>
                        <button onClick={() => handleDelete(row.original.id)}>Delete</button>
                        <button onClick={() => navigate(`/dashboard/edit-blog/${row.original.id}`)}>Edit</button>
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
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default BlogTable;
