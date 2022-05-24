import Link from "next/link"
import styles from '../styles/Categories.module.css'

export default function Categories() {

    return (


        <ul className={styles['nav-categories']}>
            <li>
                <Link
                    href='/world'>
                    <a>
                        World
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/politics'>
                    <a>
                        Politics
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/business'>
                    <a>
                        Business
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/tech'>
                    <a>
                        Tech
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/science'>
                    <a>
                        Science
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/health'>
                    <a>
                        Health
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/sport'>
                    <a>
                        Sport
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/art'>
                    <a>
                        Art
                    </a>
                </Link>
            </li>
            <li>
                <Link
                    href='/style'>
                    <a>
                        Style
                    </a>
                </Link>
            </li>
        </ul>
    )
}