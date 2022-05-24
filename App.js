import { useTable } from 'react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {

  const fetchData = async () => {
    const res = await fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/7/facebook.json?api-key=zdavz3FRgvOMSBoCSgmLnr6VXK1MPo0W')
    return res.json()
  }

  const [data, setData] = useState(useMemo(() => [], []))
  const [loading, setLoading] = useState(false)

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
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
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

      {loading && svg}
      {data && !loading && <table {...getTableProps()}>
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
      }
    </div>
  );
}

export default App;

let svg = <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', marginTop: '100px', background: 'none', display: 'block', shapeRendering: 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#93dbe9" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360, 50 50"></animateTransform>
  </circle>
  <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#689cc5" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
  </circle> </svg>