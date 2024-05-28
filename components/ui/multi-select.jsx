"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

function MultiSelect({ name, options, placeholder, setFieldValue }) {
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    setFieldValue(name, selected);
  }, [selected]);

  const handleUnselect = React.useCallback((option) => {
    setSelected((prev) => prev.filter((s) => s.value !== option.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = options.filter((option) => !selected.includes(option));

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible max-w-[28.7rem] mx-auto"
    >
      <div className="flex flex-col">
        <div className={`flex flex-row flex-wrap gap-2 ${selected.length > 0 && "mt-2"} pb-4`}>
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="secondary" className="w-max py-2 font-medium bg-gray-200 rounded-[0.35rem]">
                {option.label}
                <button
                  className="ml-1 rounded-[0.5rem] outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-4 cursor-pointer" />
                </button>
              </Badge>
            );
          })}
        </div>
        <div className="group rounded-md shadow-input px-3 py-3 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && selectables.length > 0 ? (
              <div className="absolute top-0 z-[50] w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((option) => {
                    return (
                      <CommandItem
                        key={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue("");
                          setSelected((prev) => [...prev, option]);
                        }}
                        className="cursor-pointer z-[60]"
                      >
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : null}
          </CommandList>
        </div>
      </div>
    </Command>
  );
}

export { MultiSelect };
