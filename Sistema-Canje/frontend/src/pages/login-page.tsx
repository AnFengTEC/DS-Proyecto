import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/auth-context';

function LoginPage() {
    type FormData = {
        username: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const {signIn, isAuthenticated, errors: loginErrors = []} = useAuth();
    const navigate = useNavigate();
    
    const onSubmit = handleSubmit(async (data : FormData) => {
        const { username, password } = data;
        const userData = {
            username,
            password
        }
        await signIn(userData);
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
    <div className="flex h-screen items-center justify-center">
        <div className="bg-zinc-900 max-w-md w-full p-10 rounded-md">
            {loginErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white" key={i}>
                            {error}
                        </div>
                    ))}
            <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
            
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    {...register("username", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username"
                />
                {errors.username && (
                    <p className="text-red-500">Username is required</p>
                )}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Password"
                />
                {errors.password && (
                    <p className="text-red-500">Password is required</p>
                )}

                <button
                    type="submit"
                    className="bg-white text-black px-4 py-2 rounded-md my-2"
                >
                    Login
                </button>
            </form>

            <p className="flex gap-x-2 justify-between text-white">
                Registrar una cuenta <Link to="/register" className="text-sky-500">Register</Link>
            </p>

        </div>
    </div>
    );
}

export default LoginPage