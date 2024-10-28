import { Link } from '@remix-run/react'
import { ChevronRight, LogOut } from 'lucide-react'
import { profileNavigation } from '~/data'

const ProfilePage = () => {
  return (
    <div className="w-full lg:hidden">
      <div className="w-full pb-5">
        <h2 className="text-lg font-semibold mb-2">Hesabım & Yardım</h2>
        <ul className="space-y-2">
          {profileNavigation.map((item, index) => (
            <Link to={item.href as string} key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <item.icon className="size-5" />
                <span className="ml-3">{item.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </ul>
      </div>

      <div className="py-3 border-t">
        <a href='/api/logout' className="w-full text-left text-red-600 font-medium flex items-center">
          <LogOut className="w-5 h-5 mr-3" />
          Çıkış Yap
        </a>
      </div>
    </div>
  )
}

export default ProfilePage