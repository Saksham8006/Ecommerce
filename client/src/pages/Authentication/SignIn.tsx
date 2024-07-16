import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailvalue, setEmailvalue] = useState<Boolean>(false);
  const [passwordvalue, setPasswordvalue] = useState<Boolean>(false);
  const [error, setError] = useState<String>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(emailvalue, passwordvalue);

    // Validation checks for email and password
    if (!email) {
      setEmailvalue(true);
      setError('Enter Email Id');
      console.log('email error');
      return;
    } else if (!password) {
      setPasswordvalue(true);
      setError('Enter Your password');
      return;
    } else if (password.length < 8) {
      setPasswordvalue(true);
      setError('Password should be more than 8 digit');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/login`, data);

      // console.log('response', response.data.user);

      if (response.status === 200) {
        setEmail('');
        setPassword('');
        toast.success('User Logged in Successfully!');
        navigate('/');
        localStorage.setItem('authorization', response.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        toast.error(error.response.data.message)
      } else
        if (error.response.status == 401) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        } else if (error.response.status == 422) {
          console.log(error.response.data.details[0].message);
          toast.error(error.response.data.details[0].message);
        } else {
          console.error('Unhandled error status:', error.response.status);
        }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailvalue(false);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordvalue(false);
  };

  return (
    <div className="flex bg-white min-h-screen">


      <main className="w-full max-w-[575px] mx-auto pt-[110px]">
        <div className="mt-[80px] bg-white shadow-sm ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-[32px] font-[900] text-black">
                Welcome to Ecommerce
              </h1>
              <p className="mt-2 text-sm text-gray-600 font-semibold">
                Login to manage your account.
              </p>
            </div>
            <div className="mt-[50px]">
              {/* Form */}
              <form onSubmit={handleLogin}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[15px] mb-2 text-black font-[500]"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="email@site.com"
                        className={`py-3 px-4 block w-full border ${emailvalue ? 'border-red-500' : 'border-slate-300'
                          } rounded-lg text-sm  `}
                        aria-describedby="email-error"
                      />
                      {emailvalue ? (
                        <p className="text-red-500 text-[14px]">{error}</p>
                      ) : (
                        ''
                      )}
                      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                          className="h-5 w-5 text-red-500"
                          width={16}
                          height={16}
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  {/* End Form Group */}
                  {/* Form Group */}
                  <div className="my-[15px]">
                    <div className="flex justify-between">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-[15px] mb-2 text-black font-[500]"
                        >
                          Password
                        </label>
                      </div>

                    </div>
                    <div className="relative">
                      <input
                        type={isPasswordShow ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="8+ characters required"
                        className={`py-3 px-4 block w-full border ${passwordvalue ? 'border-red-500' : 'border-slate-300'
                          } rounded-lg text-sm  `}
                        aria-describedby="password-error"
                      />
                      {passwordvalue ? (
                        <p className="text-red-500 text-[14px]">{error}</p>
                      ) : (
                        ''
                      )}

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                        onClick={() => setIsPasswordShow(!isPasswordShow)}
                      >
                        {isPasswordShow ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="password-error"
                    >
                      8+ characters required
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg
                      bg-black uppercase text-white hover:shadow-sm"
                  >
                    Log in
                  </button>
                </div>
              </form>
              {/* End Form */}

              <p className="text-black font-[500] text-center my-[18px]">
                Not registered?{' '}
                <Link to="/auth/signup">
                  <span className="text-sky-500">Create account</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
