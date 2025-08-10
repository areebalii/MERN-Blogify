import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { showToast } from '@/helper/showToast'
import { getEnv } from '@/helper/getenv'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { setUser } from '@/redux/user/user.slice'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone'



const Profile = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  const user = useSelector(state => state.user);
  const userId = user?.user?._id;

  const { data: userData, loading, error } = useFetch(
    userId ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${userId}` : null,
    { method: "GET", credentials: "include" },
    [userId]
  );

  const dispatch = useDispatch()
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 characters long"),
    password: z.string()
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  })

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio
      })
    }
  }, [userData])



  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`, {
        method: "put",
        credentials: "include",
        body: JSON.stringify(values)
      })
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message)
      }
      // dispatch(setUser(data.user))
      // showToast("success", data.message)
    } catch (error) {
      showToast("error", error.message)
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setFilePreview(preview)
  }

  if (loading) return <Loading />

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10 mb-2">
          <div className="relative w-28 h-28 group">

            <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="relative w-28 h-28 group cursor-pointer">
                  <input {...getInputProps()} />
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={filePreview ? filePreview : userData?.user?.avatar}
                      className="w-full h-full object-cover rounded-full border-4 border-purple-500 shadow-lg"
                    />
                  </Avatar>

                  <div className="absolute inset-0 flex items-center justify-center 
                      bg-black/40 rounded-full opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300">
                    <IoCameraOutline className="text-purple-400 text-2xl" />
                  </div>
                </div>
              )}
            </Dropzone>

          </div>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" >Save Changes</Button>
            </form>
          </Form>
        </div>
      </CardContent>

    </Card>
  )
}

export default Profile  