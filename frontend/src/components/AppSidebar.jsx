import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from "@/assets/images/logo.png"
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";




const AppSidebar = () => {
  return (
    <Sidebar>

      <SidebarHeader className="bg-white">
        <img src={logo} alt="" width={100} />
      </SidebarHeader>

      <SidebarContent className="bg-white">

        <SidebarGroup>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoHomeOutline />
                <Link to="/" >Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <BiCategoryAlt />
                <Link to="/" >Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <GrBlog />
                <Link to="/" >Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaRegComments />
                <Link to="/" >Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <LuUser />
                <Link to="/" >Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaRegCircle />
                <Link to="/" >Category item</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  )
}

export default AppSidebar