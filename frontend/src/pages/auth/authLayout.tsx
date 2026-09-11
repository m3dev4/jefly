import { Outlet } from 'react-router-dom';
import { illustAuthJefly, LogoJefly } from '../../assets/images';

const AuthLayout = () => {
  return (
    <main className="min-h-screen min-w-screen overflow-hidden">
      <div className="flex items-center justify-between m-auto p-auto w-full h-screen">
        <section className="h-full w-1/2 flex items-start justify-start flex-col relative">
          <div>
            <img
              src={LogoJefly}
              alt=""
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="mt-4 w-full">
            <Outlet />
          </div>
        </section>
        <section className="w-1/2">
          <img src={illustAuthJefly} alt="" />
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
