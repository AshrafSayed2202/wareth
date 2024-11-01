// Login.jsx
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from '../assets/styles/Login.module.css'; // Import the CSS module

const Login = () => {
    useEffect(() => {
        document.title = 'الوارث | تسجيل دخول';
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className='heading'>تسجيل دخول</h2>
            <form className={styles.form} onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className={styles.input} // Apply input styles
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="كلمة المرور"
                    className={styles.input} // Apply input styles
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.button}>تسجيل دخول</button> {/* Apply button styles */}
            </form>
        </div>
    );
};

export default Login;
