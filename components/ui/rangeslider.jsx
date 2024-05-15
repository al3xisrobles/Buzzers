import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const RangeSlider = React.forwardRef(({ className, min = 0, max = 100, value, showValues = false, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(value);

  const handleChange = (newValues) => {
    setInternalValue(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative shadow-input flex w-full touch-none select-none items-center", className)}
        min={min}
        max={max}
        value={internalValue}
        onValueChange={handleChange}
        {...props}
      >
        <SliderPrimitive.Track
          className="relative h-[0.6rem] w-full grow overflow-hidden rounded-full"
        >
          <SliderPrimitive.Range className="absolute h-full bg-obsidian" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="cursor-pointer block h-6 w-6 rounded-full border-2 border-obsidian bg-salt ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {showValues &&
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-sm">
              {internalValue[0]}
            </div>
          }
        </SliderPrimitive.Thumb>
        <SliderPrimitive.Thumb
          className="cursor-pointer block h-6 w-6 rounded-full border-2 border-obsidian bg-salt ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {showValues &&
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-sm">
              {internalValue[1]}
            </div>
          }
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
});
RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };
