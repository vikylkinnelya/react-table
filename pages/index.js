import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../layout/main-layout'
import MainList from '../components/main-list'
import styles from '../styles/Home.module.css'
import CurrentCategoryLayout from '../layout/current-category-layout'
import Categories from '../layout/categories-layout'

export default function Home({ serverArticles }) {

  return (
    <MainLayout>

      <Categories />
      
      <MainList articles={serverArticles} />


    </MainLayout >
  )
}

Home.getInitialProps = async () => {
  let res = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${process.env.API_KEY}`)
  let json = await res.json()
  return { serverArticles: json.results }
}
