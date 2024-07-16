import React, { useState } from 'react';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  // true or false status for validation 
  const [fname, setFname] = useState<Boolean>(false);
  const [lname, setLname] = useState<Boolean>(false);
  const [eml, setEml] = useState<Boolean>(false);
  const [pass, setPass] = useState<Boolean>(false);
  const [passDigit, setPassDigit] = useState<Boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = {
        firstName,
        lastName,
        email,
      
        password,
      };

      // Validation checks 

      if (!firstName) {
        setFname(true);

        return;
      } else if (!lastName) {
        setLname(true);

        return;
      } else if (!email) {
        setEml(true);
        return;
      }  else if (!password) {
        setPass(true);
        return;
      } else if (password.length < 8) {
        setPassDigit(true);
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/register`,
        data,
      );

      console.log('Response', response.status);

      if (response.status === 200) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');


        toast.success('User Registered Successfully');

        setTimeout(() => {
          navigate('/auth/signin');
        }, 2000)
       
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('An error occurred:', err);

        if (err.response && err.response.data) {
          const responseData = err.response.data;

          if (err.response.status === 400) {
            toast.error(responseData.message);
          } else
            if (
              err.response.status === 400 &&
              responseData.details &&
              responseData.details.length > 0
            ) {
              const errorMessage = responseData.details[0].message;
              console.log('Error message:', errorMessage);
              toast.error(errorMessage);
            } else {
              console.error('Unhandled error status:', err.response.status);
            }
        } else {
          console.error('Error response or data not found in error object.');
        }
      }
    }
  };

  return (
    <div className="flex bg-white min-h-screen">


      <Toaster />
      {/* form content */}

      <main className=" mx-auto ">
        <div className="mt-[80px] bg-white shadow-sm ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-[32px] font-[900] text-black">
                Welcome to Ecommerce
              </h1>
              <p className="mt-2 text-sm text-gray-600 font-semibold">
                Fill out the form to get started.
              </p>
            </div>
            <div className="mt-5">
              {/* Form */}
              <form className="mt-[50px]" onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div className="flex gap-x-[12px]">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-[15px] mb-2 text-black font-[500]"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="first_name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setFname(false);
                          }}
                          name="first_name"
                          placeholder="First Name"
                          className={`py-3 px-4 block w-full border ${fname ? 'border-red-500' : 'border-slate-300'
                            }  rounded-lg text-sm  `}
                          aria-describedby="firstname-error"
                        />
                        {fname ? (
                          <p className="text-red-500 text-[14px]">
                            Enter First Name
                          </p>
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
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[15px] mb-2 text-black font-[500]"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="last_name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            setLname(false);
                          }}
                          name="last_name"
                          placeholder="Last Name"
                          className={`py-3 px-4 block w-full border ${lname ? 'border-red-500' : 'border-slate-300'
                            } rounded-lg text-sm  `}
                          aria-describedby="lastname-error"
                        />
                        {lname ? (
                          <p className="text-red-500 text-[14px]">
                            Enter Last Name
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
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
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEml(false);
                        }}
                        name="email"
                        placeholder="email@site.com"
                        className={`py-3 px-4 block w-full border ${eml ? 'border-red-500' : 'border-slate-300'
                          } rounded-lg text-sm  `}
                        aria-describedby="email-error"
                      />

                      {eml ? (
                        <p className="text-red-500 text-[14px]">
                          Enter Email Id
                        </p>
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
                 
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-[15px] mb-2 text-black font-[500]"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPass(false);
                          setPassDigit(false);
                        }}
                        name="password"
                        placeholder="8+ characters "
                        className={`py-3 px-4 block w-full border ${pass ? 'border-red-500' : 'border-slate-300'
                          } rounded-lg text-sm  `}
                        aria-describedby="password-error"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {pass ? (
                        <p className="text-red-500 text-[14px]">
                          Enter password
                        </p>
                      ) : (
                        ''
                      )}

                      {passDigit ? (
                        <p className="text-red-500 text-[14px]">
                          Password should be more than 8 digit
                        </p>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>

                  {/* End Form Group */}
                  {/* Checkbox */}
                  <div className="flex items-start">
                    <div className="flex ">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 border-gray-200 rounded text-blue-600 pointer-events-none mt-3"
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="remember-me" className="text-sm ">
                        By submitting this form I have read and acknowledged the{' '}
                        <br />
                        <span className="underline text-sky-500 font-semibold">
                          Privacy Policy
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* End Checkbox */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg  bg-black uppercase text-white hover:shadow-sm"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              {/* End Form */}

              <p className="text-black font-[500] text-center py-[12px]">
                Already have an account?
                <Link to="/auth/signin">
                  <span className="text-sky-500 ml-2 underline font-semibold">
                    Sign in
                  </span>
                </Link>{' '}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
