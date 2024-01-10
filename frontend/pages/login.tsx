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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <div className="grid grid-cols-2 grid-rows-1 h-screen w-full">
            <div className="w-full h-full bg-black/90"></div>
            <div className="w-full h-full grid place-items-center bg-black">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[450px] ">
                        <div className="my-6">
                            <h3 className="text-white text-4xl font-bold text-center">Create an account</h3>
                            <p className="text-white/50 text-lg font-semibold text-center mt-3">Enter your email and password to sign up</p>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Email</FormLabel>
                                    <FormControl>
                                        <Input className="input-primary h-[40px] text-[1rem]" type = "email" placeholder="johndoe@gmail.com" {...field} />
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
                                    <FormLabel className="text-white">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="input-primary h-[40px] text-[1rem]" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size = {"lg"} variant={"secondary"} className="mt-4 text-lg w-full">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )

}

export default Login