import { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { ETypes, MessageCard } from './Atoms/MessageCard'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import logo from '../assets/circular.png'

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null)
  const { resetPassword } = useAuth()
  const [messageType, setMessageType] = useState<ETypes>(ETypes.DANGER)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      setMessage('')
      setLoading(true)
      await resetPassword(emailRef.current?.value)
      setMessageType(ETypes.SUCCESS)
      setMessage('Check your inbox for further instructions')
    } catch {
      setMessageType(ETypes.DANGER)
      setMessage('Failed to reset password')
    }

    setLoading(false)
  }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-64 w-auto"
              src={logo}
              alt="Circular Estudios"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Password Reset
            </h2>
          </div>
          <MessageCard
            title={messageType == ETypes.SUCCESS ? 'Success' : 'Error'}
            message={message}
            type={messageType}
            visible={!!message}
          />
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
                Registrarme
              </button>
            </div>
            <div className="text-sm text-center">
              <Link
                className="font-medium text-zinc-600 hover:text-zinc-500"
                to="/login"
              >
                Volver
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
