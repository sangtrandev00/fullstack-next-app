
'use client';

import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider} from 'next-auth/react';

import { BuiltInProviderType } from 'next-auth/providers/index';

const Nav = () => {

  const isUserLoggedIn = true;

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {

    const setProvidersHandler = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProvidersHandler()

  }, [])

  // console.log("providers: ", providers);


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image width="30" height="30" src="/assets/images/logo.svg" alt="pomptopia logo" className="object-contain"/>
      </Link>
      <p className="logo_text" onClick={() => console.log("click hello!")}> 
        Promptopia
      </p>
      {/* Desktop Navigateion */}

      <div className="sm:flex hidden">
      {isUserLoggedIn ? 
      (<div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" onClick={() => signOut()} className="outline_btn">Sign Out</button>


              <div className="flex">
                <Image width="37" height="37" src="/assets/images/logo.svg" alt="profile" className="rounded-full" onClick={() => setToggleDropdown((prev) => !prev)}/>
              
                {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
              </div>

      </div>): (
        <>
          {providers && Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button type="button" onClick={() => signIn(provider.id)} className="black_btn" >
                Sign in with
              </button>
            </div>
          ))}
        </>
      )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src={"/assets/images/logo.svg"}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav;
