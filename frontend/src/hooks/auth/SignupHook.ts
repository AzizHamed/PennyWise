import { useState } from "react"

const SignupHook = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [status, setStatus] = useState<number | null>(null)

    const signup = async ({ signupData }: { signupData: { name: string; email: string; password: string; budget: number } }) => {
        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch("https://pennywise-backend-00zw.onrender.com/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(signupData)
            })

            setStatus(res.status)

            const result = res.headers.get("content-type")?.includes("application/json")
                ? await res.json()
                : null

            if (!res.ok) {
                throw new Error(result?.message || "Signup failed")
            }

            setData(result)
            return result
        } catch (err) {
            const message = err instanceof Error ? err.message : "Signup failed"
            setError(new Error(message))
            setData(null)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { signup, isLoading, data, error, status }
}

export default SignupHook