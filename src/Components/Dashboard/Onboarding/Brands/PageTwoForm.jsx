import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputTags from '../InputTags';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from '@/components/ui/multi-select';
import { RangeSlider } from '@/components/ui/rangeslider';
import { LoaderCircle } from 'lucide-react';

const validationSchema = Yup.object({
  region: Yup.string().required('Region is required'),
  segmentAdjectives: Yup.array().min(3, 'At least 3 adjectives are required'),
  eventTypes: Yup.array().min(3, 'At least 3 event types are required'),
  desiredOrganizers: Yup.array().min(3, 'At least 3 desired organizers are required'),
});

const regions = [
  "Northeast",
  "Southeast",
  "West Coast",
  "Midwest",
];

const eventTypes = [
  { value: "concerts", label: "Concerts" },
  { value: "parties", label: "Parties" },
  { value: "seminars", label: "Seminars" },
  { value: "philanthropy_events", label: "Philanthropy Events" },
];

const orgTypes = [
  { value: "concerts", label: "Bands" },
  { value: "parties", label: "Clubs" },
  { value: "seminars", label: "Sorority/Fraternity" },
  { value: "philanthropy_events", label: "Student Organizations" },
];

const generateValue = (label) => {
  return label.toLowerCase().replace(/[^a-z]+/g, '_');
};

const BrandProfileFormPageTwo = ({ initialValues, onSubmit, hasUnsavedChanges, ageRange, setAgeRange }) => {
  return (
    <Formik
      validate={(values) => console.log("FORM VALUES:", values)}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, setFieldValue }) => (
        <Form
          className="max-w-[34rem] px-2 flex flex-col gap-10 items-center justify-center"
          onChange={() => hasUnsavedChanges.current = true}
        >

          <div className="w-full flex flex-col gap-3 mb-4">
            <p>What is your target <span className='font-bold'>age range</span></p>
            <RangeSlider showValues value={ageRange} onValueChange={(e) => {
              setAgeRange(e);
              setFieldValue('ageRange', e);
            }} />
          </div>

          <div className="w-full flex flex-col gap-3">
            <p>What <span className='font-bold'>region</span> would you like to market to?</p>
            <Select onValueChange={(value) => setFieldValue('region', value)}>
              <SelectTrigger className="w-full shadow-input border-none">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="mt-2">
                  {regions.map(region => (
                    <SelectItem key={generateValue(region)} className="cursor-pointer" value={generateValue(region)}>{region}</SelectItem>
                  ))}
                </SelectGroup>
                <Separator className="my-2" />
              </SelectContent>
            </Select>
            <ErrorMessage name="region" component="div" className="text-red-500" />
          </div>

          <div className="w-full flex flex-col">
            <p>Please describe in adjectives the personality of this segment</p>
            <InputTags
              name="segmentAdjectives"
              placeholder="Add an adjective"
              values={initialValues.segmentAdjectives}
              setFieldValue={setFieldValue}
              maxTags={5}
              errorMessage="segmentAdjectives"
            />
          </div>

          <div className="w-full flex flex-col">
            <p>What <span className='font-bold'>types of events</span> would you like to market to?</p>
            <MultiSelect
              name="eventTypes"
              options={eventTypes}
              placeholder="Select event types"
              setFieldValue={setFieldValue}
            />
            <ErrorMessage name="eventTypes" component="div" className="text-red-500" />
          </div>

          <div className="w-full flex flex-col">
            <p>What <span className='font-bold'>types of organizers</span> would you like to market to?</p>
            <MultiSelect
              name="desiredOrganizers"
              options={orgTypes}
              placeholder="Select event types"
              setFieldValue={setFieldValue}
            />
            <ErrorMessage name="desiredOrganizers" component="div" className="text-red-500" />
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

export default BrandProfileFormPageTwo;
