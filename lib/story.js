// create a story context to make the story available globally 
import { UserAuth } from '@/lib/auth';
import { useContext, createContext, useState } from "react";
import { createMyStory } from './db';

const StoryContext = createContext();

export const StoryContextProvider = ({ children }) => {
    const [ story, setStory ] = useState({});
    const [ loadding, setLoading ] = useState(false);
    const { user } = UserAuth();
    const userid = user?.uid;

    const generate = async () => {
        setLoading(true);
        const response = await fetch('https://storyloom-tiluckdave.replit.app/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "userid": userid })
        });
        const data = await response.json();
        createMyStory(data, userid);
        setStory(data);
        setLoading(false);
    };

    return (
        <StoryContext.Provider value={{ story, generate, loadding }}>
            {children}
        </StoryContext.Provider>
    );
}

export const useStory = () => {
    return useContext(StoryContext);
};