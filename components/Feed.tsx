'use client';

import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard';
import { IPost } from '@app/types/Post';

const PromptCardList = ({data, handleTagClick}: {data: Array<IPost>, handleTagClick: () => void}) => {
  return (
    <div className="mt-16 prompt_layout">

      {data.map((post) => {
        return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      })}

    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<IPost[]>();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
  }

  useEffect(() => {

      const fetchPosts = async() => {

        try {
          const response = await fetch('/api/prompt');
          const data = await response.json();

          console.log('data posts: ', data);
          setPosts(data);
        } catch (error) {
          console.log("error: ", error);
        }          

      }

      fetchPosts();

  }, [])

  return (
    <section className="feed">
        
      <form action="" className="revlative w-full flex-center">
          <input type="text" name="" id="" placeholder='Search for a tag or username' value={searchText} onChange={handleSearchChange} className="search_input peer" />

        <PromptCardList data={posts || []} handleTagClick={() => {}} />

      </form>

    </section>
  )
}

export default Feed
