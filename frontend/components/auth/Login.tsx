import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Length of email address should be greater than 2"
    }),
    password: z.string().min(2).max(50)
})


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[90%] md:w-[450px]">
                <div className="my-6">
                    <h3 className=" text-4xl font-bold text-center">Login</h3>
                    <p className="text-lg  text-center mt-3">Enter your email and password to Login</p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='mt-4'>
                            <FormLabel className="">Email</FormLabel>
                            <FormControl>
                                <Input className="input-primary h-[40px] text-[1rem]" type="email" placeholder="johndoe@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <FormLabel className="">Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="input-primary h-[40px] text-[1rem]" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size={"lg"} className="mt-6 text-lg w-full" variant={"default"}>Sign up</Button>
            </form>
        </Form>
    )
}

export default Login