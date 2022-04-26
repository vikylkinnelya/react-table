import { useTable } from 'react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {

  const fetchData = async () => {
    const res = await fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/7/facebook.json?api-key=zdavz3FRgvOMSBoCSgmLnr6VXK1MPo0W')
    return res.json()
  }

  const [data, setData] = useState(useMemo(() => [], []))

  const getData = useCallback(() => {
    fetchData()
      .then(res => res.results)
      .then(res => {
        let tempData = []
        res.forEach(el => {
          let dataObj = {
            published_date: el.published_date,
            section: el.section,
            title: el.title,
            url: el.url,
            des_facet: el.des_facet,
            media: el.media[0] ? el.media[0]['media-metadata'][0]?.url : ''
          }
          tempData.push(dataObj)
        })
        setData(tempData)
      })
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const columns = useMemo(
    () => [
      {
        Header: 'The New York Times most shared articles',
        columns: [
      {
        Header: 'Published date',
        accessor: 'published_date', // accessor is the "key" in the data
      },
      {
        Header: '',
        id: 'media',
        accessor: d => (
          <img src={d.media} alt={d.title.slice(0, 20) + '...'} />
        )
      },
      {
        Header: 'Article title',
        id: 'title',
        accessor: d => <a href={d.url}>{d.title}</a>
      },
      {
        Header: 'Section',
        accessor: 'section'
      },
      {
        Header: 'Keywords',
        id: 'des_facet',
        accessor: d => d.des_facet.map((el, i) => <div key={i}>{el}</div>)
      }
    ]
      }
    ]
    ,
    []
  )

  const tableInstance = useTable({ columns, data })

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = tableInstance

  return (
    <div className="App">
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(col => (
                    <th {...col.getHeaderProps()}>
                      {col.render('Header')}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>

        <tbody {...getTableBodyProps()}>
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

    </div>
  );
}

export default App;
