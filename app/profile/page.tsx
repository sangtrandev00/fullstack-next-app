'use client'
import React, {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { IPost } from '@app/types/Post';

const ProfilePage = () => {

    const {data: session, status} = useSession(); // Trên client cũng sử dụng được Session hay sao ?
    const [posts, setPosts] = useState<IPost[]>();
    const router = useRouter();

    useEffect(() => {

        const fetchPosts = async() => {
  
          try {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
  
            console.log('data post: ', data);
            setPosts(data);
          } catch (error) {
            console.log("error: ", error);
          }          
  
        }
  
        fetchPosts();
  
    }, [session?.user.id])

    const handleEdit = (post: IPost) => {

        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post: IPost) => {

        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {
            router.push(`/delete-prompt?id=${post._id}`)
        }else {
        }


    }

  return (
    <Profile name="My" desc="Welcome to your personlized profile page" data={posts || []} handleEdit={handleEdit} handleDelete={handleDelete} />
  )
}

export default ProfilePage
