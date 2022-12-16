import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';
import Section from '../components/Section';
import CTA from '../components/CTA';
import Comments from '../components/Comments';
import Ourservices from '../components/Ourservices';
import Navbar from '../components/Navbar';

const graphcms = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbnnstcx1fvf01uoe1fvdg0p/master')

  const QUERY =
    gql`{
      posts {
        id
        title
        slug
        excerpt
        coverImage {
          url
        }
      }
    }
    `
export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Navbar />
      <Hero />
      <Section />
      <Ourservices />
      <div className={styles.cardContainer}>

        {posts.map((post) => (
          <BlogCard 
              key={post.id} 
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              coverImage={post.coverImage}/>
        ))}
              </div>
              <CTA />

        <Comments />
      </main>

      </div>
  )
}

