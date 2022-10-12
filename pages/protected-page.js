import { withPageAuth } from '@supabase/auth-helpers-nextjs'

export default function ProtectedPage({ user, customProp }) {
    return <div>Protected content</div>
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