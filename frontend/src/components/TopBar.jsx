import React from 'react'
import logo from "@/assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { IoIosLogIn } from "react-icons/io";
import SearchBox from './SearchBox';
import { routeIndex, routeProfile, routeSignIn } from '@/helper/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from "@/assets/images/user.png"
import { CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getEnv } from '@/helper/getenv';
import { showToast } from '@/helper/showToast';
import { removeUser } from '@/redux/user/user.slice';

const TopBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
        method: "get",
        credentials: "include",
      })
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message)
      }

      dispatch(removeUser())
      navigate(routeIndex)
      showToast("success", data.message)

    } catch (error) {
      showToast("error", error.message)
    }
  }

  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-6 border-b'>
      {/* logo */}
      <div>
        <img src={logo} alt="" width={100} className='mix-blend-multiply' />
      </div>

      {/* search */}
      <div className='w-[500px]'>
        <SearchBox />
      </div>

      {/* sign in */}
      <div>
        {!user.isLoggedIn ?
          <Button asChild className="rounded-full">
            <Link to={routeSignIn}>
              <IoIosLogIn />
              Sign In
            </Link>
          </Button>
          :
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.user?.avatar || "/default-avatar.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user?.user?.name || "Guest"}</p>
                <p className='text-sm'>{user?.user?.email || ""}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={routeProfile}>
                  <CiUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="">
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <CiLogout color='red' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }


      </div>

    </div>
  )
}

export default TopBar