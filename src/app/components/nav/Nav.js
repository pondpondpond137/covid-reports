import './Nav.css';
import Link from 'next/link';

export default function Navbar() {
    const linkHomepage = '/';
    const linkContactUs = '/';
    const linkLogin = '/login';
    const linkSignUp = '/signup';

    return (
        <>
            <nav>
                <div className='left-items items'>
                    <ul>
                        <li><Link href={linkHomepage} className='link-item'>Homepage</Link></li>
                        <li><Link href={linkContactUs} className='link-item'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className='right-items items'>
                    <ul>
                        <li><Link href={linkLogin} className='link-item'>Login</Link></li>
                        <li><Link href={linkSignUp} className='link-item'>Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}