import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { routeSignIn } from '@/helper/RouteName'
import { getEnv } from '@/helper/getenv'
import { showToast } from '@/helper/showToast'
import GoogleLogin from '@/GoogleLogin'


const SignUp = () => {

  const navigate = useNavigate()

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().refine(data => data.password === data.confirmPassword, "Passwords do not match"),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", 
      email: "",
      password: "",
      confirmPassword: "",
    }, 
  })
  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(values)
      })
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message)
      }
      navigate(routeSignIn)
      showToast("success", data.message)
    } catch (error) {
      showToast("error", error.message)
    }
  }


  return (
    <div className="flex justify-center items-center h-screen w-screen">

      <Card className="w-[400px] p-5">
        <h1 className='text-2xl font-bold text-center mb-5'>Create your account</h1>

        <div>
          <GoogleLogin />
          <div className='border my-5 flex justify-center items-center'>
            <span className='absolute bg-white text-sm'>Or</span>
          </div>
        </div>

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
                      <Input placeholder="Enter your Name" {...field} />
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
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password again" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-5'>
              <Button type="submit" className="w-full" >Sign In</Button>

              <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                <p>Already have an account?</p>
                <Link to={routeSignIn} className='text-blue-500 hover:underline'>Sign Up</Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>

    </div>
  )
}

export default SignUp