import Logo from "../../../Assets/Dashboard/LogoYellow.svg"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  Building2,
  HeartHandshake,
  LoaderCircle,
} from "lucide-react"
import { useEffect, useState } from "react";
import BrandLogin from "./BrandLogin";
import OrgLogin from "./OrgLogin";

const components = {
  Header() {
    return (
      <div className="w-full flex flex-col gap-8 items-center justify-center pb-10">
        <img src={Logo} className="w-20" alt="Buzzers"/>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl p-2">Event sponsorship, reimagined.</h1>
          <p>Ready to get started?</p>
        </div>
      </div>
    );
  }
};

function Login() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    if (userType) {
      setLoading(true);
    }
  }, [userType]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setDoneLoading(true);
      }, 500);
    }
  }, [loading]);

  return (
    <div className="relative w-screen h-screen ">
      <div className="fixed p-10">
        <a href="/">
          <Button variant="outline">
            <ChevronLeft/>
            Home
          </Button>
        </a>
      </div>
      {!doneLoading ? (
        <>
          <div className="w-full h-full flex items-center justify-center flex-col">
            <div>
              {components.Header()}
            </div>

            <h4 className="pb-5">First, tell us who you are.</h4>
            <div className="flex flex-row gap-2">
              <Button disabled={loading} variant="outline" className="relative hover:bg-primary p-5 w-[10rem] h-[10rem] flex flex-col gap-2" onClick={() => setUserType("Brand")}>
                <Building2/>
                <p>Brand</p>
                {loading && userType == "Brand" &&
                  <LoaderCircle className="spin absolute bottom-4"/>
                }
              </Button>
              <Button disabled={loading} variant="outline" className="relative hover:bg-primary p-5 w-[10rem] h-[10rem] flex flex-col gap-2" onClick={() => setUserType("Organization")}>
                <HeartHandshake/>
                <p>Organization</p>
                {loading && userType == "Organization" &&
                  <LoaderCircle className="spin absolute bottom-4"/>
                }
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full pt-20">
          {userType == "Brand" ? (
            <BrandLogin />
          ) : (
            <OrgLogin />
          )}
        </div>
      )}
    </div>
  )
}

export default Login
