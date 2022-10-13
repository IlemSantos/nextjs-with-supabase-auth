import { Flex, Heading, Link } from '@chakra-ui/react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const { isLoading, session, error, supabaseClient } = useSessionContext()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
        <Flex minHeight="100vh" alignItems="center" justifyContent="center">
          <Flex direction="column" background="gray.100" p={12} rounded={6}>
            <Heading mb={4}>Acme Industries</Heading>
            <Auth
              redirectTo="http://localhost:3000/profile"
              supabaseClient={supabaseClient}
              appearance={{
                theme: ThemeSupa, variables: {
                  default: {
                    radii: {
                      borderRadiusButton: '50vh',
                      inputBorderRadius: '50vh'
                    }
                  }
                }
              }}
              providers={['google', 'github']}
              socialLayout='vertical'
            />
          </Flex>
        </Flex>
      </>
    )

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>
        [<Link href="/profile">withPageAuth</Link>] | [
        <Link href="/protected-page">supabaseServerClient</Link>] |{' '}
      </p>
      {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}