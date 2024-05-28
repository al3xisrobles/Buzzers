import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectGroup, SelectLabel, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RangeSlider } from "@/components/ui/rangeslider";
import { Slider } from "@/components/ui/slider";
import InputTags from '../InputTags';
import ImageUpload from '../ImageUpload';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GMapsAddressInput } from "@/components/ui/gmapsaddressinput";
import { LoaderCircle } from 'lucide-react';

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

const orgTypes = {
  collegiate: [
    "Fraternity",
    "Sorority",
    "Professional Club",
    "Social Club",
    "Student Philanthropy Group",
    "Student Athletic Group",
    "Student Academic Club",
    "Student Political Group"
  ],
  nonCollegiate: [
    "Philanthropy/Charity",
    "Corporate",
    "Athletic (Non-Collegiate)",
    "Wedding",
    "Local Government",
    "Social (Non-Collegiate)",
    "Trade Show Organizer",
    "Educational (Non-Collegiate)",
    "Music",
    "Film",
    "Cultural",
    "Religious",
    "Community",
    "Other"
  ]
};

const generateValue = (label) => {
  return label.toLowerCase().replace(/[^a-z]+/g, '_');
};

const BrandProfileForm = ({ initialValues, onSubmit, image, setImage, ageRange, setAgeRange, percentMale, setPercentMale, hasUnsavedChanges }) => {
  const [lenDesc, setLenDesc] = useState(0);
  const [isOtherOrgType, setIsOtherOrgType] = useState(false);
  const [isCollegiateOrgType, setIsCollegiateOrgType] = useState(false);

  const handleOrgTypeChange = (value, setFieldValue) => {
    setFieldValue('orgType', value);
    if (value === "other") {
      setIsOtherOrgType(true);
      setIsCollegiateOrgType(false);
      setFieldValue('showUniversity', false);
      setFieldValue('showOtherOrg', true);
    } else if (value.includes("student") || value.includes("fraternity") || value.includes("sorority")) {
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
  };

  return (
    <Formik
      validate={(values) => console.log("FORM VALUES:", values)}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, setFieldValue, values }) => (
        <Form
          className="max-w-[33rem] px-2 flex flex-col gap-10 items-center justify-center"
          onChange={() => hasUnsavedChanges.current = true}
        >
          <ImageUpload image={image} setImage={setImage} setFieldValue={setFieldValue} name="profilePicture" />

          <div className="w-full flex flex-col gap-3">
            <p>Select organization type</p>
            <Select onValueChange={(value) => handleOrgTypeChange(value, setFieldValue)}>
              <SelectTrigger className="w-full shadow-input border-none">
                <SelectValue placeholder="Organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="mt-2">
                  <SelectLabel>College/University</SelectLabel>
                  {orgTypes.collegiate.map(label => (
                    <SelectItem key={generateValue(label)} className="cursor-pointer" value={generateValue(label)}>{label}</SelectItem>
                  ))}
                </SelectGroup>
                <Separator className="my-2" />
                <SelectGroup>
                  <SelectLabel>Non-Collegiate</SelectLabel>
                  {orgTypes.nonCollegiate.map(label => (
                    <SelectItem key={generateValue(label)} className="cursor-pointer" value={generateValue(label)}>{label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {values.orgType !== "other" && values.orgType !== "professional_club" && values.orgType !== "fraternity" && values.orgType !== "sorority" && values.orgType !== "social_club" && values.orgType !== "student_philo" && values.orgType !== "student_athletic" && values.orgType !== "student_academic" && values.orgType !== "student_political" &&
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

          <div className="w-full flex flex-col gap-3">
            <div>
              <p>City of your organization</p>
              <p className="text-xs">Please select your city from the popup.</p>
            </div>
            <Field name="location" as={GMapsAddressInput} placeholder="Evanston, IL" setFieldValue={setFieldValue} className="shadow-input border-none" />
            <ErrorMessage name="location" component="div" className="text-red-500" />
          </div>

          <div className="w-full flex flex-col pb-2 gap-3">
            <div>
              <p>What <span className="font-bold">kinds of events</span> does your organization host?</p>
              <p className="text-xs">Examples: Party, Concert, Chapter Meeting, Philanthropy, Sports Event, Seminars, etc. Write up to 5. This will help Buzzers AI find matching sponsors</p>
            </div>
            <InputTags
              name="eventTypes"
              placeholder="Add an event type"
              values={initialValues.eventTypes}
              setFieldValue={setFieldValue}
              maxTags={5}
              errorMessage="eventTypes"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <div>
              <p>Please write a brief <span className="font-bold">description</span> of your organization.</p>
              <p className="text-xs">Show brands personality and tell them what you’re all about! Touch on your organization’s mission, how your members engage, and what kinds of events you host.</p>
            </div>
            <div className="flex flex-col">
              <Field name="description" as={Textarea} placeholder="Write your description here..." className="w-full shadow-input border-none" onChange={(e) => {
                setFieldValue('description', e.target.value);
                setLenDesc(e.target.value.length);
              }} />
              <p className={`text-right pt-2 ${lenDesc > 250 ? "text-red-500" : "opacity-50"} text-xs`}>{lenDesc}/250</p>
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 pb-4">
            <p>What is the <span className="font-bold">age range</span> of the members of your organization?</p>
            <RangeSlider showValues value={ageRange} onValueChange={setAgeRange} />
          </div>

          <div className="w-full flex flex-col gap-3">
            <p>What is the <span className="font-bold">gender composition</span> of your organization?</p>
            <Slider defaultValue={[percentMale]} max={100} step={1} onValueChange={setPercentMale} />
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

          <div className="w-full flex flex-col pb-2 gap-3">
            <div>
              <p>What <span className="font-bold">kinds of events</span> does your organization host?</p>
              <p className="text-xs">Examples: Party, Concert, Chapter Meeting, Philanthropy, Sports Event, Seminars, etc. Write up to 5. This will help Buzzers AI find matching sponsors</p>
            </div>
            <InputTags
              name="adjectives"
              placeholder="Add an adjective"
              values={initialValues.adjectives}
              setFieldValue={setFieldValue}
              maxTags={5}
              errorMessage="adjectives"
            />
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
  );
};

export default BrandProfileForm;
