'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs"

// a type pour variant 
type Variant= "LOGIN" | "REGISTER";

const AuthForm = () => {
    //* le type Variant nous permmettra de choisir letat actuel du user
    const [variant, setVariant] = useState<Variant>("LOGIN");
    //* on cree un autre useState pour desactiver les bouton ainsi que notre formulaire
    const [isLoading, setIsLoading]= useState(false);

    //* avec useCallBack On cree maintenant une fonction qui nous permettra de switcher entre LOGIN et REGISTER
    const toggleVariant= useCallback(()=>{
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        }else{
            setVariant("LOGIN");
        }
    },[variant]);

    // ! maintenant on cree le hook pour notre formulaire avec useForm, on ajoutera aussi un type a notre useForm<FieldValues>
    const{
        register,
        handleSubmit,
        formState:{
            errors
        }
    }= useForm<FieldValues>({
        // ?on ajoute les valeur par defaut
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    });

    // ! on cree maintenant laction qui nous permettra de send les donnee grace SubmitHandler
    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        // active le formulaire avec setIsLoading
        setIsLoading(true);

        if (variant === "REGISTER") {
            // Axios register
        }

        if (variant === "LOGIN") {
            // NextAuth SignIn
        }
    };

    // pour les reseaux sociaux login
    const socialAction= (action: string)=>{
         // active le formulaire avec setIsLoading
         setIsLoading(true);

        //  NextAuth Social Signin
    }

    return ( 
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              { variant === "REGISTER" &&(
                  <Input 
                  id="name" 
                  label="Name" 
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  />
              )}

                <Input 
                id="email" 
                label="Email" 
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
                />  
                <Input 
                id="password"
                type="password" 
                label="Password" 
                register={register}
                errors={errors}
                disabled={isLoading}
                />
                <div>
                    <Button
                        disabled={isLoading}
                        fullWidth
                        type="submit"
                    >
                        {variant === 'LOGIN'? 'Sign in': 'Register'}
                    </Button>
                </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="
                    absolute
                    inset-0
                    flex
                    items-center
                    ">
                        <div className="
                            w-full
                            border-t 
                            border-gray-300
                        "/>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or Continue with
                        </span>
                    </div>
                </div>

                {/* social button */}
                <div className="mt-6 flex gap-2">
                    <AuthSocialButton icon={BsGithub} onClick={()=>socialAction('github')}/>
                    <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')}/>
                </div>

                {/* switch */}
                <div className=" flex gap-2 mt-6 justify-center text-sm px-2 text-gray-500">
                    {variant === "LOGIN" ? "New to Messenger?": "Already have a account?"}
                    <div onClick={toggleVariant} 
                    className="
                        cursor-pointer text-gray-800 hover:text-sky-500 hover:underline
                    "
                    >
                        {variant === "LOGIN" ? "Create an account": "Login"}
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default AuthForm;