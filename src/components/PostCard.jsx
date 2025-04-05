import React from 'react'
import appwriteService from "../appwrite/config.js"
import {Link} from "react-router-dom"

const PostCard = ({$id,title,featuredImage,createdAt}) => {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/post/${$id}`} className='block group'>
      <div className="bg-[#141517] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className='relative h-48'>
          {featuredImage && (
            <img 
              src={appwriteService.getImageUrl(featuredImage)} 
              alt={title} 
              className='w-full h-full object-cover transition-transform duration-200 group-hover:scale-105'
            />
          )}
        </div>
        <div className='p-6'>
          <div className='text-sm text-[#6366f1] mb-2'>
            {date}
          </div>
          <h2 className='text-xl font-bold text-white mb-4'>
            {title}
          </h2>
          <div className='flex items-center text-sm text-gray-400'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            5 min read
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
