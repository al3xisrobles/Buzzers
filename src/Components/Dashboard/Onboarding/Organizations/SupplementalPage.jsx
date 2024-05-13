import { useState, useEffect } from 'react';
import Logo from "../../../../Assets/Dashboard/LogoYellow.svg";
import {
  ArrowUpToLine,
  LoaderCircle,
  Instagram,
  Facebook,
  Globe,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function SupplementalPage({ setSignedUp, orgName }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (submitting) {
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 1000);
    }
  }, [submitting]);

  useEffect(() => {
    if (submitted) {
      setSignedUp(true);
    }
  }, [submitted]);

  const handleImageUpload = (files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages(prevImages => [...prevImages, reader.result]);
      };
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', { frequency, instagram, facebook, website });
    console.log('Uploaded images:', images);
    setSubmitting(true);
  };

  return (
    <div className="bg-salt w-full flex flex-col gap-6 items-center justify-center py-20">
      <img src={Logo} className="w-20" alt="Buzzers" />
      <div className="flex flex-col items-center pb-10">
        <h1 className="font-bold text-2xl p-2">{orgName}&apos;s profile is almost ready</h1>
        <p>These fields are optional, but they will increase your appeal to brands.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-[32rem] flex flex-col gap-10 items-center justify-center">
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
                <img src={img} alt={`Uploaded ${index}`} className="w-full h-full rounded-lg object-cover" />
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
            placeholder="www.tiktok.com/buzzers"
            className="shadow-input border-none"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
          <Input
            icon={Globe}
            placeholder="www.instagram.com/buzzers"
            className="shadow-input border-none"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
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
  )
}

export default SupplementalPage;
