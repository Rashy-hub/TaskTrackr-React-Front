import { useNavigate } from 'react-router-dom'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authLoginSchema } from '../validators/authValidator'
import FormInput from '../components/TodoInput'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const LoginPage = () => {
    const navigate = useNavigate()
    const methods = useForm({ resolver: yupResolver(authLoginSchema) })
    const { loginAsync, islogin, loginerror, isAuthenticated } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
    } = methods

    useEffect(() => {
        console.log('Login Page isAuthenticated value is : ' + isAuthenticated)
        if (isAuthenticated) navigate('/todos')
    }, [isAuthenticated, navigate])

    const onSubmit = async (formData) => {
        console.log('LOGING IN')

        navigate('/todos') // s'execute avant que login n'as tout fini , et c'est embettant
        try {
            console.log('LOGGING IN...')
            await loginAsync(formData) // Attend la fin de la mutation
            navigate('/todos') // Navigue uniquement après le succès
        } catch (error) {
            console.error('Login failed:', error.message)
        }
    }

    if (islogin) return <Loader />
    if (loginerror) {
        navigate(`/error/${loginerror.message}`)
    }

    return (
        <>
            <div className="body-bg">
                {' '}
                <Header title="TaskTrackr | Login" />
                <Main>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4  text-neutral-900">Login</h2>

                            <FormInput label="E-mail" name="email" register={methods.register} errors={errors} placeholder="Enter your email" />
                            <FormInput
                                label="Password"
                                name="password"
                                register={methods.register}
                                errors={errors}
                                placeholder="Enter your password"
                            />

                            <button type="submit" className="w-full bg-blue-500 text-neutral-100 py-2 rounded hover:bg-blue-600 transition">
                                Login
                            </button>
                        </form>
                    </FormProvider>
                </Main>
            </div>
        </>
    )
}

export default LoginPage
