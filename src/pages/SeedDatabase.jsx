
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { lawyersData } from '../data/lawyers';
import { CheckCircle, AlertTriangle, Loader } from 'lucide-react';

const SeedDatabase = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [logs, setLogs] = useState([]);

    // Helper to hash password
    const hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    // Helper to convert URL to Base64
    const toBase64 = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image:", error);
            return null;
        }
    };

    // Helper to log messages
    const addLog = (msg) => {
        console.log(`[Seeder] ${msg}`);
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    };

    useEffect(() => {
        const seedDatabase = async () => {
            console.log("Starting seedDatabase effect...");
            if (!db) {
                console.error("Firebase DB is undefined!");
                addLog("Error: Firebase DB not initialized.");
                setStatus('error');
                return;
            }

            setStatus('loading');
            addLog("Starting database update...");

            try {
                // 1. Seed Lawyers
                const lawyerCollection = collection(db, "lawyers");

                for (const lawyer of lawyersData) {
                    addLog(`Processing ${lawyer.name}...`);

                    let imageBase64 = lawyer.image;

                    // If it's a local path (img src), fetch and convert
                    if (lawyer.image && !lawyer.image.startsWith('data:')) {
                        addLog(`   Converting image to Base64...`);
                        // Note: In production, relative paths might need to be resolved against window.location.origin
                        // but usually fetch('/assets/...') works fine.
                        const converted = await toBase64(lawyer.image);
                        if (converted) {
                            imageBase64 = converted;
                            addLog(`   Conversion success.`);
                        } else {
                            addLog(`   Conversion failed. Using original path.`);
                        }
                    }

                    const lawyerData = { ...lawyer, image: imageBase64 };

                    // Check if exists
                    const q = query(lawyerCollection, where("id", "==", lawyer.id));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        // Update existing doc
                        const docRef = querySnapshot.docs[0].ref;
                        await updateDoc(docRef, lawyerData);
                        addLog(`   Updated Lawyer: ${lawyer.name}`);
                    } else {
                        // Create new doc
                        await addDoc(lawyerCollection, lawyerData);
                        addLog(`   Added Lawyer: ${lawyer.name}`);
                    }
                }

                // 2. Seed Admin
                const adminCollection = collection(db, "admins");
                const adminQ = query(adminCollection, where("adminId", "==", "admin"));
                const adminSnap = await getDocs(adminQ);

                if (adminSnap.empty) {
                    const hashedPassword = await hashPassword("admin123");
                    await addDoc(adminCollection, {
                        adminId: "admin",
                        password: hashedPassword,
                        createdAt: new Date()
                    });
                    addLog("Created Default Admin (ID: admin)");
                } else {
                    addLog("Admin account already exists.");
                }

                setStatus('success');
                addLog("Database sync completed successfully!");

            } catch (error) {
                console.error("Seeding error:", error);
                setStatus('error');
                addLog(`CRITICAL ERROR: ${error.message}`);
            }
        };

        seedDatabase();
    }, []);

    return (
        <div className="min-h-screen bg-cream p-8 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                <h1 className="text-2xl font-serif text-navy mb-4 flex items-center gap-2">
                    Database Seeder
                    {status === 'loading' && <Loader className="animate-spin text-gold" />}
                    {status === 'success' && <CheckCircle className="text-green-500" />}
                    {status === 'error' && <AlertTriangle className="text-red-500" />}
                </h1>

                <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                    {logs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                    ))}
                    {logs.length === 0 && <div>Initialize...</div>}
                </div>
            </div>
        </div>
    );
};

export default SeedDatabase;
