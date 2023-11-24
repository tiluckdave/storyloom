import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { UserAuth } from '@/lib/auth';
import { useStory } from '@/lib/story';

export default function Story() {
    const { story } = useStory();
    console.log(story);

    return (
        <main className='bg-gray-50'>
            {/* header */}
            <div className='flex justify-between items-center px-4 py-4'>
                <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow" width="48" height="48"><g data-name="Layer 2"><path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" data-name="arrow-ios-back"></path></g></svg>
                </Link>
            </div>

            <div className='mx-16 rounded-lg h-48 relative'>
                <Image src="https://picsum.photos/200/300" fill alt="Profile Pic" className='rounded-xl shadow-lg' />
            </div>

            <div className='bg-gray-50 sticky top-0 z-30 p-4 pb-8'>
                <h1 className='mt-3 text-3xl font-bold text-center'>
                    {story.title}
                </h1>
            </div>

            <div className='px-12 pt-8 bg-white'>
                {story?.story.map((line, index) => (
                    <p key={index} className='pb-4 text-2xl font-normal text-gray-800'>
                        {line}
                    </p>
                ))}
            </div>

            <div className="bg-gray-50 sticky bottom-0 z-30 border-t-2">
                <div class="bg-cyan-500 h-2 w-[23%]"></div>
                <div className='px-4 py-2 flex justify-between items-center'>
                    <div className='flex gap-4'>
                        <p className='text-2xl font-bold text-gray-950'>00:48</p>
                        <p className='text-2xl font-bold text-gray-950'>/</p>
                        <p className='text-2xl font-bold text-gray-700'>03:20</p>
                    </div>
                    <div class="justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full">
                        <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
                    </div>
                </div>
            </div>
        </main>
    );
}
