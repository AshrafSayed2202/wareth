import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../assets/styles/AddBlog.module.css';

const cities = [
    "الرياض", "جدة", "مكة", "المدينة المنورة", "الدمام", "الأحساء", "الطائف",
    "بريدة", "تبوك", "القطيف", "خميس مشيط", "الجبيل", "حائل", "حفر الباطن", "الخرج",
    "الخبر", "عرعر", "سكاكا", "جيزان", "نجران", "الباحة", "الزلفي", "الدوادمي"
];

const EditBlog = () => {
    const { id } = useParams(); // Get blog ID from URL parameters
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const [initialImageURL, setInitialImageURL] = useState(''); // Store initial image URL
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'الوارث | تعديل مدونة';

        // Fetch blog data by ID
        const fetchBlog = async () => {
            const docRef = doc(db, 'blogs', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const blogData = docSnap.data();
                setTitle(blogData.title);
                setInitialImageURL(blogData.image);
                setLocation(blogData.location);
                setContent(blogData.content); // Set content as HTML
            } else {
                console.error("No blog found with that ID.");
            }
        };

        fetchBlog();
    }, [id]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = initialImageURL;

            // Update image if a new one is uploaded
            if (image) {
                const imageRef = ref(storage, `images/${image.name}-${Date.now()}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            // Update blog data in Firestore
            await updateDoc(doc(db, 'blogs', id), {
                title,
                image: imageUrl,
                location,
                date: Timestamp.now(),
                content,
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className={`${styles.container} container`}>
            <h2 className='heading'>تعديل مدونة</h2>
            <form onSubmit={handleUpdate}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>عنوان المدونة :</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>صورة المدونة :</label>
                    <input
                        type="file"
                        className={styles.fileInput}
                        onChange={handleImageChange}
                    />
                    {initialImageURL && !image && (
                        <img src={initialImageURL} alt="Current Blog" className={styles.currentImage} />
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>موقع المدونة :</label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.select}
                        required
                    >
                        <option value="">اختر المدينة</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>محتوي المدونة :</label>
                    <ReactQuill
                        theme="snow"
                        dir="rtl"
                        value={content}
                        onChange={setContent}
                        className={styles.textarea}
                        placeholder="أكتب محتوي مدونتك هنا..."
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        تحديث
                    </button>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.backButton}`}
                        onClick={() => navigate('/dashboard')}
                    >
                        العودة
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
