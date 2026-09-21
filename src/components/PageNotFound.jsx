import React from 'react';
import { Link } from 'react-router';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-body-color text-white px-6">

           
            <h1 className="text-8xl md:text-9xl font-extrabold text-transparent  bg-linear-to-r from-cyan-400 to-red-500 bg-clip-text mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                404
            </h1>

          
            <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-center">
                Oops! Page Not Found
            </h2>

         
            <p className="text-slate-400 mb-8 text-center max-w-md text-sm md:text-base">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="px-6 py-3 bg-transparent border-2 border-background-secondary text-background-secondary font-medium rounded-full 
                   hover:bg-background-secondary/70 hover:text-white transition-all duration-300 
                   hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
                Go Back Home
            </Link>

        </div>
    );
};

export default PageNotFound;