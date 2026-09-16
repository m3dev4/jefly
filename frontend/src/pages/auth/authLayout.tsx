import { Outlet, Link } from "react-router-dom";
import { illustAuthJefly, LogoJefly } from "../../assets/images";

const AuthLayout = () => {
  return (
    <main className="min-h-screen w-full bg-white flex overflow-x-hidden">
      {/* Left Form Section */}
      <section className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top Logo */}
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/"
            className="inline-block transition-opacity hover:opacity-85"
          >
            <img
              src={LogoJefly}
              alt="Jëfly"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-6">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="w-full max-w-md mx-auto pt-4 text-center sm:text-left">
          <p className="text-[11px] text-neutral-400">
            © {new Date().getFullYear()} Jëfly. Tous droits réservés.
          </p>
        </div>
      </section>

      {/* Right Illustration Section (Hidden on mobile & tablet) */}
      <section className="hidden lg:flex w-1/2 bg-[#F6F8FA] h-screen sticky top-0 items-center justify-center p-8 xl:p-12 border-l border-[#EFECE6] overflow-hidden select-none">
        <div className="relative flex items-center justify-center max-w-lg w-full">
          <img
            src={illustAuthJefly}
            alt="Jëfly Illustration"
            className="w-full max-h-[75vh] object-contain drop-shadow-sm transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
