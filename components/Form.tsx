import { IPost } from '@app/types/Post';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'

interface FormProps {
  type: string;
  post: IPost;
  setPost: Dispatch<SetStateAction<{
    prompt: string;
    tag: string;
}>>;
  submitting: boolean;
  handleSubmit:  (e: React.FormEvent) => void;
}

const Form = (props: FormProps) => {

  console.log("props: ", props);

  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      
      <h1 className="head_text"><span className="blue_gradient">{props.type}</span> Post</h1>
      <p className="desc text-left max-w-md">
        {props.type} and share amazing prompts with the worlds, and let your imagination run wild with any AI-powered platform.
      </p>
      {/* Form submission */}
      <form action="" onSubmit={props.handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>

          <textarea name="" id="" value={props.post.prompt} onChange={(e) => props.setPost({...props.post, prompt: e.target.value})} placeholder="Write your prompt here..." required className="form_textarea">
          </textarea>
        </label>

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">Tag {` `}<span className="font-normal">(#product, #webdevelopment, #idea)</span> </span>

          <input name="" id="" value={props.post.tag} onChange={(e) => props.setPost({...props.post, tag: e.target.value})} placeholder="#tag" required className="form_input"/>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
              Cancel
          </Link>

          <button type="submit" disabled={props.submitting} className="text-sm bg-primary-orange rounded-full text-white py-1.5 px-5">{props.submitting ? `${props.type}...` : props.type}</button>
        </div>

      </form>

    </section>
  )
}

export default Form
