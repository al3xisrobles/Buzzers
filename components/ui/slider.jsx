import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, min = 0, max = 100, defaultValue = [min], ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue[0]);

  const handleChange = (newValue) => {
    setValue(newValue[0]);
    if (props.onValueChange) {
      props.onValueChange(newValue[0]);
    }
  };

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn("shadow-input relative flex w-full touch-none select-none items-center", className)}
        min={min}
        max={max}
        defaultValue={defaultValue}
        value={[value]}
        onValueChange={handleChange}
      >
        <SliderPrimitive.Track
          className="relative h-[0.6rem] w-full grow overflow-hidden rounded-full"
        >
          <SliderPrimitive.Range className="absolute h-full bg-obsidian" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="cursor-pointer block h-6 w-6 rounded-full border-2 border-obsidian bg-salt ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {props.showValue &&
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs">
              {value}
            </div>
          }
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
