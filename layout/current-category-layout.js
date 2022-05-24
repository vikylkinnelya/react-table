import Link from 'next/link'

export default function CurrentCategoryHeader({ section, subsection = false }) {

    function checkCategory(exp) {
        return exp.replace(/\./g, '').replace(/\ /g, '-').toLowerCase()
    }

    return (
        <>
            <div>
                <Link href={'/[section]/?page=1'} as={`/${checkCategory(section)}`}>
                    <a>
                        <h2>{section}</h2>
                    </a>
                </Link>


                {subsection &&
                    <>
                        <h2>|</h2>
                        <Link href={'/[section]/[subsection]/?page=1'}
                            as={`/${checkCategory(section)}/${checkCategory(subsection)}`}>
                            <a>
                                <h3>{subsection}</h3>
                            </a>
                        </Link>


                    </>}

            </div>


            <style jsx>{`
            h2, h3{
                margin:0 0.5em;
            }
            div{
                display:flex;
                justify-content: center;
                align-items: baseline
            }
            div, hr {
                max-width: 90vw;
                margin: 0.5em auto 0.5em auto;
                padding: 0 6.5vw 0 6.5vw;
            }
            `}
            </style>

        </>
    )
}