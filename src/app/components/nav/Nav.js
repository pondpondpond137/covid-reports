"use client";

import './Nav.css';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';


export default function Navbar() {
    const linkHomepage = '/';
    const linkDashboard = '/dashboard';
    const linkLogin = '/login';
    const linkSignUp = '/signup';

    const { data: session } = useSession();

    return (
        <>
            <nav>
                <div className='left-items items'>
                    <ul>
                        <li><Link href={linkHomepage} className='link-item'>Home</Link></li>
                        <li><Link href={linkDashboard} className='link-item'>Dashboard</Link></li>
                    </ul>
                </div>
                <div className='right-items items'>
                    <ul>
                        {!session ? (
                            <>
                                <li><Link href={linkLogin} className='link-item'>Login</Link></li>
                                <li><Link href={linkSignUp} className='link-item'>Sign Up</Link></li>
                            </>
                        ) : (
                            <>
                                <li><a onClick={() => signOut()} className='link-item sign-out-link'>Sign Out</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}