import React from 'react'
import logo from "@/assets/images/logo.png"
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { IoIosLogIn } from "react-icons/io";
import SearchBox from './SearchBox';
import { routeSignIn } from '@/helper/RouteName';
import { useSelector } from 'react-redux';
import userIcon from "@/assets/images/user.png"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TopBar = () => {
  const user = useSelector(state => state.user)
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
                <AvatarImage src={user.user.avatar || userIcon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }


      </div>

    </div>
  )
}

export default TopBar