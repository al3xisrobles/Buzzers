import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import { useState, useEffect, useRef } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAuth } from "../../Auth/AuthContext";
import toast from 'react-hot-toast';
import OrgProfileForm from "./ProfileForm";
import OrgSupplementalPage from "./SupplementalPage";
import { uploadImageToStorage } from "../../../../AWS/api";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BrandProfile = ({ setSignedUp }) => {
  const [page, setPage] = useState(1);
  const [orgRepName, setRepName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [image, setImage] = useState(null);
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [percentMale, setPercentMale] = useState(50);
  const [formData, setFormData] = useState({});
  const { user, authStatus } = useAuthenticator((context) => [context.user]);
  const { userAttributes, loadingAttributes, fetchAttributes } = useAuth();
  const hasUnsavedChanges = useRef(false);

  useEffect(() => {
    if (!loadingAttributes && Object.keys(userAttributes).length !== 0) {
      setRepName(userAttributes["custom:first_name"]);
      setOrgName(userAttributes["custom:org_name"]);
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
    orgType: '',
    location: '',
    description: '',
    adjectives: [],
    eventTypes: [],
    showOtherOrg: false,
    otherOrgType: '',
    showUniversity: false,
    university: '',
    profilePicture: image,
  };

  const handleFormSubmit = async (values) => {
    // Upload image to storage
    try {
      const imagePath = await uploadImageToStorage(values.profilePicture, user.userId, "org-logos");
      values.profilePicture = imagePath;
    } catch (e) {
      toast.error("Failed to upload image. Please try again.");
      return;
    }

    // If other org type is selected, set org type to other
    if (values.showOtherOrg) {
      values.orgType = values.otherOrgType;
    }

    delete values.otherOrgType;
    delete values.showOtherOrg;

    // Set form data to pass onto the second page
    const valuesWithSliderData = { ...values, ageRange, percentMale };

    // Get complement of percentMale
    valuesWithSliderData.percentMale = 100 - percentMale;

    setFormData(valuesWithSliderData);
    console.log(valuesWithSliderData);

    setPage(2);
    window.scrollTo(0, 0);
    hasUnsavedChanges.current = false;
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
            <h1 className="font-bold text-2xl p-2">Nice to meet you, {orgRepName}.</h1>
            <p>Let&apos;s make a profile for brands to learn about <span className="font-bold">{orgName}</span>!</p>
          </div>

          <OrgProfileForm
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            hasUnsavedChanges={hasUnsavedChanges}
            image={image}
            setImage={setImage}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            percentMale={percentMale}
            setPercentMale={setPercentMale}
          />
        </div>
      )}

      {page === 2 && (
        <OrgSupplementalPage setSignedUp={setSignedUp} orgName={orgName} formData={formData} />
      )}
    </div>
  );
};

export default BrandProfile;
