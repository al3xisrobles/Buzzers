"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import { ChevronLeft, ArrowUpToLine, X, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from 'react-hot-toast';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import imageCompression from 'browser-image-compression';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RangeSlider } from "@/components/ui/rangeslider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GMapsAddressInput } from "@/components/ui/gmapsaddressinput"; // Adjust import path accordingly
import { Select, SelectGroup, SelectLabel, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrgSupplementalPage from "./SupplementalPage";

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useAuth } from "../../Auth/AuthContext";
import { uploadImageToStorage } from "../../../../AWS/api";

const OrgProfile = ({ setSignedUp }) => {
  const [page, setPage] = useState(1);
  const [orgRepName, setRepName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [image, setImage] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [adjectives, setAdjectives] = useState(new Set());
  const [currAdj, setCurrAdj] = useState("");
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [percentMale, setPercentMale] = useState(50);
  const [eventTypes, setEventTypes] = useState(new Set());
  const [currEventType, setCurrEventType] = useState("");
  const [lenDesc, setLenDesc] = useState(0);
  const [orgType, setOrgType] = useState("");
  const [isOtherOrgType, setIsOtherOrgType] = useState(false);
  const [isCollegiateOrgType, setIsCollegiateOrgType] = useState(false);
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

  const handleImageUpload = async (file) => {
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        toast.success("Uploading image...");

        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing file:", error);
        toast.error("Failed to compress image. Please try again.");
      }
    }
  };

  const handleClick = () => {
    document.getElementById('imageUpload').click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDragLeave);
    window.addEventListener("dragleave", handleDragLeave);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDragLeave);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

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

  const handleFormChange = () => {
    hasUnsavedChanges.current = true;
  };

  const isValidInput = (input) => {
    const regex = /^[a-zA-Z- ]+$/;
    return regex.test(input);
  };

  const addAdjective = (adjective, setFieldValue) => {
    if (adjective && adjectives.size < 5 && isValidInput(adjective)) {
      setAdjectives((prevAdjectives) => {
        const newAdjectives = new Set(prevAdjectives).add(adjective);
        setFieldValue('adjectives', Array.from(newAdjectives));
        return newAdjectives;
      });
      setCurrAdj("");
    } else if (!isValidInput(adjective)) {
      toast.error("Adjectives should only contain letters, hyphens, and spaces.");
    }
  };

  const handleAdjectiveKeyPress = (event, setFieldValue) => {
    if (event.key === "Enter") {
      const adjective = event.target.value.trim();
      addAdjective(adjective, setFieldValue);
      handleFormChange();
    }
  };

  const handleAdjectiveDelete = (adjective, setFieldValue) => {
    setAdjectives((prevAdjectives) => {
      const newAdjectives = new Set(prevAdjectives);
      newAdjectives.delete(adjective);
      setFieldValue('adjectives', Array.from(newAdjectives));
      return newAdjectives;
    });
    handleFormChange();
  };

  const addEventType = (eventType, setFieldValue) => {
    if (eventType && eventTypes.size < 5 && isValidInput(eventType)) {
      setEventTypes((prevEventTypes) => {
        const newEventTypes = new Set(prevEventTypes).add(eventType);
        setFieldValue('eventTypes', Array.from(newEventTypes));
        return newEventTypes;
      });
      setCurrEventType("");
    } else if (!isValidInput(eventType)) {
      toast.error("Event types should only contain letters, hyphens, and spaces.");
    }
  };

  const handleEventTypeKeyPress = (event, setFieldValue) => {
    if (event.key === "Enter") {
      const eventType = event.target.value.trim().toLowerCase();
      addEventType(eventType, setFieldValue);
      handleFormChange();
    }
  };

  const handleEventTypeDelete = (eventType, setFieldValue) => {
    setEventTypes((prevEventTypes) => {
      const newEventTypes = new Set(prevEventTypes);
      newEventTypes.delete(eventType.toLowerCase());
      setFieldValue('eventTypes', Array.from(newEventTypes));
      return newEventTypes;
    });
    handleFormChange();
  };

  const validationSchema = Yup.object({
    orgType: Yup.string().required('Organization type is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string()
      .required('Description is required')
      .max(250, 'Description must be 250 characters or less'),
    adjectives: Yup.array().min(2, 'At least 2 adjectives are required').max(5, 'A maximum of 5 adjectives is allowed'),
    eventTypes: Yup.array().min(2, 'At least 2 event types are required').max(5, 'A maximum of 5 event types is allowed'),
    profilePicture: Yup.mixed().required('A profile picture is required'),
    showOtherOrg: Yup.boolean(),
    otherOrgType: Yup.string().when('showOtherOrg', {
      is: true,
      then: () => Yup.string().required('Organization type is required')
    }),
    showUniversity: Yup.boolean(),
    university: Yup.string().when('showUniversity', {
      is: true,
      then: () => Yup.string().required('University is required')
    })
  });

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

          <Formik
            validate={(values) => console.log("FORM VALUES:", values)}
            initialValues={{
              orgType: '',
              location: '',
              description: '',
              adjectives: Array.from(adjectives),
              eventTypes: Array.from(eventTypes),
              showOtherOrg: false,
              otherOrgType: '',
              showUniversity: false,
              university: '',
              profilePicture: image,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // Upload image to storage
              try {
                const imagePath = await uploadImageToStorage(values.profilePicture, user.userId, "org-logos");
                values.profilePicture = imagePath;
              } catch (e) {
                toast.error("Failed to upload image. Please try again.");
                return;
              }

              // Get complement
              values.percentMale = 100 - percentMale;

              // If other org type is selected, set org type to other
              if (values.showOtherOrg) {
                values.orgType = values.otherOrgType;
              }

              delete values.otherOrgType;
              delete values.showOtherOrg;

              // Set form data to pass onto the second page
              const valuesWithSliderData = { ...values, ageRange, percentMale };
              setFormData(valuesWithSliderData);
              console.log(valuesWithSliderData);

              setPage(2);
              scrollTo(0, 0);
              hasUnsavedChanges.current = false;
            }}
          >
            {({ isSubmitting, setFieldValue, isValid }) => (
              <Form
                className="max-w-[33rem] px-2 flex flex-col gap-10 items-center justify-center"
                onChange={handleFormChange}
              >
                {/* Image upload */}
                <div className='w-full flex flex-col gap-3'>
                  <p>Upload your organization&apos;s <span className="font-bold">logo</span> or a preferred <span className="font-bold">profile picture</span></p>
                  <div
                    className="flex flex-row gap-2 h-[125px]"
                    onDrop={(e) => {
                      handleDrop(e);
                      setFieldValue('profilePicture', e.dataTransfer.files[0]);
                    }}
                    onDragOver={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  >
                    {image && <img src={image} alt="Uploaded" className="w-[8rem] h-full rounded-lg object-cover" />}
                    <div
                      className={cn(
                        "shadow w-full rounded-md gap-3 flex cursor-pointer items-center justify-center py-10 border border-black border-dashed",
                        { "bg-gray-200": isDragging }
                      )}
                      onClick={handleClick}
                    >
                      <ArrowUpToLine />
                      {image ? (
                        <p className="text-center">Replace Image</p>
                      ) : (
                        <p className="text-center">Drop image here or click to upload</p>
                      )}
                    </div>
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleFileInputChange(e);
                      setFieldValue('profilePicture', e.target.files[0]);
                    }}
                  />
                  <ErrorMessage name="profilePicture" component="div" className="text-red-500" />
                </div>

                {/* Org type */}
                <div className="w-full flex flex-col gap-3">
                  <p>Select organization type</p>
                  <Select onValueChange={(value) => {
                    setOrgType(value);
                    handleFormChange();
                    setFieldValue('orgType', value);
                    if (value === "other") {
                      setIsOtherOrgType(true);
                      setIsCollegiateOrgType(false);
                      setFieldValue('showUniversity', false);
                      setFieldValue('showOtherOrg', true);
                    } else if (value === "fraternity" || value === "sorority" || value === "professional_club" || value === "social_club" || value === "student_philo" || value === "student_athletic" || value === "student_academic" || value === "student_political") {
                      setIsCollegiateOrgType(true);
                      setIsOtherOrgType(false);
                      setFieldValue('showUniversity', true);
                      setFieldValue('showOtherOrg', false);
                    } else {
                      setIsOtherOrgType(false);
                      setIsCollegiateOrgType(false);
                      setFieldValue('showUniversity', false);
                      setFieldValue('showOtherOrg', false);
                    }
                  }}>
                    <SelectTrigger className="w-full shadow-input border-none">
                      <SelectValue placeholder="Organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="mt-2">
                        <SelectLabel>
                          College/University
                        </SelectLabel>
                        <SelectItem className="cursor-pointer" value="fraternity">Fraternity</SelectItem>
                        <SelectItem className="cursor-pointer" value="sorority">Sorority</SelectItem>
                        <SelectItem className="cursor-pointer" value="professional_club">Professional Club</SelectItem>
                        <SelectItem className="cursor-pointer" value="social_club">Social Club</SelectItem>
                        <SelectItem className="cursor-pointer" value="student_philo">Student Philanthropy Group</SelectItem>
                        <SelectItem className="cursor-pointer" value="student_athletic">Student Athletic Group</SelectItem>
                        <SelectItem className="cursor-pointer" value="student_academic">Student Academic Club</SelectItem>
                        <SelectItem className="cursor-pointer" value="student_political">Student Political Group</SelectItem>
                      </SelectGroup>
                      <Separator className="my-2"/>
                      <SelectGroup>
                        <SelectLabel>
                          Non-Collegiate
                        </SelectLabel>
                        <SelectItem className="cursor-pointer" value="philo">Philanthropy/Charity</SelectItem>
                        <SelectItem className="cursor-pointer" value="corporate">Corporate</SelectItem>
                        <SelectItem className="cursor-pointer" value="athletic">Athletic (Non-Collegiate)</SelectItem>
                        <SelectItem className="cursor-pointer" value="wedding">Wedding</SelectItem>
                        <SelectItem className="cursor-pointer" value="gov">Local Government</SelectItem>
                        <SelectItem className="cursor-pointer" value="social">Social (Non-Collegiate)</SelectItem>
                        <SelectItem className="cursor-pointer" value="trade_show">Trade Show Organizer</SelectItem>
                        <SelectItem className="cursor-pointer" value="educational">Educational (Non-Collegiate)</SelectItem>
                        <SelectItem className="cursor-pointer" value="music">Music</SelectItem>
                        <SelectItem className="cursor-pointer" value="film">Film</SelectItem>
                        <SelectItem className="cursor-pointer" value="cultural">Cultural</SelectItem>
                        <SelectItem className="cursor-pointer" value="religious">Religious</SelectItem>
                        <SelectItem className="cursor-pointer" value="community">Community</SelectItem>
                      </SelectGroup>
                      <Separator className="my-2"/>
                      <SelectItem className="cursor-pointer" value="other">Other</SelectItem>
                    </SelectContent>
                    </Select>
                    {orgType !== "other" && orgType !== "professional_club" && orgType !== "fraternity" && orgType !== "sorority" && orgType !== "social_club" && orgType !== "student_philo" && orgType !== "student_athletic" && orgType !== "student_academic" && orgType !== "student_political" &&
                      <ErrorMessage name="orgType" component="div" className="text-red-500" />
                    }
                    </div>

                    {isOtherOrgType && (
                      <div className="w-full flex flex-col gap-3">
                        <p>What type of organization are you?</p>
                        <Field name="otherOrgType" as={Input} placeholder="Enter your organization type here" className="shadow-input border-none" />
                        <ErrorMessage name="otherOrgType" component="div" className="text-red-500" />
                      </div>
                    )}

                    {isCollegiateOrgType && (
                      <div className="w-full flex flex-col gap-3">
                        <p>What university?</p>
                        <Field name="university" as={Input} placeholder="Northwestern University" className="shadow-input border-none" />
                        <ErrorMessage name="university" component="div" className="text-red-500" />
                      </div>
                    )}

                {/* Location */}
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <p>City of your organization</p>
                    <p className="text-xs">Please select your city from the popup.</p>
                  </div>
                  <Field name="location" as={GMapsAddressInput} placeholder="Evanston, IL" setFieldValue={setFieldValue} className="shadow-input border-none" />
                  <ErrorMessage name="location" component="div" className="text-red-500" />
                </div>

                {/* Event types */}
                <div className="w-full flex flex-col pb-2 gap-3">
                  <div>
                    <p>What <span className="font-bold">kinds of events</span> does your organization host?</p>
                    <p className="text-xs">Examples: Party, Concert, Philanthropy, Seminars, etc. Write up to 5. This will help Buzzers AI find matching sponsors.</p>
                  </div>

                  <div className="flex flex-row gap-2">
                    {[...eventTypes].map((eventType) => (
                      <Badge key={eventType} className="py-2 font-medium bg-gray-200 rounded-[0.35rem]">
                        {eventType}
                        <X className="h-4 cursor-pointer" onClick={() => {
                          handleEventTypeDelete(eventType, setFieldValue);
                        }} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2">
                    <Input
                      placeholder={eventTypes.size >= 5 ? "Maximum 5 event types" : "Add an event type"}
                      className="shadow-input border-none"
                      onKeyPress={(e) => handleEventTypeKeyPress(e, setFieldValue)}
                      value={currEventType}
                      onChange={(e) => setCurrEventType(e.target.value)}
                      disabled={eventTypes.size >= 5}
                    />
                    <Button
                      variant="outline"
                      className="border-none shadow-input"
                      onClick={() => {
                        addEventType(currEventType, setFieldValue);
                      }}
                      disabled={eventTypes.size >= 5 || currEventType === ""}
                    >
                      Add
                    </Button>
                  </div>
                  <ErrorMessage name="eventTypes" component="div" className="text-red-500" />
                </div>

                {/* Description */}
                <div className="w-full flex flex-col gap-3">
                  <div>
                    <p>Please write a brief <span className="font-bold">description</span> of your organization.</p>
                    <p className="text-xs">Show brands personality and tell them what you’re all about! Touch on your organization’s mission, how your members engage, and what kinds of events you host.</p>
                  </div>
                  <div className="flex flex-col">
                    <Field name="description" as={Textarea} placeholder="Write your description here..." className="w-full shadow-input border-none"  onChange={(e) => {
                        setFieldValue('description', e.target.value);
                        setLenDesc(e.target.value.length);
                      }} />
                    <p className={`text-right pt-2 ${lenDesc > 250 ? "text-red-500" : "opacity-50"} text-xs`}>{lenDesc}/250</p>
                    <ErrorMessage name="description" component="div" className="text-red-500" />
                  </div>
                </div>

                {/* Age Range */}
                <div className="w-full flex flex-col gap-3 pb-4">
                  <p>What is the <span className="font-bold">age range</span> of the members of your organization?</p>
                  <RangeSlider showValues value={ageRange} onValueChange={setAgeRange} />
                </div>

                {/* Gender composition */}
                <div className="w-full flex flex-col gap-3">
                  <p>What is the <span className="font-bold">gender composition</span> of your organization?</p>
                  <Slider defaultValue={[percentMale]} max={100} step={1} onValueChange={(value) => setPercentMale(value)} />
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col text-sm">
                      <p>Male</p>
                      <p>{100 - percentMale}%</p>
                    </div>
                    <div className="flex flex-col text-sm">
                      <p>Female</p>
                      <p>{percentMale}%</p>
                    </div>
                  </div>
                </div>

                {/* Adjectives */}
                <div className="w-full flex flex-col pb-2 gap-3">
                  <div>
                    <p>Write a few adjectives to describe your organization’s <span className="font-bold">personality</span>.</p>
                    <p className="text-xs">These adjectives will help Buzzers AI find brands that fit your vibe. For example, your members may be studious, rowdy, ambitious, energetic, or chill.</p>
                  </div>

                  <div className="flex flex-row gap-2">
                    {[...adjectives].map((adjective) => (
                      <Badge key={adjective} className="py-2 font-medium bg-gray-200 rounded-[0.35rem]">
                        {adjective}
                        <X className="h-4 cursor-pointer" onClick={() => {
                          handleAdjectiveDelete(adjective, setFieldValue);
                        }} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2">
                    <Input
                      placeholder={adjectives.size >= 5 ? "Maximum 5 adjectives" : "Add an adjective"}
                      className="shadow-input border-none"
                      onKeyPress={(e) => handleAdjectiveKeyPress(e, setFieldValue)}
                      value={currAdj}
                      onChange={(e) => setCurrAdj(e.target.value)}
                      disabled={adjectives.size >= 5}
                    />
                    <Button
                      variant="outline"
                      className="border-none shadow-input"
                      onClick={() => {
                        addAdjective(currAdj, setFieldValue);
                      }}
                      disabled={adjectives.size >= 5 || currAdj === ""}
                    >
                      Add
                    </Button>
                  </div>
                  <ErrorMessage name="adjectives" component="div" className="text-red-500" />
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-2">
                  <Button type="submit" disabled={isSubmitting} className="shadow-input w-full flex flex-row gap-2">
                    {isSubmitting ? (
                      <>
                        <p>Next</p>
                        <LoaderCircle className="animate-spin" />
                      </>
                    ) : (
                      <p>Next</p>
                    )}
                  </Button>
                  {!isValid && (
                    <div className="text-red-500">You are missing some fields</div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {page === 2 && (
        <OrgSupplementalPage setSignedUp={setSignedUp} orgName={orgName} formData={formData} />
      )}
    </div>
  );
};

export default OrgProfile;
