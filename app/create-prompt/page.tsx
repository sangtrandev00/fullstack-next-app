'use client';

import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Form from '@components/Form';
import { Router } from 'next/router';

const CreatePrompt = () => {
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const [post, setPost] = useState({
          prompt: '',
          tag: ''
    });

    const createPromptHandler = async (e: React.FormEvent) => {
          e.preventDefault();
          console.log("submitted");
          setSubmitting(true);

          try {
            
            const response = await fetch('/api/prompt/new', {
              method: 'POST',
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
   <Form type="Create" post={post} setPost={setPost} submitting = {submitting} handleSubmit = {createPromptHandler} />
  )
}

export default CreatePrompt;
