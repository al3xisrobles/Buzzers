import { forwardRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { cn } from "@/lib/utils";

const GMapsAddressInput = forwardRef(({ className, icon: Icon, setFieldValue, ...props }, ref) => {


  return (
    <div className="relative flex flex-row items-center w-full">
      {Icon && <Icon className="absolute left-3 h-5 w-5" />}
      <Autocomplete
        onPlaceSelected={(place) => {
          const city = place.address_components.find(component => component.types.includes("locality"))?.long_name || "";
          const state = place.address_components.find(component => component.types.includes("administrative_area_level_1"))?.short_name || "";
          const location = `${city}, ${state}`;
          setFieldValue('location', location);
        }}
        options={{
          types: ['(cities)'],
        }}
        className={cn(
          "flex h-10 w-full bg-salt rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          Icon && "pl-10"
        )}
        placeholder="Enter your city and state"
        {...props}
      />
    </div>
  );
});

GMapsAddressInput.displayName = "GMapsAddressInput";

export { GMapsAddressInput };
