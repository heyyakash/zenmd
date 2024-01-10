
import Login from "@/components/auth/Login"
import SignUp from "@/components/auth/SignUp"
import { ModeToggle } from "@/components/ui/Toggle"
import { Button } from "@/components/ui/button"
import { useState } from "react"



const Auth = () => {
    const [mode,setMode] = useState<'Login'|'Sign Up'>("Sign Up")
    const changeMode = async () => {
        if( mode==="Login"){
            setMode("Sign Up")
        } else{
            setMode("Login")
        }
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-1  h-screen w-full">
            <div className="w-full h-full hidden xl:block dark:bg-white/10 bg-black/5 "></div>
            <div className="w-full h-full relative grid place-items-center ">
                <div className="absolute top-5 right-5 flex gap-3">
                    <Button onClick={()=>changeMode()} className="text-semibold" variant={"outline"}>{mode}</Button>
                    <ModeToggle />
                </div>
                {mode==="Sign Up"?<Login />:<SignUp />}
            </div>
        </div>
    )

}

export default Auth