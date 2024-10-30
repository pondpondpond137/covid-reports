"use client";

import React, { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';



const validate_username = /^[A-Za-z][A-Za-z0-9_]{7,}$/;
const validate_password = /^(?=.*[0-9]).{8,}$/;
import './signup.css';

function Signup2() {
    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [errUser, setErrUser] = useState('');
    const [userTouched, setUserTouched] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [errPwd, setErrPwd] = useState('');
    const [pwdTouched, setPwdTouched] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [matchPwd, setMatchPwd] = useState(false);
    const [errMatch, setErrMatch] = useState('');
    const [confirmTouched, setConfirmTouched] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const { data:session } = useSession();
    if (session) redirect('/homepage');


    useEffect(() => {
        const result = validate_username.test(username);
        setValidName(result);
        if (!result && userTouched) {
            setErrUser('ชื่อผู้ใช้ต้องมีอย่างน้อย 8 ตัวอักษร');
        } else {
            setErrUser('');
        }
    }, [username, userTouched]);

    useEffect(() => {
        const result = validate_password.test(password);
        setValidPwd(result);
        if (!result && pwdTouched) {
            setErrPwd('รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัวและมีตัวอักษรอย่างน้อย 8 ตัว');
        } else {
            setErrPwd('');
        }
        const matched = password === confirmPassword;
        setMatchPwd(matched);
        if (!matched && confirmTouched) {
            setErrMatch('รหัสผ่านไม่ตรงกัน');
        } else {
            setErrMatch('');
        }
    }, [password, confirmPassword, pwdTouched, confirmTouched]);

    async function signupForm(e) {
        e.preventDefault();
        const form = e.target;

        const user = validate_username.test(username);
        setValidName(user);
        if (!user && userTouched) {
            setErrUser('ชื่อผู้ใช้ต้องมีอย่างน้อย 8 ตัวอักษร');
        } else {
            setErrUser('');
        }
        const pwd = validate_password.test(password);
        setValidPwd(pwd);
        if (!pwd && pwdTouched) {
            setErrPwd('รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัวและมีตัวอักษรอย่างน้อย 8 ตัว');
        } else {
            setErrPwd('');
        }
        const matched = password === confirmPassword;
        setMatchPwd(matched);
        if (!matched && confirmTouched) {
            setErrMatch('รหัสผ่านไม่ตรงกัน');
        } else {
            setErrMatch('');
        }

        if (validName || validPwd || matchPwd) {
            try {
                const res = await fetch("https://database-final-project-7q1q.onrender.com/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                
                if (res.ok) {
                    console.log('Registration successful');
                    setSuccess(true);
                    setError(false);
                } else {
                    console.error('Registration failed');
                    setSuccess(false);
                    setError(true)
                }
            } catch (error) {
                console.log('Error during registration: ', error);
            }
            form.reset();
        }else {
            setSuccess(false);
            setError(true);
        }
    }

    return (
        <div className='container' style={{ backgroundImage: "url('assets/bg_login.jpg')" }}>
            <div className="wrapper">
                <form onSubmit={signupForm}>
                    <h1>ลงทะเบียน</h1>
                    <div className="input-box">
                        <input type="text" placeholder="ชื่อผู้ใช้" required onChange={(e) => setUsername(e.target.value)} onBlur={() => setUserTouched(true)} />
                    </div>
                    {errUser && <div className='error'>{errUser}</div>}
                    <div className="input-box">
                        <input type="password" placeholder="รหัสผ่าน" required onChange={(e) => setPassword(e.target.value)} onBlur={() => setPwdTouched(true)} />
                    </div>
                    {errPwd && <div className='error'>{errPwd}</div>}
                    <div className="input-box">
                        <input type="password" placeholder="ยืนยันรหัสผ่าน" required onChange={(e) => setConfirmPassword(e.target.value)} onBlur={() => setConfirmTouched(true)} />
                    </div>
                    {errMatch && <div className='error'>{errMatch}</div>}
                    <button type="submit" className="btn">ลงทะเบียน</button>

                </form>
                {success && (
                    <div className="success-message">
                        <p>ลงทะเบียนสำเร็จ! ยินดีต้อนรับสู่ระบบ</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>มีผู้ใช้นี้ในระบบแล้ว</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Signup2