import { useState, useEffect, useRef } from "react"
import { Loader, LogOut, Menu, ShoppingCart, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useLocation, useNavigate } from "react-router"
import useAuth from "@/hooks/useAuth"
import { apiService } from "../lib/axios"
import { toast } from "sonner"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pollingInterval = useRef(null)
  const { user, isAuthenticated } = useAuth()

  const navas = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const fetchCartCount = async () => {
    if (!isAuthenticated) {
      setCartCount(0)
      return
    }

    try {
      const response = await apiService.get("/cart/getCartCount")
      setCartCount(response.data.data.count)
    } catch (error) {
      console.error("Error fetching cart count:", error)
    }
  }

  useEffect(() => {
    fetchCartCount()
    pollingInterval.current = setInterval(fetchCartCount, 2500)

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await apiService.post("/user/logout", {})
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      toast.success("Logout successful!")
      navigate("/login")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white ">
      <div className="container mx-auto flex min-h-16 p-2 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" aria-label="Toggle Menu">
                <Menu size={30} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8 p-4">
                {navas.map((a) => (
                  <Link key={a.name} to={a.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-medium ${location.pathname === a.href ? "text-[#BA4374]" : "text-black"}`}
                  >
                    {a.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <a href="/" className="flex items-center space-x-2">
            <img src="/Logo.png" alt="Logo" className="md:h-20 h-12" />
          </a>
        </div>

        <nav className="hidden lg:flex gap-6">
          {navas.map((a) => (
            <Link key={a.name} to={a.href}
              className={`text-2xl font-medium ${location.pathname === a.href ? "text-[#BA4374]" : "text-white"}`}
            >
              {a.name}
            </Link>
          ))}
        </nav>

        <div className="flex md:gap-6 gap-3 items-center">
          <div className="relative">
            <Link to="/cart">
              <ShoppingCart size={30} />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-2 bg-[#BA4374] text-white rounded-full text-xs px-2 py-1 font-semibold">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </div>
          <Link to={isAuthenticated ? "/profile" : "/login"} className="flex border border-[#BA4374] p-2 rounded-2xl items-center gap-2">
            <User2 size={26} />
            {isAuthenticated ? (
              <span className="sm:block hidden">{user?.firstName}</span>
            ) : (
              <span className="sm:block hidden">Login</span>
            )}
          </Link>
          {isAuthenticated && (
            <Button variant="ghost" className="border border-[#BA4374] p-2 rounded-2xl" onClick={handleLogout} title="Logout" disabled={loading}>
              <span className="sr-only">Logout</span>
              {loading ? <Loader className="animate-spin w-6 h-6" /> : <LogOut size={35} />}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}