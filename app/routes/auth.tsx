import { Outlet, redirect } from '@remix-run/react'
import BackgrounDraw from '@assets/images/backgrounds/auth-background.jpeg'
import { verifyJWT } from '@utils/auth.server';
import { tokenCookie } from '@utils/cookie';
import { JwtPayload } from 'jsonwebtoken';
import { LoaderFunction } from '@remix-run/node';

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

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Redirect if user is already logged in
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    const user = token && verifyJWT(token) as JwtPayload
    if (user) { return redirect("/") }

    return null
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};
