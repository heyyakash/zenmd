var host = process.env.NEXT_PUBLIC_BACKEND_HOST
export const getDocs = async () => {
    const token = localStorage.getItem("token")
    const data = await fetch(`${host}/docs`,{
        headers:{
            "token":token as string
        }
    })
    
    return await data.json()
}

export const getDocById = async (id:string) => {
    console.log(id)
    const token = localStorage.getItem("token")
    const data = await fetch(`${host}/docs/${id}`,{
        headers:{
            "token":token as string
        }
    })

    return await data.json()
}