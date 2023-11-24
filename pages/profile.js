import { UserAuth } from '@/lib/auth';
import { addOtherData, getUser } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
    const { user, logOut } = UserAuth();
    const [ curuser, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const [ currentAnimal, setCurrentAnimal ] = useState("");
    const [ currentBehaviour, setCurrentBehaviour ] = useState("");
    const [ behaviours, addBehaviour ] = useState([]);
    const [ animals, addAnimal ] = useState([]);
    const [ age, setAge ] = useState(12);

    const ageHandler = (event) => {
        setAge(event.target.value);
    }

    const addBehaviourHandler = (behaviour) => {
        setCurrentBehaviour("");
        addBehaviour((prevBehaviours) => {
            return [ ...prevBehaviours, behaviour ];
        });
    }

    const removeBehaviourHandler = (behaviour) => {
        addBehaviour((prevBehaviours) => {
            return prevBehaviours.filter((prevBehaviour) => prevBehaviour !== behaviour);
        });
    }

    const addAnimalHandler = (animal) => {
        setCurrentAnimal("");
        addAnimal((prevAnimals) => {
            return [ ...prevAnimals, animal ];
        });
    }

    const removeAnimalHandler = (animal) => {
        addAnimal((prevAnimals) => {
            return prevAnimals.filter((prevAnimal) => prevAnimal !== animal);
        });
    }

    const handleSubmit = () => {
        addOtherData(animals, behaviours, age, curuser.uid);
        toast.success('Saved Successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    useEffect(() => {
        if (!user) {
            setLoading(true);
        } else {
            setUser(user);
            getUser(user.uid).then((data) => {
                if (data) {
                    addAnimal(data.animals);
                    addBehaviour(data.behaviours);
                    setAge(data.age);
                }
            });
            setLoading(false);
        }
        console.log(curuser);
    }, [ user, curuser ]);

    if (loading) {
        return <h1>Loading</h1>
    }


    return (
        <main>
            <ToastContainer />
            {/* header */}
            <div className='sticky z-30 top-0 flex justify-between items-center px-4 py-4 bg-gray-50 border-b-2'>
                <h1 className='font-bold font-sans text-3xl'>Profile</h1>

                <button onClick={logOut} className='outline-none border-none flex gap-4 justify-center items-center bg-gray-200 p-4 rounded-xl'>
                    <p className='text-xl font-bold'>{curuser.displayName}</p>
                    <Image src={curuser.photoURL} width={32} height={32} alt="Profile picture" className='rounded-full' />
                </button>

            </div>

            {/* content */}
            <div className='mt-4 mb-4 p-4'>
                <div className='mt-4 p-3 flex justify-between items-center'>
                    <p className="mb-1 text-xl font-bold text-gray-700 ">Kid&apos;s Age</p>
                    <input type="number" value={age} onChange={ageHandler} className='w-1/2 border-2 rounded-lg p-2' />
                </div>

                <div className='mt-4 p-3'>
                    <p className="mb-1 text-xl font-bold text-gray-700 ">How does your kid behaves these days?</p>
                    <div className='flex flex-wrap gap-4 my-2'>
                        {behaviours.map((behaviour) => (
                            <div key={behaviour} className='flex gap-2 items-center text-xl font-normal text-white bg-gray-700 px-3 py-1.5 rounded-lg'>
                                {behaviour}
                                <button className='border-none outline-none font-mono' onClick={removeBehaviourHandler.bind(null, behaviour)}>X</button>
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-4 items-center mt-4'>
                        <input type="text" className='w-full border-2 rounded-lg p-2' value={currentBehaviour} onChange={(e) => setCurrentBehaviour(e.target.value)} />
                        <button className='border-none outline-none p-2 rounded-lg bg-cyan-300 font-bold text-black' onClick={addBehaviourHandler.bind(null, currentBehaviour)}>Add</button>
                    </div>
                </div>

                <div className='mt-4 p-3'>
                    <p className="mb-1 text-xl font-bold text-gray-700 ">What animals does your kid like?</p>
                    <div className='flex flex-wrap gap-4 my-2'>
                        {animals.map((animal) => (
                            <div key={animal} className='flex gap-2 items-center text-xl font-normal text-white bg-gray-700 px-3 py-1.5 rounded-lg'>
                                {animal}
                                <button className='border-none outline-none font-mono' onClick={removeAnimalHandler.bind(null, animal)}>X</button>
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-4 items-center mt-4'>
                        <input type="text" className='w-full border-2 rounded-lg p-2' value={currentAnimal} onChange={(e) => setCurrentAnimal(e.target.value)} />
                        <button className='border-none outline-none p-2 rounded-lg bg-cyan-300 font-bold text-black' onClick={addAnimalHandler.bind(null, currentAnimal)}>Add</button>
                    </div>
                </div>

                <div className='w-full flex justify-center items-center mt-12'>
                    <button className='bg-cyan-300 text-black text-2xl font-bold py-3 px-6 rounded-xl' onClick={handleSubmit}>Save</button>
                </div>
            </div>



            <div className='fixed w-full z-30 bottom-0 flex justify-around items-center px-4 py-2 bg-gray-50 border-t-2'>
                <Link href="/" className='bg-gray-50 w-1/4 rounded-full p-2 flex justify-center items-center'>
                    <Image src="/house.svg" width={32} height={32} alt="Profile Pic" />
                </Link>
                <Link href="/profile" className='bg-gray-200 w-1/4 rounded-full p-2 flex justify-center items-center'>
                    <Image src="/profile.svg" width={28} height={28} alt="Profile Pic" />
                </Link>
            </div>
        </main>
    );
}
