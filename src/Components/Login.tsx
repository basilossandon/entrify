import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ETypes, MessageCard } from './Atoms/MessageCard'
import { SocialSignIn } from './SocialSignIn'
import logo from '../assets/circular.png'

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [])

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current?.value, passwordRef.current?.value)
      navigate('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }
  return (
    <>
      <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-64 w-auto"
              src={logo}
              alt="Circular Estudios"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"></h2>
          </div>
          <MessageCard message={error} type={ETypes.DANGER} visible={!!error} />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-zinc-600 py-2 px-4 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-zinc-500 group-hover:text-zinc-400"
                    aria-hidden="true"
                  />
                </span>
                Iniciar sesión
              </button>
            </div>
            <div className="text-sm flex justify-between">
              <Link
                className="font-medium text-zinc-600 hover:text-zinc-500"
                to="/forgot-password"
              >
                Olvidaste tu contraseña?
              </Link>
              <Link
                className="font-medium text-zinc-600 hover:text-zinc-500"
                to="/signup"
              >
                Aun no tienes una cuenta?
              </Link>
            </div>
          </form>
          <div>
            <div className="w-full flex justify-center  ">
              <div className="flex flex-grow  border-b-2 border-gray-300 mb-2 mx-2 " />
            </div>
          </div>
          <SocialSignIn setError={setError} enabled={!loading} />
        </div>
      </div>
    </>
  )
}
