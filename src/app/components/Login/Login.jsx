'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import './Login.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { data: session } = useSession();

    const router = useRouter();
    useEffect(() => {
        if (session) {
            router.push('/'); // Redirect to the homepage if session exists
        }
    }, [session, router]);

    async function handleForm(e) {
        e.preventDefault();
        try {

            const res = await signIn("credentials", {
                username,
                password,
                redirect: false
            })
            if (res.error) {
                setError("รหัสผ่านไม่ถูกต้อง หรือไม่มีชื่อผู้ใช้นี้ในระบบ");
                return
            }
            router.replace('/homepage');
        } catch (error) {
            console.log('error');
        }
    }

    return (
        <div className='container' style={{ backgroundImage: "url('assets/bg_login.jpg')" }}>
            <div className="wrapper">
                <form onSubmit={handleForm}>
                    <h1>เข้าสู่ระบบ</h1>
                    <div className="input-box">
                        <input type="text" placeholder="ชื่อผู้ใช้"
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="รหัสผ่าน" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    <button type="submit" className="btn">เข้าสู่ระบบ</button>

                    <div className="register-link">
                        <p>ยังไม่มีบัญชีผู้ใช้ ? <Link href='/signup'>ลงทะเบียนที่นี่</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login