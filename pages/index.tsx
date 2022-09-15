import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { User } from '../mocks/handler'

interface HomeProps {
  user: User[];
}

const Home = ({user}:HomeProps) => {
  // ssr
  console.log(user)
  const [users, setUser] = useState<User[] | undefined>()

  const test = async () => {
    const {data} = await axios.get('https://fitpet.health-mock/user')
    setUser(data)
  }

  useEffect(() => {
    // csr
    test()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        users?.map((person) => (
          <div key={person.id}>
            <p>{person.name}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Home

export const getServerSideProps =async() => {
  const {data: user} = await axios.get('https://fitpet.health-mock/user')
  return {
    props: {
      user
    }
  }
}