'use client';

import Form from '@components/Form';
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'
import { IPost } from '@app/types/Post';
const UpdatePrompt = () => {

    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const search = useSearchParams();
    useEffect(() => {

        const fetchPost = async () => {

            try {
                const response = await fetch(`/api/prompt/${search.get('id')}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.log("error: ", error);
            }

        }

        fetchPost();

    }, [search])


    const updatePromptHandler = async (e: React.FormEvent) => {
            e.preventDefault();

            console.log("submitted: ", post);

            setSubmitting(true);

            try {
            
                const response = await fetch(`/api/prompt/${search.get('id')}`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                  }),
                })
    
                if(response.ok) {
                  router.push('/');
                }
    
              } catch (error) {
                
                console.log("error: ", error);
    
              } finally {
                setSubmitting(false);
              }
    }

  return (
    <Form type="Update" post={post} setPost={setPost} submitting = {submitting} handleSubmit = {updatePromptHandler} />

  )
}

export default UpdatePrompt
