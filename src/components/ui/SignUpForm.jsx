"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../utils/cn";
import { FiGithub, FiGlobe, FiFacebook, FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "./stateful-button";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up submitted:", formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleInputChange = (field, e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 font-pacifico">
          Join Vistas Today
        </h2>
        <p className="mt-2 max-w-sm text-base text-neutral-600 dark:text-neutral-300 font-source-serif">
          Create your account and start exploring India's authentic village experiences
        </p>
        
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input 
                id="firstname" 
                placeholder="John" 
                type="text" 
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input 
                id="lastname" 
                placeholder="Doe" 
                type="text" 
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e)}
              />
            </LabelInputContainer>
          </div>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              placeholder="john.doe@example.com" 
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e)}
            />
          </LabelInputContainer>
          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
          </LabelInputContainer>
          
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <div className="relative">
              <Input 
                id="confirmpassword" 
                placeholder="••••••••" 
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
          </LabelInputContainer>

          <Button
            onClick={handleSubmit}
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-600 to-green-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit">
Sign Up →
            <BottomGradient />
          </Button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button">
              <FiGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button">
              <FiGlobe className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Google
              </span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button">
              <FiFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Facebook
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-base text-neutral-600 dark:text-neutral-300 font-source-serif">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
