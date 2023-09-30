
'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {useState, useEffect} from 'react';

import {signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

const Nav = () => {

  const isUserLoggedIn = true;

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {

    const setProvidersHandler = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProvidersHandler()

  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image width="30" height="30" src="/assets/images/logo.svg" alt="pomptopia logo" className="object-contain"/>
      </Link>
      <p className="logo_text">
        Promptopia
      </p>
      {/* Mobile Navigateion */}

      <div className="sm:flex hidden">
      {isUserLoggedIn ? 
      (<div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" onClick={() => signOut()} className="outline_btn">Sign Out</button>

          <Link href="profile">
            <Image width="30" height="30" src="/assets/images/logo.svg" alt="profile"/>
          </Link>
      </div>): (
        <div>

        </div>
      )}
      </div>
    </nav>
  )
}

export default Nav;
