"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// export const farmersFormSchema = z.object({
//   firstName: z
//     .string({
//       required_error: "first name required!",
//     })
//     .min(2, {
//       message: "first name must be at least 2 characters.",
//     }),
//   lastName: z
//     .string({
//       required_error: "last name required!",
//     })
//     .min(2, {
//       message: "last name must be at least 2 characters.",
//     }),
//   landName: z.string({
//     required_error: "land name required!",
//   }),
//   landType: z.string({
//     required_error: "land name required!",
//   }),
//   acres: z
//     .string({
//       required_error: "size of the land required!",
//     })
//     .refine((val) => !isNaN(Number(val)), {
//       message: "Please enter a valid number.",
//     }),
// });

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { agriculturalFields } from "@/constants";
import { CreateFarmer, GetFarmer, UpdateFarmer } from "@/lib/handle-farmer";
import React, { useEffect, useState } from "react";
import { useUpdates } from "@/lib/updates-hook";
import { Farmer } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { farmersFormSchema } from "../farmers/form";

export default function InterceptedUpdatePage() {
  const [load, setLoad] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm<z.infer<typeof farmersFormSchema>>({
    resolver: zodResolver(farmersFormSchema),
    defaultValues: {
      firstName: searchParams.get("fname")?.toString(),
      lastName: searchParams.get("lname")?.toString(),
      landName: searchParams.get("land")?.toString(),
      landType: searchParams.get("type")?.toString(),
      acres: searchParams.get("size")?.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof farmersFormSchema>) {
    setLoad(true);
    const id = searchParams.get("id");

    if (id) {
      const res = await UpdateFarmer({ ...values, id });

      if (res) {
        router.push("/dashboard/farmers");
      }
    }
    setLoad(false);
  }

  return (
    <div className=" w-[90vw] sm:w-[500px] bg-transparent border border-border p-5 rounded-md mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-3 sm:px-1"
        >
          <h1 className=" text-md font-semibold"> {}Personal Informations</h1>
          <section className=" block sm:flex items-center sm:space-x-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormDescription>Fill with ur first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormDescription>Fill with ur last name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section>
            {/* <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="flex"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={'male'} />
                      </FormControl>
                      <FormLabel>Male</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel>Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          /> */}
          </section>

          <h1 className=" text-md font-semibold">Land Informations</h1>
          <FormField
            control={form.control}
            name="landName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Name</FormLabel>
                <FormControl>
                  <Input placeholder="land name" {...field} />
                </FormControl>
                <FormDescription>Fill with ur land name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className=" block sm:flex items-center sm:space-x-5">
            <FormField
              control={form.control}
              name="landType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Land Type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " w-full sm:w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? agriculturalFields.find(
                                (land) => land.value === field.value
                              )?.label
                            : "Select land type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search lands..." />
                        <CommandEmpty>No land found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {agriculturalFields.map((land) => (
                              <CommandItem
                                value={land.label}
                                key={land.value}
                                onSelect={() => {
                                  form.setValue("landType", land.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    land.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {land.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the land that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size of the land</FormLabel>
                  <FormControl>
                    <Input placeholder="size of land" {...field} />
                  </FormControl>
                  <FormDescription>
                    Fill with ur land mesurements in acres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Button
            disabled={load}
            variant={"default"}
            type="submit"
            className=" w-full"
          >
            {!load ? (
              "Update"
            ) : (
              <div className=" flex items-center space-x-2 animate-pulse">
                <Loader width={15} height={15} className=" animate-spin" />
                <p>Please wait</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
