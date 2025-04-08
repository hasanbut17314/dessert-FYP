import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export default function Profile() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
  return (
    <div className="flex mt-12 flex-col items-center justify-center min-h-1/2 p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            {user ? (
            <div className="space-y-4">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            ) : (
            <p>No user data found.</p>
            )}
            <Button className="mt-4 cursor-pointer" onClick={() => {localStorage.removeItem("user"); navigate("/login")}}>
                Logout
            </Button>
        </div>
    </div>
  )
}
