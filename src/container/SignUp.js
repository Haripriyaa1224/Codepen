import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FcGoogle} from'react-icons/fc';
import { motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, validatePassword } from "firebase/auth";
import { auth } from "../config/firebase.config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  // email signup firebase setup

 const createNewUser = async ()=>{
  if(getEmailValidationStatus){
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCred)=>{
      if(userCred){
        console.log(userCred)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  }

  // 

  //email login firebase setup

  const loginWithEmailPassword = async ()=>{
    if(getEmailValidationStatus){
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCred)=>{
        if(userCred){
          console.log(userCred)
        }
      })
      .catch((err)=>{
        console.log(err.message)
        if(err.message.includes("invalid-credential")){
          setAlert(true);
          setAlertMsg("Invalid Username or password");
        }
        else if(err.message.includes("missing-password")){
          setAlert(true);
          setAlertMsg("Password Missing");
        }
        else{
          setAlert(true);
          setAlertMsg("Temporarily Blocked due to several failed logins")
        }

        setInterval(()=>{
          setAlert(false);
        }, 4000)
      })
    }
  }

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        className="object-contain w-32 opacity-50 h-auto"
        alt
      ></img>
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join With Us!</p>

        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondry shadow-md flex flex-col items-center justify-center gap-8">
          {/* email */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          {/* password */}
          <UserAuthInput
            label="Password"
            placeHolder="Password"
            isPass={true}
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
          />
          {/* alert section */}
          {alert && (<motion.p className=" text-red-500">{alertMsg}</motion.p>)}
          
          {/* login button */}
          {!isLogin ? (
            <motion.div onClick={createNewUser}
              whileTap={{ scale: 0.9 }}
              className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
            >
              SignUp
            </motion.div>
          ) : (
            <motion.div
              onClick={loginWithEmailPassword} 
              whileTap={{ scale: 0.9 }}
              className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
            >
              LogIn
            </motion.div>
          )}

          {/* Account text section */}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account!{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className=" text-emerald-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't have an account!{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className=" text-emerald-500 cursor-pointer"
              >
                Create Here
              </span>
            </p>
          )}

          {/* or section */}
          <div className="flex items-center justify-center gap-12">
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* sign in with google */}

          <motion.div onClick={signInWithGoogle} className="flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(255,255,255,0.4)] cursor-pointer" whileTap={{scale:0.9}}>
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Signin with Google</p>
          </motion.div>
          {/* or section */}
          <div className=" flex items-center justify-center gap-12">
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>
          {/* sign in with github */}
          <motion.div onClick={signInWithGithub} className="flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(255,255,255,0.4)] cursor-pointer" whileTap={{scale:0.9}}>
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Signin with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
