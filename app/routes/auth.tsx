import { Outlet } from '@remix-run/react'
import BackgrounDraw from '@assets/images/backgrounds/auth-background.jpeg'

export default function AuthLayout() {
  return (
    <div className="relative w-full py-10 flex items-center justify-center overflow-y-auto">
      <div className='relative z-10 bg-white p-10 shadow-sm rounded-3xl border border-zinc-50'>
        <Outlet />
      </div>
      <div style={{ background: `url('${BackgrounDraw}')` }} className='w-full h-full absolute top-0 left-0 opacity-[0.04]'></div>
    </div>
  )
}