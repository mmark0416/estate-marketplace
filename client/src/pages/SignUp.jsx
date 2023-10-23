import { Link } from "react-router-dom";

export default function SingUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          className="border p-3 rounded-lg"
          id="username"
          type="text"
          placeholder="username"
        />
        <input
          className="border p-3 rounded-lg"
          id="email"
          type="text"
          placeholder="email"
        />
        <input
          className="border p-3 rounded-lg"
          id="password"
          type="text"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={'/sign-in'} className="text-blue-700">Sign in</Link>
      </div>
    </div>
  );
}
