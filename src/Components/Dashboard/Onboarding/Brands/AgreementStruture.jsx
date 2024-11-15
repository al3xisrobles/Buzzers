import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trash,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ErrorMessage } from 'formik';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function AgreementStruture({ structureNumber, setFieldValue, removeStructure, canBeRemoved }) {
  const [quantity, setQuantity] = useState(1);
  const [impressions, setImpressions] = useState(1);
  const [name, setName] = useState("Structure " + structureNumber.toString());
  const [editingName, setEditingName] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const nameInputRef = useRef(null);

  const handleChange = (e, fieldValue) => {
    const newValue = e.target.value || 1;
    setFieldValue(fieldValue, newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditingName(false);
    }
  };

  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editingName]);

  return (
    <div className='w-full'>
      <TooltipProvider>
        <div className="w-full flex flex-col gap-2">
          <div className='flex flex-row items-center gap-2'>
            {editingName ? (
              <>
                <Input
                  ref={nameInputRef}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setFieldValue(`name${structureNumber}`, e.target.value)
                  }}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" variant="ghost" onClick={() => setEditingName(!editingName)}>
                  <Check size={18}/>
                </Button>
              </>
            ) : (
              <>
                <h3 className='text-2xl'>{name}</h3>
                {/* {!collapsed && */}
                  <Tooltip>
                    <TooltipTrigger>
                      <Button type="button" variant="ghost" onClick={() => setEditingName(!editingName)}>
                        <Pencil size={18}/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Structure Name</p>
                    </TooltipContent>
                  </Tooltip>
                {/* } */}
              </>
            )}
            {canBeRemoved &&
              <Tooltip>
                <TooltipTrigger>
                  <Button type="button" variant="destructive" onClick={() => removeStructure(structureNumber)}>
                    <Trash size={18}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove {name}</p>
                </TooltipContent>
              </Tooltip>
            }
            <Button type="button" variant="ghost" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? (
                <ChevronDown size={18}/>
              ) : (
                <ChevronUp size={18}/>
              )}
            </Button>
          </div>
          {!collapsed && <p className='text-stone text-sm py-2'>For example: Standard, Extra Product, etc...</p>}
        </div>

        {!collapsed && (
          <>
            <div className="w-full flex flex-col">
              <p><span className='font-bold'>Product quantity: </span>how many units of your product will you send the organizer as a ratio of to attendee?</p>
              <p className='text-stone text-sm py-2'>We encourage a 1-1 ratio.</p>
              <div className='flex flex-row items-center gap-3'>
                <div className='w-[5rem] py-2'>
                  <Input value={quantity} type="number" placeholder="1" className="text-center" onChange={(e) => {
                    handleChange(e, `productQuantity${structureNumber}`);
                    setQuantity(e.target.value);
                  }} />
                </div>
                <p>units of product per</p>
                <div className='w-[5rem] py-2'>
                  <Input value={impressions} type="number" placeholder="1" className="text-center" onChange={(e) => {
                    handleChange(e, `impressions${structureNumber}`);
                    setImpressions(e.target.value);
                  }} />
                </div>
                <p>impressions</p>
              </div>
              <ErrorMessage name={`productQuantity${structureNumber}`} component="div" className="text-red-500" />
              <ErrorMessage name={`impressions${structureNumber}`} component="div" className="text-red-500" />
            </div>

            <div className="w-full flex flex-col pt-5">
              <p className='text-stone text-sm font-semibold'>OPTIONAL</p>
              <p className='mb-3'><span className='font-bold'>Distribution instructions: </span>how would you like your product to be distributed to audiences?</p>
              <Textarea
                placeholder="For example: hand out drinks upon entrance"
                onChange={(e) => setFieldValue(`distributionInstructions${structureNumber}`, e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col pt-5">
              <p className='text-stone text-sm font-semibold'>OPTIONAL</p>
              <p className='mb-3'><span className='font-bold'>Additional instructions: </span>provide any additional instructions here.</p>
              <Textarea
                placeholder="For example: product displays, any banners or additional merchandise you wish to send, etc."
                onChange={(e) => setFieldValue(`additionalInstructions${structureNumber}`, e.target.value)}
              />
            </div>
          </>
        )}
      </TooltipProvider>
    </div>
  )
}

export default AgreementStruture;
