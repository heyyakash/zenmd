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
    const token = localStorage.getItem("token")
    const data = await fetch(`${host}/docs/${id}`,{
        headers:{
            "token":token as string
        }
    })

    return await data.json()
}

export const updateDocById = async (id:string, value:string) => {
    const token = localStorage.getItem("token")
    const data = await fetch(`${host}/docs/${id}`,{
        method:"PATCH",
        headers:{
            "token":token as string
        },
        body:JSON.stringify({data:value})
    })
    return await data.json()
}

export const addCollaborator = async (id:string, email:string, permission:string) => {
    const token = localStorage.getItem("token")
    const data = await fetch(`${host}/docs/collab`,{
        method:"POST",
        headers:{
            "token":token as string
        },
        body:JSON.stringify({id, email,permission})
    })
    return await data.json()
}
