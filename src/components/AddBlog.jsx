import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../assets/styles/AddBlog.module.css';

const cities = [
    "الرياض", "جدة", "مكة", "المدينة المنورة", "الدمام", "الأحساء", "الطائف",
    "بريدة", "تبوك", "القطيف", "خميس مشيط", "الجبيل", "حائل", "حفر الباطن", "الخرج",
    "الخبر", "عرعر", "سكاكا", "جيزان", "نجران", "الباحة", "الزلفي", "الدوادمي"
];

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = 'الوارث | إضافة مدونة'
    }, [])
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storage, `images/${image.name}-${Date.now()}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, 'blogs'), {
                title,
                image: imageUrl,
                location,
                date: Timestamp.now(),
                content,
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    return (
        <div className={`${styles.container} container`}>
            <h2 className='heading'>إضافة مدونة جديدة</h2>
            <form onSubmit={handleSubmit}>
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
                        required
                    />
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
                        className={`${styles.textarea}`}
                        placeholder="أكتب محتوي مدونتك هنا..."
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        تـأكيد
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

export default AddBlog;
