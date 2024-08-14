import React from 'react'
import { UserButton } from '@clerk/clerk-react'
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import Header from '@/components/ui/custom/Header'
import { Link } from 'react-router-dom'

const Home = () => {
    const { isSignedIn, user } = useUser();
    const destination = (isSignedIn) ? "/dashboard" : "/auth/sign-in";
    const signUpDest = (isSignedIn) ? "/dashboard" : "https://dashing-mosquito-31.accounts.dev/sign-up";
    return (
        <div>
            <Header></Header>
            <div className="bg-gray-50 min-h-screen flex flex-col">
                {/* Hero Section */}
                <section className="bg-blue-900 text-white flex flex-col items-center justify-center h-screen">
                    <div className="text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to <img
                            alt="Your Company"
                            src='/logo.svg'
                            className="w-auto"
                            style={{ height: '9rem', display: "inline", paddingBottom: "6px" }}
                        /> {" "} Resume Builder</h1>
                        <p className="text-lg md:text-xl mb-6">Create stunning resumes in minutes with our easy-to-use builder.</p>
                        <Link to={destination} className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition">Get Started</Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-12 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
                                <p>My user-friendly interface ensures you can create a professional resume effortlessly.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-3">Dynamic View</h3>
                                <p>The user creating his/her resume can see the change dynamically after making changes.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-semibold mb-3">Download & Share</h3>
                                <p>Export your resume in multiple formats and share it with potential employers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section id="get-started" className="bg-blue-900 text-white py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Resume?</h2>
                        <p className="text-lg mb-6">Start using Eezy Resume Builder today and take your career to the next level.</p>
                        <Link to={signUpDest} className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition">Sign Up Now</Link>
                    </div>
                </section>
            </div>
            <UserButton></UserButton>
        </div >
    )
}

export default Home
