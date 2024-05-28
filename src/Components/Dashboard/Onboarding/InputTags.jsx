import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ErrorMessage } from 'formik';
import toast from 'react-hot-toast';

const InputTags = ({ name, placeholder, setFieldValue, maxTags, errorMessage }) => {
  const [tags, setTags] = useState(new Set());
  const [currentTag, setCurrentTag] = useState("");

  const isValidInput = (input) => {
    const regex = /^[a-zA-Z- ]+$/;
    return regex.test(input);
  };

  const addTag = () => {
    if (currentTag && tags.size < maxTags && isValidInput(currentTag)) {
      setTags((prevTags) => {
        const newTags = new Set(prevTags).add(currentTag);
        setFieldValue(name, Array.from(newTags));
        return newTags;
      })
      setCurrentTag("");
    } else if (!isValidInput(currentTag)) {
      toast.error("Tags should only contain letters, hyphens, and spaces.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTag();
      event.preventDefault();
    }
  };

  const deleteTag = (tag) => {
    setTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.delete(tag);
      setFieldValue(name, Array.from(newTags));
      return newTags;
    });
  };

  return (
    <div className="w-full flex flex-col pb-2 gap-3">
      <div className="flex flex-row gap-2">
        {[...tags].map((tag) => (
          <Badge key={tag} className="py-2 font-medium bg-gray-200 rounded-[0.35rem]">
            {tag}
            <X className="h-4 cursor-pointer" onClick={() => deleteTag(tag)} />
          </Badge>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <Input
          placeholder={tags.size >= maxTags ? `Maximum ${maxTags} tags` : placeholder}
          className="shadow-input border-none"
          onKeyPress={handleKeyPress}
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          disabled={tags.size >= maxTags}
        />
        <Button
          variant="outline"
          className="border-none shadow-input"
          onClick={addTag}
          disabled={tags.size >= maxTags || currentTag === ""}
        >
          Add
        </Button>
      </div>
      {errorMessage && <ErrorMessage name={name} component="div" className="text-red-500" />}
    </div>
  );
};

export default InputTags;
