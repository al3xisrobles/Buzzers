import { useState } from 'react';
import { ArrowUpToLine } from "lucide-react";
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { cn } from "@/lib/utils";
import { ErrorMessage } from 'formik';

const ImageUpload = ({ image, setImage, setFieldValue, name }) => {
  const [isDragging, setIsDragging] = useState(false);

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
          setFieldValue(name, file);
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

  return (
    <div className='w-full flex flex-col gap-3'>
      <p>Upload your organization&apos;s <span className="font-bold">logo</span> or a preferred <span className="font-bold">profile picture</span></p>
      <div
        className="flex flex-row gap-2 h-[125px]"
        onDrop={(e) => {
          handleDrop(e);
          setFieldValue(name, e.dataTransfer.files[0]);
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
          setFieldValue(name, e.target.files[0]);
        }}
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default ImageUpload;
