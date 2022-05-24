import MainLayout from "../layout/main-layout";
import Link from 'next/link'

export default function error() {
    return (
        <MainLayout>
            <h2>
                Page Not Found
            </h2>
            <p>
                We’re sorry, we seem to have lost this page,
                <br />
                but we don’t want to lose you.
                <br />
                <Link href='/'>
                    <a>
                        ← Go home
                    </a>
                </Link>
            </p>

            <style jsx>{`
                h2 {
                    font-size: 2rem;
                    line-height: 2rem;
                    margin: 20vh auto 30px auto;
                }
                p {
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                    margin-bottom: 25px;
                }

                h2, p{
                    text-align: center;
                }
                `}</style>
        </MainLayout>
    )
}