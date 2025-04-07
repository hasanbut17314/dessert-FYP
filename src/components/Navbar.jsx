import { useState, useContext } from "react"
import { Menu, ShoppingCart, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link,useLocation } from "react-router"
import { UserContext } from "@/contexts/UserContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user } = useContext(UserContext)
  // const [ authenticated, setAuthenticated ] = useState(false);
  // console.log(location.pathname);
  console.log(user ? user.name : "No user found in local storage");

  const navas = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white ">
      <div className="container flex min-h-16 p-2 w-full items-center justify-between">
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

          <div className="flex gap-6 items-center">
          <Link to="/cart">
              <ShoppingCart size={30} />
          </Link>
          <Link to={user ? "/profile" : "/login"} className="flex border border-[#BA4374] p-2 rounded-2xl items-center gap-2">
              <User2 size={26} />
              <span>{user ? user.name : "Login"}</span>
          </Link>
          </div>
      </div>
    </header>
  )
}
