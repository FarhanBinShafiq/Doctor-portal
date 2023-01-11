import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Navbar = () => {

    const logout = () => {
        signOut(auth);
      };
      

   
    //signout state
    const [user] = useAuthState(auth);

    const menuItems =
        <>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/appointments'>Appointment</Link></li>
            <li><Link to='/reviews'>Reviews</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li>{user ? <button onClick={logout} className='btn btn-ghost'>Sign Out</button> : <Link to='/login'>Login</Link>}</li>
        </>
    return (
        <div>
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                               {menuItems}
                        </ul>
                    </div>
                    <a class="btn btn-ghost normal-case text-xl">Doctors Portal</a>
                </div>
                <div class="navbar-cente  hidden lg:flex">
                    <ul class="menu menu-horizontal  bg-base-100   rounded-box">
                         {menuItems}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;