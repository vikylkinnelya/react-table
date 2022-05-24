import { useRouter } from "next/router"
import Head from "next/head";
import Link from "next/link";

export default function MainLayout({ children, title = 'Home | NYT' }) {

    const router = useRouter()

    function tabHandleChange(ev, value) {
        router.push(`/${value}`)
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content="next, javascript, react" />
                <meta name='description' content='This is tutprial' />
                <meta charSet="utf-8" />
            </Head>

            <nav>
                <Link href='/'>
                    <a>
                        <h1>New York Times articles</h1>
                    </a>
                </Link>
                <hr />
            </nav>

            <main>
                {children}
            </main>
        </>
    )
}