import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputTags from '../InputTags';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoaderCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const validationSchema = Yup.object({
  brandPersonality: Yup.array(),
  adjectives: Yup.array().min(3, 'At least 3 adjectives are required'),
  category: Yup.string().required('Category is required'),
});

const brandCategories = [
  "Fraternity",
  "Sorority",
  "Professional Club",
  "Social Club",
  "Student Philanthropy Group",
  "Student Athletic Group",
  "Student Academic Club",
  "Student Political Group"
];

const personalityAdjectives = {
  "Sincerity": [
    "Down to earth",
    "Honest",
    "Cheerful",
    "Sentimental",
    "Friendly",
    "Wholesome",
    "Family oriented",
    "Real",
    "Original"
  ],
  "Excitement": [
    "Daring",
    "Trendy",
    "Unique",
    "Independent",
    "Exciting",
    "Spirited",
    "Innovative",
    "Cool",
    "Young",
    "Contemporary"
  ],
  "Competence": [
    "Reliable",
    "Hardworking",
    "Intelligent",
    "Technical",
    "Corporate",
    "Successful",
    "Leader",
    "Confident"
  ],
  "Sophistication": [
    "Glamorous",
    "Charming",
    "Smooth",
    "Advanced"
  ],
  "Ruggedness": [
    "Outdoorsy",
    "Tough",
    "Rugged"
  ]
};

const generateValue = (label) => {
  return label.toLowerCase().replace(/[^a-z]+/g, '_');
};

const BrandProfileForm = ({ initialValues, onSubmit, hasUnsavedChanges }) => {
  const handleCategoryChange = (value, setFieldValue) => {
    setFieldValue('category', value);
  };

  const [personalityAdjs, setPersonalityAdjs] = useState(initialValues.brandPersonality);

  const togglePersonalityAdj = (adj, setFieldValue) => {
    setPersonalityAdjs((prevAdjs) => {
      var newAdjs = prevAdjs;
      if (prevAdjs.includes(adj)) {
        newAdjs = prevAdjs.filter((item) => item !== adj);
      } else if (prevAdjs.length < 8) {
        newAdjs = [...prevAdjs, adj];
      }
      setFieldValue('brandPersonality', newAdjs);
      return newAdjs;
    });
  };

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
          <div className="w-full flex flex-col gap-5">
            <div>
              <p>Rank <span className='font-bold'>up to 8</span> of the following to define your brand&apos;s personality</p>
              <p className="text-xs">This will help us find event audiences which align with your personality.</p>
            </div>
            <div className='flex flex-col-reverse sm:flex-row gap-6'>
              <div className='flex flex-col gap-2 sm:w-[55%]'>
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className='flex flex-row gap-3 items-center'>
                    <p className='font-bold'>{index + 1}</p>
                    <div
                      className={`transition p-2 w-full flex items-center h-[2.25rem] border rounded-md border-dashed border-black border-opacity-50 ${personalityAdjs[index] ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                      onClick={() => personalityAdjs[index] && togglePersonalityAdj(personalityAdjs[index], setFieldValue)}
                    >
                      <p>{personalityAdjs[index] || ''}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex flex-wrap mx-auto gap-3 sm:w-[45%]'>
                <Carousel className="relative w-full max-w-xs h-full">
                  <div className='absolute w-full mt-3 flex justify-between z-[99]'>
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                  <CarouselContent>
                    {Object.keys(personalityAdjectives).map((category, index) => (
                      <CarouselItem key={index}>
                        <div className='flex flex-col gap-2'>
                          <p className='w-full text-center font-bold'>{category}</p>
                          <div className='flex gap-2 flex-wrap'>
                            {personalityAdjectives[category].map((adj, index) => (
                              <Button
                                key={index}
                                className={`bg-gray-200 ${personalityAdjs.includes(adj) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={() => !personalityAdjs.includes(adj) && togglePersonalityAdj(adj, setFieldValue)}
                                disabled={personalityAdjs.includes(adj)}
                              >
                                {adj}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <ErrorMessage name="brandPersonality" component="div" className="text-red-500" />
          </div>

          <div className="w-full flex flex-col pb-2 gap-3">
            <div>
              <p>Add at least <span className='font-bold'>3 additional adjectives</span> to describe your brand&apos;s “vibe.”</p>
              <p className="text-xs">Use write as many words as you&apos;d like. This will help us find events with the same buzz.</p>
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

          <div className="w-full flex flex-col gap-3">
            <p>Select your <span className='font-bold'>brand&apos;s category</span></p>
            <Select onValueChange={(value) => handleCategoryChange(value, setFieldValue)}>
              <SelectTrigger className="w-full shadow-input border-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="mt-2">
                  {brandCategories.map(label => (
                    <SelectItem key={generateValue(label)} className="cursor-pointer" value={generateValue(label)}>{label}</SelectItem>
                  ))}
                </SelectGroup>
                <Separator className="my-2" />
              </SelectContent>
            </Select>
            <ErrorMessage name="category" component="div" className="text-red-500" />
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
