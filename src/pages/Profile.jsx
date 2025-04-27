import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { apiService } from "@/lib/axios"
import { toast } from "sonner"
import { Loader2, User, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { useNavigate } from "react-router"
import { format } from "date-fns"
import useAuth from "@/hooks/useAuth"

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true })
      toast.error("You need to log in to access this page")
      return
    }

    fetchProfile()
  }, [isAuthenticated, navigate])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await apiService.get("/user/profile")
      setProfile(response?.data?.data)
      setProfileForm({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateProfileForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!profileForm.firstName.trim()) {
      newErrors.firstName = "First name is required"
      valid = false
    }

    if (!profileForm.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const validatePasswordForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required"
      valid = false
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required"
      valid = false
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
      valid = false
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    if (!validateProfileForm()) {
      return
    }

    try {
      setUpdating(true)
      const response = await apiService.put("/user/update", {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
      })

      if (profile) {
        setProfile({
          ...profile,
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
        })
      }

      const updatedUser = response?.data?.data || null
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setUpdating(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()

    if (!validatePasswordForm()) {
      return
    }

    try {
      setChangingPassword(true)
      await apiService.put("/user/updatePassword", {
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmNewPassword: passwordForm.confirmPassword,
      })

      // Reset form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast.success("Password changed successfully")
    } catch (error) {
      console.error("Error changing password:", error)

      // Handle specific error for incorrect current password
      if (error.response?.data?.message === "Current password is incorrect") {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Current password is incorrect",
        }))
      } else {
        toast.error("Failed to change password")
      }
    } finally {
      setChangingPassword(false)
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#BA4374]" />
        <p className="mt-4">Loading profile...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <Card className="bg-zinc-900 border-zinc-800 text-white md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-[#BA4374]" />
                </div>
                <h2 className="text-xl font-semibold">
                  {profile?.firstName} {profile?.lastName}
                </h2>
                <p className="text-zinc-400">{profile?.email}</p>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Role</span>
                  <Badge
                    variant="outline"
                    className={
                      profile?.role === "admin" ? "border-[#BA4374] text-[#BA4374]" : "border-zinc-500 text-zinc-400"
                    }
                  >
                    {profile?.role === "admin" ? "Administrator" : "User"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Status</span>
                  <div className="flex items-center gap-1">
                    {profile?.isVerified ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-yellow-500">Unverified</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Member Since</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span>{profile?.createdAt ? formatDate(profile.createdAt) : "N/A"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Edit Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900 text-white">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-[#BA4374] text-white"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-[#BA4374] text-white"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription className="text-zinc-400">Update your personal details here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={updateProfile} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                            className={`bg-zinc-800 border-zinc-700 text-white ${errors.firstName ? "border-red-500" : ""
                              }`}
                          />
                          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                            className={`bg-zinc-800 border-zinc-700 text-white ${errors.lastName ? "border-red-500" : ""
                              }`}
                          />
                          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={profile?.email || ""}
                          disabled
                          className="bg-zinc-800 border-zinc-700 text-white opacity-70"
                        />
                        <p className="text-xs text-zinc-500">Email cannot be changed</p>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      onClick={updateProfile}
                      className="bg-[#BA4374] hover:bg-[#a03964] text-white"
                      disabled={updating}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={changePassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className={`bg-zinc-800 border-zinc-700 text-white ${errors.currentPassword ? "border-red-500" : ""
                            }`}
                        />
                        {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className={`bg-zinc-800 border-zinc-700 text-white ${errors.newPassword ? "border-red-500" : ""
                            }`}
                        />
                        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className={`bg-zinc-800 border-zinc-700 text-white ${errors.confirmPassword ? "border-red-500" : ""
                            }`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      onClick={changePassword}
                      className="bg-[#BA4374] hover:bg-[#a03964] text-white"
                      disabled={changingPassword}
                    >
                      {changingPassword ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
