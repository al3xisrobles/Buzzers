import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAuth } from "../../Auth/AuthContext"
// import {
//   Instagram,
// } from "lucide-react";
// import Facebook from "../../../../Assets/Icons/facebook.svg";
// import LinkedIn from "../../../../Assets/Icons/linkedin.svg";

function ConfirmationPage() {
  const [orgName, setOrgName] = useState('');
  const { signOut } = useAuthenticator((context) => [context.user]);
  const { userAttributes } = useAuth();

  useEffect(() => {
    setOrgName(userAttributes['custom:org_name']);
  }, [userAttributes]);

  return (
    <div className='bg-salt relative w-screen h-screen'>
      <div className="max-w-[35rem] px-2 mx-auto h-full flex items-center justify-center flex-col gap-8">
        <img src={Logo} className="w-20" alt="Buzzers" />
        <div className='flex flex-col items-center text-center'>
          {orgName === '' ? (
            <h1 className="font-bold text-3xl p-2">Welcome to Buzzers!</h1>
          ) : (
            <h1 className="font-bold text-3xl p-2">Welcome to Buzzers, {orgName}!</h1>
          )}
          <p>Thanks for joining early - we will let you know when we launch this August, and get your organization sponsored first.</p>
          <h3 className="pt-4 font-bold">Have friends in other organizations?</h3>
          <p>Refer them to Buzzers before we launch and get paid when they secure their first sponsorship!</p>
        </div>
        <a href="/" className="w-3/4">
          <Button className="shadow-input w-full">
            Go Home
          </Button>
        </a>
      </div>

      <div className="left-0 right-0 mx-auto w-max flex flex-col gap-2 absolute bottom-10">
        <Button variant="ghost" onClick={signOut}>
          Log out
        </Button>
      </div>
      {/* <div className="left-0 right-0 mx-auto w-max flex flex-col gap-2 absolute bottom-10">
        <p>Let&apos;s be friends!</p>
        <div className="flex flex-row justify-center gap-2">
          <a href="https://www.instagram.com/">
            <Instagram />
          </a>
          <a href="https://www.linkedin.com/">
            <img src={LinkedIn} alt="LinkedIn" className="h-6 rounded-[0.1rem]"/>
          </a>
          <a href="https://www.facebook.com/">
            <img src={Facebook} alt="Facebook" className="h-6 rounded-[0.1rem]"/>
          </a>
        </div>
      </div> */}
    </div>
  )
}

export default ConfirmationPage
