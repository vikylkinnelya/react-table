import { useMemo } from "react"
import { useTable } from 'react-table';
import datePrettier from '../functions/datePrettier';
import Image from "next/image";
import styles from '../styles/ActicleTable.module.css'
import Link from 'next/link';


export default function ArticlesTable({ articles }) {
    
    const data = useMemo(() => {
        return Array.from(
            articles.map(
                page => page.response.docs)
                .flat())
    }, [articles])

    const columns = useMemo(
        () => [
            {
                Header: '',
                id: 'published_date',
                accessor: d => (
                    <p>{datePrettier(d.pub_date)}</p>
                )
            },
            {
                Header: '',
                id: 'title',
                accessor: d =>
                    <div className={styles['table-article-title-col']}>
                        <Link href={{
                            pathname: '/article/[id]',
                            query: { id: d.uri.replace(/'/, '"') }
                        }}
                       >
                            <a>
                                <h2 >
                                    {d.headline.print_headline || d.headline.main}
                                </h2>
                            </a>
                        </Link>
                        <p>
                            {d.snippet}
                        </p>
                        <p>
                            {d.byline.original}
                        </p>
                    </div>
            },
            {
                Header: '',
                id: 'multimedia',
                accessor: d => (
                    <Image
                        src={`https://static01.nyt.com/${d.multimedia[10] ? d.multimedia[10]?.url : ''}`}
                        alt={d.headline.print_headline || d.headline.main + '...'}
                        width={225}
                        height={150}
                    />
                )
            }
        ]
        , []
    )

    const tableInstance = useTable({
        data,
        columns, initialState: { pageIndex: 1 },
        manualPagination: true,
    })

    const { getTableProps,
        getTableBodyProps,
        rows, prepareRow } = tableInstance

    return (

        <div className={styles['articles-table']}>

            {data &&
                <table {...getTableProps()}>

                    <tbody {...getTableBodyProps()} className={styles['article-table-body']}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>

    )
}