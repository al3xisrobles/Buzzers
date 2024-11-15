import { ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputTags from '../InputTags';
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from 'lucide-react';
import AgreementStruture from './AgreementStruture';
import { Separator } from "@/components/ui/separator";

const startSchema = {
  products: Yup.array().min(1, 'At least 1 product is required'),
  productQuantity1: Yup.number().required('Product quantity is required').min(1, 'Product quantity must be at least 1'),
  impressions1: Yup.number().required('Number of impressions is required').min(1, 'Number of impressions must be at least 1'),
  distributionInstructions1: Yup.string(),
  additionalInstructions1: Yup.string(),
};

const currentFormValues = {
  products: [],
  name1: "Structure 1",
  productQuantity1: 1,
  impressions1: 1,
  distributionInstructions1: "",
  additionalInstructions1: "",
};

const BrandProfileFormPageThree = ({ onSubmit, hasUnsavedChanges, initialValues }) => {
  const [agreementStructures, setAgreementStructures] = useState([1]);
  const [currentValidationSchema, setCurrentValidationSchema] = useState(Yup.object(startSchema));
  const [agreementId, setAgreementId] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allFormValues, setAllFormValues] = useState(currentFormValues);

  const addAgreementStructure = (setFieldValue) => {
    const nextAgreementId = agreementId + 1;
    setAgreementStructures([...agreementStructures, nextAgreementId]);

    const newSchema = {
      ...currentValidationSchema.fields,
      [`name${nextAgreementId}`]: Yup.string().required('Name is required'),
      [`productQuantity${nextAgreementId}`]: Yup.number().required(`Product quantity is required`).min(1, `Product quantity must be at least 1`),
      [`impressions${nextAgreementId}`]: Yup.number().required(`Number of impressions is required`).min(1, `Number of impressions must be at least 1`),
      [`distributionInstructions${nextAgreementId}`]: Yup.string(),
      [`additionalInstructions${nextAgreementId}`]: Yup.string(),
    };

    setCurrentValidationSchema(Yup.object(newSchema));

    setFieldValue(`name${nextAgreementId}`, 1);
    setFieldValue(`productQuantity${nextAgreementId}`, 1);
    setFieldValue(`impressions${nextAgreementId}`, 1);
    setFieldValue(`distributionInstructions${nextAgreementId}`, "");
    setFieldValue(`additionalInstructions${nextAgreementId}`, "");

    setAllFormValues({
      ...allFormValues,
      [`name${nextAgreementId}`]: "",
      [`productQuantity${nextAgreementId}`]: 1,
      [`impressions${nextAgreementId}`]: 1,
      [`distributionInstructions${nextAgreementId}`]: "",
      [`additionalInstructions${nextAgreementId}`]: "",
    });

    setAgreementId(nextAgreementId);
  };

  const removeAgreementStructure = (structureNumber, setFieldValue) => {
    setAgreementStructures(agreementStructures.filter((structure) => structure !== structureNumber));

    const newSchema = { ...currentValidationSchema.fields };
    delete newSchema[`name${structureNumber}`];
    delete newSchema[`productQuantity${structureNumber}`];
    delete newSchema[`impressions${structureNumber}`];
    delete newSchema[`distributionInstructions${structureNumber}`];
    delete newSchema[`additionalInstructions${structureNumber}`];

    setCurrentValidationSchema(Yup.object(newSchema));

    setFieldValue(`name${structureNumber}`, undefined);
    setFieldValue(`productQuantity${structureNumber}`, undefined);
    setFieldValue(`impressions${structureNumber}`, undefined);
    setFieldValue(`distributionInstructions${structureNumber}`, undefined);
    setFieldValue(`additionalInstructions${structureNumber}`, undefined);

    const newAllFormValues = { ...allFormValues };
    delete newAllFormValues[`name${structureNumber}`];
    delete newAllFormValues[`productQuantity${structureNumber}`];
    delete newAllFormValues[`impressions${structureNumber}`];
    delete newAllFormValues[`distributionInstructions${structureNumber}`];
    delete newAllFormValues[`additionalInstructions${structureNumber}`];
    setAllFormValues(newAllFormValues);
  };

  useEffect(() => {
    console.log("ALL FORM VALUES:", allFormValues);
  }, [allFormValues]);

  return (
    <Formik
      validate={(values) => {
        console.log("FORM VALUES:", values);
        setAllFormValues({
          ...allFormValues,
          ...values,
        });
      }}
      initialValues={{...initialValues, ...currentFormValues}}
      validationSchema={currentValidationSchema}
    >
      {({ isValid, setFieldValue }) => (
        <Form
          className="max-w-[34rem] px-2 flex flex-col gap-5 items-center justify-center"
          onChange={() => {
            hasUnsavedChanges.current = true;
          }}
        >
          <div className="w-full flex flex-col mb-5">
            <p><span className='font-bold'>Products: </span>what are the names of your brand’s products that you intend to market with Buzzers?</p>
            <InputTags
              name="products"
              placeholder="Enter a product name here"
              values={initialValues.products}
              setFieldValue={setFieldValue}
              maxTags={5}
              errorMessage="products"
            />
          </div>

          {agreementStructures.map((structureNumber) => (
            <React.Fragment key={structureNumber}>
              {structureNumber > 1 && <Separator className="bg-stone" />}
              <AgreementStruture
                structureNumber={structureNumber}
                setFieldValue={setFieldValue}
                removeStructure={(number) => removeAgreementStructure(number, setFieldValue)}
                canBeRemoved={agreementStructures.length > 1}
              />
            </React.Fragment>
          ))}

          <Button type="button" className="my-5 bg-gray-200 w-full flex flex-row gap-2" onClick={() => addAgreementStructure(setFieldValue)}>
            <p>Add another agreement structure</p>
            <Plus/>
          </Button>

          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Button type="button" disabled={isSubmitting || !isValid || allFormValues.products.length == 0} className="shadow-input w-full flex flex-row gap-2"
                    onClick={() => {
                      console.log("RETURNING:", allFormValues);
                      onSubmit(allFormValues);
                      setIsSubmitting(true);
                    }}
            >
              {isSubmitting ? (
                <>
                  <p>Next</p>
                  <LoaderCircle className="animate-spin" />
                </>
              ) : (
                <p>Submit and Register</p>
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
