import signIn from '@/lib/actions/authentication/signin'
import SignInForm from '../_PageSections/signin-form'

export default function Login() {
    return (
        <div className="bg-background w-full h-screen flex items-center justify-center px-4">
            <SignInForm onSubmitAction={signIn}></SignInForm>
        </div>
    )
}
