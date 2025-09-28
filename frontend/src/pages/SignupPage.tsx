import { Link } from 'react-router-dom';

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <header className="lg:hidden bg-gray-900 rounded-b-md p-3">
        <p className="text-white font-bold text-2xl transform scale-y-90 text-center">
          finance
        </p>
      </header>
      <div className="hidden lg:flex justify-center items-center relative">
        <img
          className="rounded-2xl max-h-screen w-full p-2"
          src="/images/illustration-authentication.svg"
          alt="An animated person in beige hat, white long sleeve shirt, and blue pants running toward a large money shaped piece of paper."
        />
        <div className="absolute left-8 top-6">
          <p className="text-white font-bold text-2xl transform scale-y-90">
            finance
          </p>
        </div>
        <div className="absolute bottom-14 px-12">
          <p className="text-white text-2xl font-bold mt-2">
            Keep track of you money <br />
            and save for your future
          </p>
          <p className="text-white text-xs mt-2">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to servings pots easily.
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center p-6">
        <form className="bg-white rounded-xl flex flex-col w-full md:max-w-[60%] lg:min-w-[70%] p-6">
          <p className="text-3xl font-bold mb-8">Sign Up</p>
          <label
            className="text-sm font-bold text-gray-500 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="border-1 px-2 py-1 rounded-md mb-4"
            id="name"
            type="text"
            required
          />
          <label
            className="text-sm font-bold text-gray-500 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-1 px-2 py-1 rounded-md mb-4"
            id="email"
            type="email"
            required
          />
          <label
            className="text-sm font-bold text-gray-500 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-1 px-2 py-1 rounded-md"
            id="password"
            type="password"
            required
          />
          <button className="bg-gray-900 mt-8 text-white py-2 rounded-md">
            Create Account
          </button>
          <p className="text-xs font-bold text-gray-500 text-center mt-4">
            Already have an account?{' '}
            <Link
              className="underline text-xs font-bold text-gray-500"
              to={'/'}
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
