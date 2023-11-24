import { UserAuth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStory } from '@/lib/story';
import { getMyStories, getTodayStory } from '@/lib/db';

export default function Home() {
  const router = useRouter();
  const { user } = UserAuth();
  const { generate, loadding } = useStory();
  const [ stories, setStories ] = useState([]);
  const [ todayStory, setTodayStory ] = useState({});
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (user) {
      getMyStories(user.uid).then((stories) => {
        setStories(stories);
      });
      getTodayStory(user.uid).then((story) => {
        setTodayStory(story);
      });
      setLoading(false);
    }
  }, [ user, router, setStories, setTodayStory ]);

  if (loading) {
    return <div role="status" className='flex justify-center items-center h-[100vh]'>
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    </div>
  }

  return (
    <main>
      {/* header */}
      <div className='sticky z-40 top-0 flex justify-between items-center px-4 py-4 bg-gray-50 border-b-2'>
        <h1 className='font-bold font-sans text-3xl text-center w-full'>Story Loom</h1>

      </div>

      <div className='relative'>
        <Image src="/hero.jpg" fill objectFit="cover" alt="Profile Pic" className='z-10 opacity-30' />
        <div className='flex flex-col justify-center items-center z-20 p-4 bg-gradient-to-b from-gray-950/95 via-gray-900/70 to-gray-900/30'>
          {todayStory?.uid ?
            <>
              <p className="m-3 z-30 text-xl font-bold text-center text-gray-200">Today&apos;s Story</p>
              <h5 className="mb-2 z-30 text-3xl font-bold text-center tracking-tight text-white">{todayStory.title}</h5>
              <p className="mt-4 mb-8 z-30 px-4 text-2xl font-normal text-white text-center ">{todayStory.story[ 0 ]}...</p>
              <Link href={`/story/${todayStory.uid}`} className='text-center z-30 rounded-xl bg-cyan-300 px-4 py-2 text-black text-xl font-bold'>Listen Now</Link>
            </>
            : loadding ?
              <>
                <p className="m-3 z-30 text-xl font-bold text-center text-gray-200">Today&apos;s Story</p>
                <h5 className="mb-2 z-30 text-3xl font-bold text-center tracking-tight text-white">Generating...</h5>
              </>
              :
              <>
                <p className="m-3 z-30 text-xl font-bold text-center text-gray-200">Today&apos;s Story</p>
                <h5 className="mb-2 z-30 text-3xl font-bold text-center tracking-tight text-white">Get a story right now!</h5>
                <button onClick={generate} className='mt-4 text-center z-30 rounded-xl bg-cyan-300 px-4 py-2 text-black text-xl font-bold'>Generate</button>
              </>
          }
        </div>
      </div>

      {/* content */}
      <div className='mt-4 mb-4 p-4'>
        <h2 className='font-bold font-sans text-2xl'>
          Previous Stories
        </h2>
        {
          stories.map((story) => (
            <div key={story.uid} className='mt-4 p-3 border-2 rounded-lg relative'>
              <p className="mb-1 font-xs text-gray-700 ">{story.date}</p>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{story.title}</h5>
              <p className="mb-1 font-normal text-gray-800 ">{story.story[ 0 ]}</p>
              <a href={`/story/${story.uid}`} className="absolute right-6 -bottom-8 justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full border-8 border-white">
                <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
              </a>
            </div>
          ))
        }
      </div>

      <div className='fixed w-full z-30 bottom-0 flex justify-around items-center px-4 py-2 bg-gray-50 border-t-2'>
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
