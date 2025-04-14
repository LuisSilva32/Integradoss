import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { IoIosAlert } from 'react-icons/io'

const Input = React.forwardRef(({ className, type, error, icon: Icon, label, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className='relative'>
      {label && (
        <label className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        {Icon && (
          <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600' />
        )}
        <input
          type={inputType}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border flex h-9 w-full min-w-0 rounded-none border-gray-400 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            Icon ? 'pl-10' : 'pl-3',
            error ? 'border-red-500' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <IoIosAlert className='h-5 w-5 text-red-500' />
          </div>
        )}
      </div>
      {error && (
        <p className='text-xs text-red-500'>{error}</p>
      )}
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 focus:outline-none hover:cursor-pointer'
          aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
        >
          {showPassword
            ? (
              <FaEyeSlash className='h-4 w-4' />
              )
            : (
              <FaEye className='h-4 w-4' />
              )}
        </button>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
