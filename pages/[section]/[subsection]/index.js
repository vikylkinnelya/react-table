import ArticlesTable from "/components/articles-table"
import MainLayout from "/layout/main-layout"
import CurrentCategoryHeader from '/layout/current-category-layout'
import { useRouter } from "next/router"
import { useInfiniteQuery, dehydrate, QueryClient } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";


export default function SubsectionPage(props) {
    const router = useRouter()

    const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['subSectionArticles', router.query.subsection],

        async ({ pageParam = 1 }) =>
            await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.API_KEY}&fq=subsection_name:("${router.query.subsection}")&offset=0&page=${pageParam}`)
                .then(res => res.json()),
        {
            getNextPageParam: (lastPage, pages) => {
                return pages.length + 1
            }
        }
    )

    return (
        <MainLayout title='Section'>
            <CurrentCategoryHeader
                section={router.query.section[0].toUpperCase() + router.query.section.slice(1)}
                subsection={router.query.subsection[0].toUpperCase() + router.query.subsection.slice(1)}
            />

            {status === 'success' &&
                <InfiniteScroll
                    dataLength={Math.round(data?.pages.length * 10)}
                    next={() => {
                        fetchNextPage();
                        router.push(`/${router.query.section}/${router.query.subsection}/?page=${data?.pages.length + 1}`, undefined, { shallow: true })
                    }}
                    hasMore={hasNextPage}
                    loader={<div>loadinf</div>}
                >
                    <ArticlesTable
                        articles={data.pages} />

                </InfiniteScroll>
            }

        </MainLayout>
    )
}

export async function getServerSideProps({ query, request }) {

    const queryClient = new QueryClient()

    await queryClient.prefetchInfiniteQuery(
        'subSectionArticles',
        async ({ subSection = query.subsection, pageParam = 1 }) =>
            await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.API_KEY}&fq=subsection_name:("${subSection}&offset=0&page=${pageParam}`)
                .then(res => res.json())
    )

    return { props: JSON.parse(JSON.stringify(dehydrate(queryClient))) }
}