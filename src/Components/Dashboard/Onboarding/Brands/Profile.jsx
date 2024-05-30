import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import { useState, useEffect, useRef } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAuth } from "../../Auth/AuthContext";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import PageOneForm from "./PageOneForm";
import PageTwoForm from "./PageTwoForm";
import PageThreeForm from "./PageThreeForm";

const BrandProfile = ({ setSignedUp }) => {
  const [page, setPage] = useState(1);
  const [repName, setRepName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [formData, setFormData] = useState({});
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const { userAttributes, loadingAttributes, fetchAttributes } = useAuth();
  const hasUnsavedChanges = useRef(false);

  useEffect(() => {
    if (!loadingAttributes && Object.keys(userAttributes).length !== 0) {
      setRepName(userAttributes["custom:first_name"]);
      setBrandName(userAttributes["custom:brand_name"]);
    }
  }, [userAttributes]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchAttributes();
    }
  }, [authStatus, loadingAttributes]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges.current) {
        e.preventDefault();
        e.returnValue = ''; // Display the confirmation dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const initialValues = {
    brandPersonality: [],
    adjectives: [],
    category: "",
    ageRange: [],
    region: "",
    segmentAdjectives: [],
    eventTypes: [],
    desiredOrganizers: [],
    products: []
  };

  const handleFormSubmit = async (values) => {
    setFormData(values);
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-salt">
      <div className="fixed pl-4 pt-10 sm:px-10">
        <a href="/">
          <Button className="bg-salt" variant="outline">
            <ChevronLeft />
            Home
          </Button>
        </a>
      </div>

      {page === 1 && (
        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <img src={Logo} className="w-20" alt="Buzzers" />
          <div className="flex flex-col items-center text-center pb-10">
            <h1 className="font-bold text-2xl p-2">Nice to meet you, {repName}.</h1>
            <p>Let&apos;s make a profile for brands to learn about <span className="font-bold">{brandName}</span>!</p>
          </div>

          <PageOneForm
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        </div>
      )}

      {page === 2 && (
        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <img src={Logo} className="w-20" alt="Buzzers" />
          <div className="flex flex-col items-center text-center pb-10">
            <h1 className="font-bold text-2xl p-2">{brandName}&apos;s profile is almost ready.</h1>
            <p>Tell us who you want to reach with custom segments.</p>
          </div>

          <PageTwoForm
            initialValues={formData}
            onSubmit={handleFormSubmit}
            hasUnsavedChanges={hasUnsavedChanges}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
          />
        </div>
      )}

      {page === 3 && (
        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <img src={Logo} className="w-20" alt="Buzzers" />
          <div className="flex flex-col items-center text-center pb-10 max-w-[34rem]">
            <h1 className="font-bold text-2xl p-2">Final steps...</h1>
            <p className="pb-4">Now tell us more about your deployment structure and marketing goals.</p>
            <p>You may create <span className="font-bold">multiple agreement structures </span>and select your preference for a given event at the time of deployment. Buzzers will ensure the organizer understands your marketing preferences before the event.</p>
          </div>

          <PageThreeForm
            initialValues={formData}
            onSubmit={handleFormSubmit}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        </div>
      )}
    </div>
  );
};

export default BrandProfile;
