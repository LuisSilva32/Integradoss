import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import {
  FaBookOpen,
  FaFile,
  FaFolder,
  FaRightFromBracket,
  FaUser
} from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'

export default function AppSidebar ({ onLogout }) {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    {
      title: 'Convocatorias',
      icon: FaFile,
      url: '/admin/convocatorias',
      isActive: currentPath === '/admin/convocatorias' || currentPath === '/admin'
    },
    {
      title: 'Proyectos',
      icon: FaFolder,
      url: '/admin/proyectos',
      isActive: currentPath === '/admin/proyectos'
    },
    {
      title: 'Publicaciones',
      icon: FaBookOpen,
      url: '/admin/publicaciones',
      isActive: currentPath === '/admin/publicaciones'
    },
    {
      title: 'Investigadores',
      icon: FaUser,
      url: '/admin/investigadores',
      isActive: currentPath === '/admin/investigadores'
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader className='p-4 bg-green-600 text-white border-b border-white/70'>
        <div className='flex items-center justify-center gap-2'>
          <img src='https://res.cloudinary.com/integradoss/image/upload/v1744656520/logo_aprkhx.png' alt='Logo' className='h-6 w-6' />
          <h2 className='text-2xl font-light tracking-[0.1em]'>INTEGRADOSS</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className='flex-1 p-0 bg-green-600 text-white'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className='px-0'>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className='px-0'>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={`
                      relative w-full py-4 px-4 mb-1 text-sm font-normal
                      hover:bg-withe/20 hover:text-white hover:font-medium
                      data-[active=true]:bg-white/20 data-[active=true]:text-white data-[active=true]:font-medium
                      rounded-none
                    `}
                  >
                    <a href={item.url} className='flex items-center gap-3'>
                      <item.icon className='h-8 w-8' />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='bg-green-600 border-t border-white/70'>
        <SidebarMenu className='px-0'>
          <SidebarMenuItem className='px-0'>
            <SidebarMenuButton
              asChild
              className='relative w-full py-4 px-4 mb-1 text-sm font-normal hover:bg-withe/20 hover:text-white hover:font-medium hover:cursor-pointer rounded-none'
              onClick={onLogout}
            >
              <button className='flex items-center gap-3 w-full text-white'>
                <FaRightFromBracket className='h-5 w-5' />
                <span>Cerrar sesión</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
