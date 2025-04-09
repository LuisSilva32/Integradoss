/* eslint-disable no-undef */
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { AuthContext } from '@/context/AuthContext'
import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppSidebar from './Sidebar'

export default function AdminLayout () {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(AuthContext)
  const { userInfo } = state

  useEffect(() => {
    if (!userInfo) {
      navigate('/iniciar-sesion')
    }
  }, [userInfo, navigate])

  const handleLogout = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    navigate('/iniciar-sesion')
  }

  return (
    <SidebarProvider>
      <AppSidebar onLogout={handleLogout} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1 hover:bg-transparent' />
          <p className='text-3xl font-ligth text-gray-600'>Panel administrativo</p>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div>
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
