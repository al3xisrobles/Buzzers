import { useState, useEffect } from "react"

import {
  ArrowLeft,
  Loader2,
  Tag,
  Check,
  ChevronsUpDown
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"


import Tavern from "../../../Assets/Dashboard/Tavern.png"
import Honeycomb from "../../../Assets/Dashboard/LogoYellow.svg"
import ApplePay from "../../../Assets/Dashboard/ApplePay.png"

import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom'

import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// const stripePromise = loadStripe("STRIPE_PUBLIC_KEY");

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  nameOnCard: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required')
});


const Combobox = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  console.log("Current frameworks:", frameworks);  // Check if frameworks is defined
  console.log("Current value:", value);  // Check what value is set to

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-ful justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select a country"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const StripeForm = ({ total }) => {
  // const stripe = useStripe();
  // const elements = useElements();

  const handleSubmit = async (values, actions) => {
    console.log("VALUES:", values);

    // if (!stripe || !elements) {
    //   // Stripe.js has not yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   return;
    // }

    // const cardElement = elements.getElement(CardElement);

    // const {error, paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    //   billing_details: {
    //     name: values.nameOnCard,
    //     email: values.email,
    //     address: {
    //       postal_code: values.zipCode,
    //       country: values.country
    //     }
    //   },
    // });

    // if (error) {
    //   console.log('[error]', error);
    //   toast.error(error.message);
    //   actions.setSubmitting(false);
    // } else {
    //   console.log('[PaymentMethod]', paymentMethod);
    //   toast.success('Payment successful!');
    //   actions.resetForm();
    // }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        nameOnCard: '',
        country: '',
        zipCode: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm opacity-75">Email</p>
              <Field name="email" type="email" placeholder="example@gmail.com" as={Input}/>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm opacity-75">Name on card</p>
              <Field name="nameOnCard" placeholder="Full name on card" as={Input}/>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm opacity-75">Country or region</p>
              <Field name="country" placeholder="Country/Region" as={Combobox}/>
            </div>

            <Field name="zipCode" placeholder="Zip Code" as={Input} />
            {/* <CardElement /> */}

            <Button disabled={isSubmitting} className="w-full">
              Pay ${total.toFixed(2)}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

function Pay() {
  const [loading, setLoading] = useState(false);
  const [doneProcessing, setDoneProcessing] = useState(false);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setDoneProcessing(true);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    console.log(loading);
    if (doneProcessing) {
      navigate("/allset");
    }
  }, [doneProcessing]);

  const [paymentInfo, setPaymentInfo] = useState({
    "Subtotal": 200.00,
    "Sales tax (6.25%)": 12.50,
    "Total": 212.50,
  });

  const promotionalCode = "ILOVEBUZZERS"

  const handlePromoCodeInput = (event) => {
    setPromoCode(event.target.value);
  }

  const applyDiscount = () => {
    console.log("APPLYING")
    if (promoCode === promotionalCode) {
      const newTotal = paymentInfo.Total - 10;
      setPaymentInfo({...paymentInfo, "Total": newTotal, "Discount": 10.00});
      toast.success('Promotional code applied successfully!');
    } else {
      toast.error('Invalid promotional code.');
    }
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className='w-screen h-full md:h-screen flex flex-col sm:flex-row'>
      {/* Left */}
      <div className='w-full lg:w-[55%] flex flex-col items-center justify-start pl-[8rem] pr-[10rem] pt-[8rem] pb-10'>
        <div className='w-[90%] flex flex-row justify-center gap-4'>
          <Link to="/dashboard" className="h-max">
            <ArrowLeft className="opacity-50" size={24}/>
          </Link>
          <div className="w-full flex flex-col gap-8">
            <div className="w-full flex flex-row gap-3 items-center justify-start">
              <img src={Honeycomb} alt="" className="text-primary h-8"/>
              <p>Buzzers</p>
            </div>

            <div className="flex flex-col gap-2">
              <p>Pay Buzzers</p>
              <p className="font-semibold text-5xl">${paymentInfo.Total.toFixed(2)}</p>
            </div>

            <div className="flex flex-row gap-4 w-full">
              <img src={Tavern} className="h-14 rounded" alt=""/>
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-row justify-between mb-12">
                  <p>@ SPACE</p>
                  <p>${paymentInfo.Subtotal.toFixed(2)}</p>
                </div>

                <hr/>

                <div className="flex flex-row justify-between">
                  <p>Subtotal</p>
                  <p>${paymentInfo.Subtotal.toFixed(2)}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <input
                    placeholder="Add promotional code"
                    className="w-full outline-none"
                    value={promoCode}
                    onChange={handlePromoCodeInput}
                  />

                  <Button onClick={applyDiscount} variant="outline" className="h-8 p-3">
                    <p>Apply</p>
                  </Button>
                </div>

                {Object.entries(paymentInfo).map(([label, value]) => {
                  if (label !== "Subtotal" && label !== "Total" && label !== "Discount") {
                    return (
                      <div key={label} className="flex flex-row justify-between">
                        <p>{label}</p>
                        <p>{value.toFixed(2)}</p>
                      </div>
                    )
                  } else if (label === "Discount") {
                    return (
                      <div key={label} className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-2">
                          <p>{label}</p>
                          <div className="bg-gray-200 flex flex-row gap-2 rounded-lg px-3 py-1 items-center">
                            <Tag size={16}/>
                            <p>{promotionalCode}</p>
                          </div>
                        </div>
                        <p>-${value.toFixed(2)}</p>
                      </div>
                    )
                  }
                })}

                <hr/>

                <div className="flex flex-row justify-between">
                  <p>Total</p>
                  <p>${paymentInfo.Total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className='w-[45%] h-full shadow-xl flex flex-col justify-center gap-8 p-10 px-[8rem] max-w-[45rem] mx-auto bg-white'>
        <Button className="bg-black">
          <img src={ApplePay} className="h-full bg-white" alt="Apple Pay"/>
        </Button>

        {/* Form here */}
        <hr/>

        {/* <Elements stripe={stripePromise}> */}
          <StripeForm total={paymentInfo["Total"]}/>
        {/* </Elements> */}
      </div>
    </div>
  )
}

export default Pay
