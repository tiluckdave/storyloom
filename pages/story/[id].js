import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react';
import { getStory } from '@/lib/db';

export default function Story() {
    const router = useRouter();
    const { id } = router.query

    const [ story, setStory ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const [ audio, setAudio ] = useState(null);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ percentage, setPercentage ] = useState(0);
    const [ duration, setDuration ] = useState(0);



    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setPercentage(parseInt((currentTime / audio.duration) * 100));
    }

    const playPauseAudio = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    useEffect(() => {
        if (id) {
            getStory(id).then((story) => {
                setStory(story);
            });
            setAudio(new Audio(story.audio))
        }
    }, [ id, story.audio ]);

    useEffect(() => {
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            setLoading(false);
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            }
        }
    }, [ handleTimeUpdate, audio ]);


    if (loading) {
        return <div role="status" className='flex justify-center items-center h-[100vh]'>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>
    }

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
                <div>
                    {/* {story && <audio id='audio' ref={audioRef} controls src={story.audio} className='hidden' onTimeUpdate={handleTimeUpdate} />} */}
                </div>
            </div>

            <div className='px-12 pt-8 bg-white'>
                {story && story?.story?.map((line, index) => (
                    <p key={index} className='pb-4 text-2xl font-normal text-gray-800'>
                        {line}
                    </p>
                ))}
            </div>

            <div className="bg-gray-50 sticky bottom-0 z-30 border-t-2">
                <div className={`bg-cyan-500 h-2`} style={{ width: percentage + "%" }}></div>
                <div className='px-4 py-2 flex justify-between items-center'>
                    <div className='flex gap-4'>
                        <p className='text-2xl font-bold text-gray-950'>0{parseInt(currentTime / 60)}:{('0' + parseInt(currentTime % 60)).slice(-2)}</p>
                        <p className='text-2xl font-bold text-gray-950'>/</p>
                        <p className='text-2xl font-bold text-gray-700'>0{parseInt(duration / 60)}:{('0' + parseInt(duration % 60)).slice(-2)}</p>
                    </div>
                    <button className="justify-center items-center p-3 text-sm font-medium text-center text-white bg-cyan-300 rounded-full outline-none border-none" onClick={playPauseAudio}>
                        {audio.paused ? (
                            <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="pause"><path fill="#000" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"></path></svg>
                        )}
                    </button>
                </div>
            </div>
        </main>
    );
}
