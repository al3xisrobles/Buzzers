import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import InputTags from '../InputTags';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from '@/components/ui/multi-select';
import { LoaderCircle, Plus, Minus } from 'lucide-react';

const validationSchema = Yup.object({
  region: Yup.string().required('Region is required'),
  segmentAdjectives: Yup.array().min(3, 'At least 3 adjectives are required'),
  eventTypes: Yup.array().min(3, 'At least 3 event types are required'),
  desiredOrganizers: Yup.array().min(3, 'At least 3 desired organizers are required'),
});

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

const BrandProfileFormPageThree = ({ initialValues, onSubmit, hasUnsavedChanges }) => {
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

          <div className="w-full flex flex-col">
            <p><span className='font-bold'>Products: </span>what are the names of your brand’s products that you intend to market with Buzzers?</p>
            <InputTags
              name="segmentAdjectives"
              placeholder="Enter your product names here"
              values={initialValues.segmentAdjectives}
              setFieldValue={setFieldValue}
              maxTags={5}
              errorMessage="segmentAdjectives"
            />
          </div>

          <div className="w-full flex flex-col">
            <p>What <span className='font-bold'>types of events</span> would you like to market to?</p>
            <div className='flex flex-row'>
              <Button variant="outline" className="border-r-0 rounded-r-[0rem] bg-salt">
                <Minus size={14}/>
              </Button>
              <div className='w-[5rem]'>
                <Input placeholder="1" className="text-center" onChange={(value) => setFieldValue("productQuantity", value)}/>
              </div>
              <Button variant="outline" className="border-none bg-salt">
                <Plus size={14}/>
              </Button>
            </div>
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

export default BrandProfileFormPageThree;
