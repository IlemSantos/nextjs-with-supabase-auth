// pages/protected-page.js
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useSessionContext } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function ProtectedPage({ email, customProp }) {
  const { error, session } = useSessionContext();
  const user = session?.user;

  return (
    <>
      <p>
        [<Link href="/">Home</Link>] | [
        <Link href="/profile">withPageAuth</Link>]
      </p>
      <div>Protected content for {email}</div>
      <p>server-side fetched data with RLS:</p>
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