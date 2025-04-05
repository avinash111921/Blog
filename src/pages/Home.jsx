import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config.js"
import Container from '../components/container/Container.jsx'
import PostCard from '../components/PostCard.jsx'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if(posts.length === 0){
    return (
      <div className='py-8'>
        <Container>
          <div className='flex justify-center'>
            <h1 className='text-2xl font-bold hover:text-gray-500'>
               No Post available
            </h1>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className='py-8'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
