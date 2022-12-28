import React from 'react';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading/Loading';
import { Link, useLocation, useNavigate  } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    //Google log in
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
   
  
    //Email log in
    const [signInWithEmailAndPassword, eUser, eLoading, eError] = useSignInWithEmailAndPassword(auth);

    let signInErrors;
    const navigate=useNavigate();
    const location=useLocation();
 
    let { from } = location.state || { from: { pathname: "/" } };

    if (gUser || eUser) {
        navigate(from,{replace:true})
    }



    if ( eLoading || gLoading) {
        return <Loading></Loading>
    }




  if( eError || gError){
    signInErrors  = <p>{eError.message || gError.message}</p>
  }


    const onSubmit = data => {
        console.log(data)
        signInWithEmailAndPassword(data.email, data.password)
    };



    return (
        <div className=' flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Log in</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">

                            <label className="label">
                                <span className="label-text">Email:</span>

                            </label>

                            <input type="email"
                                {...register("email", {
                                    required: {
                                        value: true, message: "Email is Required"
                                    }
                                },
                                    {
                                        pattern: /[A-Za-z]{3}/,
                                        message: "Provide a valid email address"
                                    })}
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs" />

                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                            </label>
                        </div>


                        <div className="form-control w-full max-w-xs">

                            <label className="label">
                                <span className="label-text">Password:</span>

                            </label>

                            <input type="password"
                                {...register("password", {
                                    required: {
                                        value: true, message: "Password is Required"
                                    }
                                },
                                    {
                                        minLength: 6,
                                        message: "Provide a valid password "
                                    })}
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs" />

                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                            </label>
                        </div>
                         {signInErrors}
                        <input className='btn w-full max-w-xs text-whit' type="submit" value="Login" />

                    </form>

                    <p>New to Doctors Portal ? <Link to="/signup" className='text-primary'>Create a NEW ACCOUNT</Link> </p>

                    <div className='divider'>OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className='btn btn-outline'>
                        Continue with Google</button>
                </div>
            </div>
        </div>
    );
};





export default Login;