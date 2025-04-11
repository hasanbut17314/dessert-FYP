import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { apiService } from '../../lib/axios'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '/Logo.png'

const VerifyEmail = () => {

    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const verifyEmail = async () => {
        setError(null)
        if (!token) {
            setError("Invalid Token !!")
            return
        }
        try {
            setLoading(true)
            const response = await apiService.get(`/user/verify-email/${token}`, { withAuth: false })
            console.log(response)
            toast.success("Email verified successfully!")
            navigate("/login")
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || "An error occurred. Please try again.")
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-semibold mb-5 text-red-500">{error}</h1>
                {error === "User already verified" ? (
                    <Link className='px-5 py-2 border border-pink-500 rounded-lg' to='/login'>Login</Link>
                ) : (
                    <Button onClick={verifyEmail} disabled={loading} variant='outline'>
                        {loading ? <Loader className='animate-spin size-8 text-pink-600' /> : "Retry"}
                    </Button>
                )}
            </div>
        )
    }
    if (loading) {
        return (
            <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
                <Loader className='animate-spin h-16 w-16 text-pink-600' />
                <h1 className="text-xl font-semibold">Verifying...</h1>
                <p className="text-lg">Please wait while we verify your email...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img src={logo} alt="Logo" className="mb-4 h-28" />
            <h1 className="text-3xl font-semibold mb-8 text-center">Welcome! Please verify your email.</h1>
            <Button
                onClick={verifyEmail}
                disabled={loading}
                className="bg-pink-600 text-white font-semibold hover:bg-pink-700"
            >
                Verify Email
            </Button>
        </div>
    )
}

export default VerifyEmail