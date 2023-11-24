import { UserAuth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStory } from '@/lib/story';

export default function Home() {
  const router = useRouter();
  const { user } = UserAuth();
  const { story, generate, loading } = useStory();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [ user, router ]);

  return (
    <main>
      {/* header */}
      <div className='sticky z-40 top-0 flex justify-between items-center px-4 py-4 bg-gray-50 border-b-2'>
        <h1 className='font-bold font-sans text-3xl text-center w-full'>Story Loom</h1>

      </div>

      <div className='relative'>
        <Image src="/hero.jpg" fill objectFit="cover" alt="Profile Pic" className='z-10 opacity-30' />
        <div className='flex flex-col justify-center items-center z-20 p-4 bg-gradient-to-b from-gray-950/95 via-gray-900/70 to-gray-900/30'>
          {loading ?
            <>
              <p class="m-3 z-30 text-xl font-bold text-center text-gray-200">Today&apos;s Story</p>
              <h5 class="mb-2 z-30 text-3xl font-bold text-center tracking-tight text-white">Generating...</h5>
            </>
          : story?.story ?
          <>
            <p class="m-3 z-30 text-xl font-bold text-center text-gray-200">Today&apos;s Story</p>
            <h5 class="mb-2 z-30 text-3xl font-bold text-center tracking-tight text-white">{story.title}</h5>
            <p class="mt-4 mb-8 z-30 px-4 text-2xl font-normal text-white text-center ">{story.story[0]}...</p>
            <Link href="/story" className='text-center z-30 rounded-xl bg-cyan-300 px-4 py-2 text-black text-xl font-bold'>Listen Now</Link>
          </>
          :
          <>
            <p class="m-3 z-30 text-xl font-bold text-center text-gray-200">Today&apos;s Story</p>
            <h5 class="mb-2 z-30 text-3xl font-bold text-center tracking-tight text-white">Get a story right now!</h5>
            <button onClick={generate} className='text-center z-30 rounded-xl bg-cyan-300 px-4 py-2 text-black text-xl font-bold'>Generate</button>
            </>
          }
        </div>
      </div>

      {/* content */}
      <div className='mt-4 mb-4 p-4'>
        <h2 className='font-bold font-sans text-2xl'>
          Previous Stories
        </h2>
        <div className='mt-4 p-3 border-2 rounded-lg relative'>
          <p class="mb-1 font-xs text-gray-700 ">23rd November 2023</p>
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">The crows and the cobra</h5>
          <p class="mb-1 font-normal text-gray-800 ">Even a very powerful enemy can be destroyed through deceit</p>
          <a href="#" class="absolute right-6 -bottom-8 justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full border-8 border-white">
            <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
          </a>
        </div>
        <div className='mt-8 p-3 border-2 rounded-lg relative'>
          <p class="mb-1 font-xs text-gray-700 ">22nd November 2023</p>
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">Fighting Goats and the Jackal</h5>
          <p class="mb-1 font-normal text-gray-800 ">Do not close your eyes to the impending danger due to greed</p>
          <a href="#" class="absolute right-6 -bottom-8 justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full border-8 border-white">
            <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
          </a>
        </div>
        <div className='mt-8 p-3 border-2 rounded-lg relative'>
          <p class="mb-1 font-xs text-gray-700 ">21st November 2023</p>
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">The Foolish Sage</h5>
          <p class="mb-1 font-normal text-gray-800 ">Do not be taken in by the sweet words of a swindler</p>
          <a href="#" class="absolute right-6 -bottom-8 justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full border-8 border-white">
            <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
          </a>
        </div>
        <div className='mt-8 p-3 border-2 rounded-lg relative'>
          <p class="mb-1 font-xs text-gray-700 ">21st November 2023</p>
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">The Foolish Sage</h5>
          <p class="mb-1 font-normal text-gray-800 ">Do not be taken in by the sweet words of a swindler</p>
          <a href="#" class="absolute right-6 -bottom-8 justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full border-8 border-white">
            <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
          </a>
        </div>
      </div>

      <div className='sticky z-30 bottom-0 flex justify-around items-center px-4 py-2 bg-gray-50 border-t-2'>
        <Link href="/" className='bg-gray-200 w-1/4 rounded-full p-2 flex justify-center items-center'>
          <Image src="/house.svg" width={32} height={32} alt="Profile Pic" />
        </Link>
        <Link href="/profile" className='bg-gray-50 w-1/4 rounded-full p-2 flex justify-center items-center'>
          <Image src="/profile.svg" width={28} height={28} alt="Profile Pic" />
        </Link>
      </div>
    </main>
  );
}
