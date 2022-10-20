import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >

      <ChakraProvider>
        <button
          onClick={async () => {
            await supabaseClient.auth.signOut();
            router.push('/');
          }}
        >
          Logout
        </button>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  );
}