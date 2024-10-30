'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CovidCasesPage from '../components/homeCom/CovidCasesPage';
import styles from './Home.module.css'; // Import the new CSS module

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/login'); // Redirect to the homepage if session does not exist
        }
    }, [session, router]);

    return (
        <div className={styles.container}> {/* Use the new container style */}
            <h3 className={styles.header}>Home</h3> {/* Updated header style */}
            <div>
                {session && <div className={styles.greeting}>Hello {session.user?.name}</div>} {/* Greeting style */}
                <CovidCasesPage />
            </div>
        </div>
    );
}
