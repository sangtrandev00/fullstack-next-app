'use client'

import React, {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
const DeletePrompt = () => {

    const search = useSearchParams();
    const id = search.get('id');
    const router = useRouter();

    useEffect(() => {
        const deletePrompt = async () => {
                
                try {
                    const response = await fetch(`/api/prompt/${id}`, {
                        method: 'DELETE'
                    });
    
                    if(response.ok) {
                        router.push('/');
                    }
    
                } catch (error) {
                    console.log("error: ", error);
                }
        }

        deletePrompt();
    })

  return (
    <div>
      
      <h1>Delete Prompt</h1>

    </div>
  )
}

export default DeletePrompt
