import { Link } from '@chakra-ui/react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'

export default function ProtectedPage({ user, customProp }) {
  return (
    <>
      <p>
        [<Link href="/">Home</Link>] | [
        <Link href="/profile">withPageAuth</Link>]
      </p>
      <div>Protected content for {user?.email}</div>
      <p>server-side fetched data with RLS:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>{error}</p>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(ctx, supabase) {
    // Access the user object
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return { props: { email: user?.email } }
  },
})