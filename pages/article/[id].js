import { Avatar, Button, Card, CardHeader, CardActions, CardContent, Typography, Paper, Skeleton, Tooltip } from '@mui/material';
import datePrettier from "../../functions/datePrettier";
import relativeTime from "../../functions/relativeTime";
import stringAvatar from "../../functions/stringAvatar";
import Image from "next/image";
import Link from 'next/link'
import Router from "next/router"
import styles from '../../styles/Article.module.css'
import CurrentCategoryHeader from "../../layout/current-category-layout";
import MainLayout from "../../layout/main-layout";

export default function ArticlePage({ article }) {

    return (
        <MainLayout title={article.headline.main || article.headline.print_headline}>

            <CurrentCategoryHeader
                section={article.news_desk}
                subsection={article.subsection_name} />

            <Card variant="outlined" className={styles['article-paper']}>

                <hr />
                <CardHeader
                    avatar={
                        <Avatar {...stringAvatar(article.byline)} />
                    }
                    title={
                        <Typography variant="body1" sx={{ fontSize: '20px' }}>
                            {article.headline.print_headline || article.headline.main}
                        </Typography>}
                    subheader={
                        <div className={styles['article-subheader']}>
                            <Typography variant='body5'>
                                {article.byline.original + ' '}
                            </Typography>
                            
                            <Tooltip title={`${datePrettier(article.pub_date)}`} placement="bottom-start">
                                <div>{relativeTime(article.pub_date)}</div>
                            </Tooltip>
                        </div>
                    }
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body1">
                        {article.lead_paragraph + '. '}
                        {article.snippet}
                    </Typography>

                    {article.multimedia[0] &&
                        <Image
                            src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                            alt={article.lead_paragraph}
                            layout='responsive'
                            width={273}
                            height={150}
                            className={styles['article-img']}
                        />
                    }
                </CardContent>
                <CardActions className={styles['article-action']}>
                    <>
                        <Link href={`${article.web_url}`}>
                            <a>
                                Read full article →
                            </a>
                        </Link>


                    </>
                </CardActions>
            </Card>

        </MainLayout >
    )
}

ArticlePage.getInitialProps = async ({ query, request }) => {
    /* if (!request) {
        return { article: null }
    } */
    const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.API_KEY}&fq=_id:("${query.id}")`)
    const json = await res.json()

    if (!json.response.docs[0]) {
        Router.push('/404')
    }

    return { article: json.response.docs[0] }
}