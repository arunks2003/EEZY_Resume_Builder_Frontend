import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import Header from '@/components/ui/custom/Header'

const SignInPage = () => {
    return (
        <>
            <Header></Header>
            <div className='flex justify-center items-center mt-10'>
                <SignIn></SignIn>
            </div>
        </>
    )
}

export default SignInPage
