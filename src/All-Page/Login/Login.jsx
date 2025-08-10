import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthConrext/AuthCotext';
import LocationGoogle from '../../Shared/LocationGoogle';
import { NavLink } from 'react-router';

const Login = () => {
  const { loginUsers } = useContext(AuthContext);

  const handleeEmailPasswordUserLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    loginUsers(email, password)
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
      <img
        src="https://i.ibb.co/jZ4Gx3xZ/blue-brick-wall-surface-texture.jpg"
        alt="Blue brick wall background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent blur-sm z-10" />

      <form
        onSubmit={handleeEmailPasswordUserLogin}
        aria-label="Login form"
        className="relative z-20 w-[320px] max-w-full bg-white/10 backdrop-blur-md rounded-xl border border-lime-400 shadow-[0_0_30px_#84cc16] p-8 flex flex-col gap-6"
      >
        <h1 className="text-lime-300 text-2xl font-extrabold text-center drop-shadow-[0_0_6px_#84cc16]">
          Login
        </h1>

        {/* Email input */}
        <label className="relative block">
          <input
            aria-label="email"
            type="text"
            name="email"
            placeholder="Email"
            className="w-full rounded-full bg-white/20 placeholder-white/70 text-white py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <i className="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none"></i>
        </label>

        {/* Password input */}
        <label className="relative block">
          <input
            aria-label="Password"
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-full bg-white/20 placeholder-white/70 text-white py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <i className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none"></i>
        </label>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-white text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/50 bg-white/20 accent-lime-400"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-white underline hover:text-lime-400 focus:outline-none"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full py-3 transition-colors shadow-[0_0_10px_#84cc16]"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-white text-center text-sm">
          Don&apos;t have an account?{' '}
          <NavLink to='/Register' className="font-bold underline hover:text-lime-400">
            Register
          </NavLink>
        </p>

        {/* Optional location info */}
        <LocationGoogle />
      </form>
    </div>
  );
};

export default Login;
