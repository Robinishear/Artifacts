import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthConrext/AuthCotext';
import LocationGoogle from '../../Shared/LocationGoogle';
import { NavLink } from 'react-router';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleEmailPasswordUserRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);

    createUser(email, password)
      .then((result) => {
        console.log('User created:', result.user);
        form.reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 relative overflow-hidden">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/Nnnv7hG2/black-brick-wall-surface-texture.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Bottom Glow Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent blur-sm z-10" />

      <form
        onSubmit={handleEmailPasswordUserRegistration}
        className="relative z-20 w-[320px] max-w-full bg-white/10 backdrop-blur-md rounded-xl border border-lime-400 shadow-[0_0_30px_#84cc16] p-8 flex flex-col gap-6"
      >
        <h1 className="text-lime-300 text-2xl font-extrabold text-center drop-shadow-[0_0_6px_#84cc16]">
          Register
        </h1>

        {/* First Name */}
        <label className="relative block">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="w-full rounded-full bg-white/20 placeholder-white/70 text-white py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <i className="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none"></i>
        </label>

        {/* Last Name */}
        <label className="relative block">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="w-full rounded-full bg-white/20 placeholder-white/70 text-white py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <i className="fas fa-user-tag absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none"></i>
        </label>

        {/* Email */}
        <label className="relative block">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-full bg-white/20 placeholder-white/70 text-white py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <i className="fas fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none"></i>
        </label>

        {/* Password */}
        <label className="relative block">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-full bg-white/20 placeholder-white/70 text-white py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <i className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none"></i>
        </label>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
        )}

        {/* Remember me and Forgot password */}
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

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-full py-3 transition-colors shadow-[0_0_10px_#84cc16]"
        >
          Register
        </button>

        {/* Switch to login */}
        <p className="text-white text-center text-sm">
          Already have an account?{' '}
          <NavLink to='/Login' className="font-bold underline hover:text-lime-400">
            Login
          </NavLink>
        </p>

      
      </form>
    </div>
  );
};

export default Register;
