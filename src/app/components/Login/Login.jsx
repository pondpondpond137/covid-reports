
'use client';
import React, {useState} from 'react'
import Link from 'next/link';
import './Login.css';


function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleForm(e) {
        e.preventDefault();
    }

    return (
        <div className='container' style={{ backgroundImage: "url('assets/bg_login.jpg')" }}>
            <div className = "wrapper">
                <form onSubmit={handleForm}>
                    <h1>เข้าสู่ระบบ</h1>
                    <div className = "input-box">
                        <input type="text" placeholder="ชื่อผู้ใช้"
                        required onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className ="input-box">
                        <input type="password" placeholder="รหัสผ่าน" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>

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