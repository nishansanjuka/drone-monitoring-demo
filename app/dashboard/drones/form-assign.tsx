"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FarmerWithFields, GetFarmers } from "@/lib/handle-farmer";
import { useUpdates } from "@/lib/updates-hook";

export default function FormAssign() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [farmers, setFarmers] = React.useState<FarmerWithFields[] | undefined>(
    []
  );
  const [Load, setLoad] = React.useState<boolean>(true);
  const { updateFarmers } = useUpdates();

  React.useEffect(() => {
    async function getData() {
      setLoad(true);
      setFarmers(await GetFarmers());
      setLoad(false);
    }
    getData();
  }, [updateFarmers]);

  return (
    <div className=" w-full p-5 flex items-center space-x-5">
      {Load ? (
        <h1>please wait...</h1>
      ) : (
        <React.Fragment>
          <div className=" flex-[0.7]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className=" w-full justify-between"
                >
                  {value
                    ? farmers &&
                      farmers.find((farmer) => `ID: ${farmer.id} Name : ${farmer.firstName} ${farmer.lastName}` === value)?.firstName
                    : "Select farmer..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-full p-0">
                <Command>
                  <CommandInput placeholder="Search farmer..." />
                  <CommandEmpty>No farmer found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {farmers && farmers.map((farmer) => (
                        <CommandItem
                          key={`ID: ${farmer.id} Name : ${farmer.firstName} ${farmer.lastName}`}
                          value={`ID: ${farmer.id} Name : ${farmer.firstName} ${farmer.lastName}`}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === `ID: ${farmer.id} Name : ${farmer.firstName} ${farmer.lastName}`
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {`ID: ${farmer.id} Name : ${farmer.firstName} ${farmer.lastName}`}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button className=" flex-[0.3]">Assign</Button>
        </React.Fragment>
      )}
    </div>
  );
}
