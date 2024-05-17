import { useState, useEffect } from 'react';
import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import {
  ArrowUpToLine,
  LoaderCircle,
  Globe,
  Instagram,
  Facebook,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import imageCompression from 'browser-image-compression';

import { createOrgSubmission } from "../../../../AWS/graphql/mutations";

import { submitToAPI, uploadImageToStorage } from "../../../../AWS/api";
import { useAuthenticator } from '@aws-amplify/ui-react';
import toast from 'react-hot-toast';

function SupplementalPage({ setSignedUp, orgName, formData }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [website, setWebsite] = useState('');
  const [referrer, setRefferer] = useState('');
  const [formValues] = useState(formData);
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (submitted) {
      setSignedUp(true);
    }
  }, [submitted]);

  const handleImageUpload = async (files) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    toast.success("Uploading image(s)...");

    const compressedImages = await Promise.all(
      Array.from(files).map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve({ file: compressedFile, url: reader.result });
            };
          });
        } catch (error) {
          console.error("Error compressing file:", error);
          toast.error("Failed to compress image. Please try again.");
          return null;
        }
      })
    );

    setImages((prevImages) => [...prevImages, ...compressedImages.filter(Boolean)]);
  };

  const handleClick = () => {
    document.getElementById('imageUpload').click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    handleImageUpload(files);
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

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // Upload images
      const imagePaths = [];
      for (let i = 0; i < images.length; i++) {
        try {
          const imageName = await uploadImageToStorage(images[i].file, user.userId, "event-photos");
          imagePaths.push(imageName);
          console.log(`${i + 1}/${images.length} uploaded`);
        } catch (error) {
          console.error(`Failed to upload image ${i + 1}/${images.length}`, error);
          toast.error("Failed to upload images. Please try again.");
          setSubmitting(false);
          return;
        }
      }

      const orgSubmissionSupplemental = {
        eventPictures: imagePaths,
        frequency,
        instagram,
        facebook,
        website,
        referrer
      };

      // Union both form dictionaries
      const totalFormSubmission = { ...formValues, ...orgSubmissionSupplemental };

      // Get rid of `showUniversity` field
      delete totalFormSubmission.showUniversity;

      // Add user ID
      totalFormSubmission.id = user.userId;

      console.log("Submitting to API:", totalFormSubmission);
      try {
        await submitToAPI(totalFormSubmission, createOrgSubmission);
        setSubmitted(true);
        setSubmitting(false);
      } catch (error) {
        toast.error("Failed to submit data. Please try again later.");
        setSubmitting(false);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload images or submit data. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-salt w-full flex flex-col gap-6 items-center justify-center py-20">
      <img src={Logo} className="w-20" alt="Buzzers" />
      <div className="flex flex-col text-center items-center pb-10">
        <h1 className="font-bold text-2xl p-2">{orgName}&apos;s profile is almost ready</h1>
        <p>These fields are optional and will increase your appeal to brands. You can always edit your profile later.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[32rem] px-2 flex flex-col gap-10 items-center justify-center">
        {/* Image upload */}
        <div className='w-full flex flex-col gap-3'>
          <div>
            <p>Upload photos of events your organization has previously hosted.</p>
            <p className='text-sm'>We recommend 5-10 photos from various events.</p>
          </div>
          <div
            className={`grid ${images.length === 0 ? "grid-cols-1" : "grid-cols-3 md:grid-cols-3"} gap-2`}
            onDrop={handleDrop}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            {images.map((img, index) => (
              <div key={index} className="relative w-full h-32">
                <img src={img.url} alt={`Uploaded ${index}`} className="w-full h-full rounded-lg object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
            <div
              className={cn(
                "shadow w-full h-32 rounded-md gap-3 flex cursor-pointer items-center justify-center border border-black border-dashed",
                { "bg-gray-200": isDragging }
              )}
              onClick={handleClick}
            >
              <ArrowUpToLine />
              {images.length > 0 ? (
                <p className="text-center">Add Images</p>
              ) : (
                <p className="text-center">Drop images here or click to upload</p>
              )}
            </div>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>

        {/* Frequency */}
        <div className="w-full flex flex-col gap-3">
          <p><span className='font-bold'>How often</span> does your organization host events for which you would request a sponsorship?</p>
          <Select onValueChange={setFrequency}>
            <SelectTrigger className="w-full shadow-input border-none">
              <SelectValue placeholder="Select Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="weekly">Weekly</SelectItem>
              <SelectItem className="cursor-pointer" value="bi-weekly">Bi-Weekly</SelectItem>
              <SelectItem className="cursor-pointer" value="monthly">Monthly</SelectItem>
              <SelectItem className="cursor-pointer" value="annually">Annually</SelectItem>
              <SelectItem className="cursor-pointer" value="not_sure">Not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Social Links */}
        <div className="w-full flex flex-col gap-2">
          <p>Social Links</p>
          <Input
            icon={Instagram}
            placeholder="www.instagram.com/buzzers"
            className="shadow-input border-none"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <Input
            icon={Facebook}
            placeholder="www.facebook.com/buzzers"
            className="shadow-input border-none"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
          <Input
            icon={Globe}
            placeholder="www.buzzers.com"
            className="shadow-input border-none"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Frequency */}
        <div className="w-full flex flex-col gap-3">
          <p>Referred to Buzzers by another organizer? Tell us their name here and you&apos;ll both earn referral perks!</p>
          <Input className="shadow-input border-none" placeholder="Enter reference’s first and last name" onChange={(e) => setRefferer(e.target.value)} />
        </div>

        <Button type="submit" disabled={submitting} className="shadow-input w-full flex flex-row gap-2">
          {submitting ? (
            <>
              <p>Finish</p>
              <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <p>Finish</p>
          )}
        </Button>
      </form>
    </div>
  );
}

export default SupplementalPage;
