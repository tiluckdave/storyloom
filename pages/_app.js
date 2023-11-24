import '@/styles/globals.css'
import {AuthContextProvider} from '@/lib/auth.js'

// create a story context to make the story available globally 
import { StoryContextProvider } from '@/lib/story';


export default function App({ Component, pageProps }) {
  return <AuthContextProvider>
      <StoryContextProvider>
        <Component {...pageProps} />
      </StoryContextProvider>
    </AuthContextProvider>
}
