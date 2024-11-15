import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import { useState, useEffect, useRef } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAuth } from "../../Auth/AuthContext";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitToAPI } from "../../../../AWS/api";
import { createBrandSubmission } from "../../../../AWS/graphql/mutations";

import PageOneForm from "./PageOneForm";
import PageTwoForm from "./PageTwoForm";
import PageThreeForm from "./PageThreeForm";
import toast from "react-hot-toast";

const BrandProfile = ({ setSignedUp }) => {
  const [page, setPage] = useState(1);
  const [repName, setRepName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [formData, setFormData] = useState({});
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const { userAttributes, loadingAttributes, fetchAttributes } = useAuth();
  const hasUnsavedChanges = useRef(false);
  const { user } = useAuthenticator((context) => [context.user]);

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

  const handleNextPage = (values) => {
    setFormData(values);
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (values) => {
    console.log("GOT BACK:", values);

    // Turn agreement structures into list of strings
    const agreementStructures = [];

    // Find the highest structure number
    const keys = Object.keys(values);
    const structureNumbers = new Set();
    keys.forEach(key => {
      const match = key.match(/\d+$/);
      if (match) {
        structureNumbers.add(parseInt(match[0]));
        console.log("Match:", match[0]);
      } else {
        console.log("No match:", key);
      }
    });

    // Remove keys and create dictionaries
    structureNumbers.forEach(num => {
      const structure = {
        [`name${num}`]: values[`name${num}`],
        [`additionalInstructions${num}`]: values[`additionalInstructions${num}`],
        [`distributionInstructions${num}`]: values[`distributionInstructions${num}`],
        [`impressions${num}`]: values[`impressions${num}`],
        [`productQuantity${num}`]: values[`productQuantity${num}`],
      };

      agreementStructures.push(JSON.stringify(structure));

      // Remove keys from values
      delete values[`name${num}`];
      delete values[`additionalInstructions${num}`];
      delete values[`distributionInstructions${num}`];
      delete values[`impressions${num}`];
      delete values[`productQuantity${num}`];
    });

    // Add the agreementStructures list to values
    values.agreementStructures = agreementStructures;

    // Add user ID
    values.id = user.userId;

    console.log("Values after processing:", values);

    // AWS utils
    try {
      // Submit the form data to the API
      await submitToAPI(values, createBrandSubmission);

      console.log("Successfully submitted to DB API");

      setSignedUp(true);
    } catch (error) {
      console.error("Error submitting form data:", error);

      toast.error("An error occurred while submitting your form. Please try again later.");
    }
  }

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
            onSubmit={handleNextPage}
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
            onSubmit={handleNextPage}
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
