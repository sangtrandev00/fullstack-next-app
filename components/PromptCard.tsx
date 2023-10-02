'use client'

import React, {useMemo, useState} from 'react'
import Prompt from '@models/prompt';
import { IPost } from '@app/types/Post';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { usePathname, useRouter } from 'next/navigation';
interface PromptCardProps {
  post: IPost;
  handleTagClick?: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}: PromptCardProps) => {
  const {data: session} = useSession();
  const pathName = usePathname();

  useMemo(() => {
    console.log("post: in memo ", post);
  }, [post])

  const [copied, setCopied] = useState('');

  const handleCopy = ()=> {
    setCopied(post.prompt);
    console.log("copy function here")
    navigator.clipboard.writeText(post.prompt).then(() => {
      console.log("copy success");
    }, () => {
      console.log("copy fail");
    }); // Navigator là hàm gì vậy ?
    setTimeout(()=> setCopied(''), 3000);
  } 
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-star gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image width="30" height="30" src={post?.creator?.image as string} alt="post card user image" className="rounded-full object-contain"/>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post?.creator?.username}</h3>
            <p className="font-inter text-sm text-gray-500"></p>
          </div>
        
        </div>


        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} alt="copy icon" width="12" height="12"/>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cusor-pointer" onClick={ handleTagClick}>
        {post.tag}
      </p>
      {session?.user.id === post?.creator?._id && (
        pathName==="/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
                Edit
              </p>
              <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
                Delete
              </p>
          </div>
        )
      )}
    </div>
  )
}

export default PromptCard
