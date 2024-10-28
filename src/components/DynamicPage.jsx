import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const DynamicPage = () => {
    const { id } = useParams(); // Get the dynamic ID from the route
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const docRef = doc(db, "pages", id); // Replace 'pages' with your Firestore collection name
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const pageData = docSnap.data();
                    setTitle(pageData.title); // Update the title state with data from Firestore
                    document.title = pageData.title; // Set document title
                } else {
                    setTitle("Page Not Found");
                    document.title = "Page Not Found - YourCompany";
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                setTitle("Error loading page");
                document.title = "Error - YourCompany";
            }
        };

        fetchTitle();
    }, [id]); // Re-run when the `id` parameter changes

    return (
        <div>
            <h1>{title}</h1>
            <p>Content for the dynamic page will go here.</p>
        </div>
    );
};

export default DynamicPage;
