"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const dronesFormSchema = z.object({
  serialNumber: z
    .string({
      required_error: "serial number required!",
    })
    .min(2, {
      message: "serial number must be at least 2 characters.",
    }),
  model: z
    .string({
      required_error: "model name required!",
    })
    .min(2, {
      message: "model name must be at least 2 characters.",
    }),
  availability: z
    .enum(["AVAILABLE", "BUSY", "CRASHED"], {
      required_error: "availability required!",
    })
    .optional(),
});

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
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { ChangeEvent, useState } from "react";
import { useUpdates } from "@/lib/updates-hook";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvailabilityData } from "@prisma/client";
import { cn } from "@/lib/utils";

export default function DroneForm({
  setOpen,
}: {
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  const form = useForm<z.infer<typeof dronesFormSchema>>({
    resolver: zodResolver(dronesFormSchema),
    defaultValues: {
      availability: "AVAILABLE",
    },
  });

  const [FileData, setFileData] = useState<File | null>(null);

  const [load, setLoad] = useState<boolean>(false);
  const [imgElementData, setImgElementData] = useState<boolean>(true);

  const { updateDrones, setUpdateDrones } = useUpdates();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0].size / 1024 > 500) {
      setImgElementData(true);
      setFileData(event.target.files[0]);
    } else {
      setImgElementData(false);
    }
  };

  async function onSubmit(values: z.infer<typeof dronesFormSchema>) {
    setLoad(true);
    const formData = new FormData();

    if (FileData) {
      formData.append("drone-img", FileData);
    }

    formData.append("serial-number", values.serialNumber);
    formData.append("model", values.model);
    formData.append("availability", "true");

    const response = await fetch("/api/drone/create", {
      method: "POST",
      body: formData,
    });
    
    setLoad(false);
    if (response.ok) {
      setUpdateDrones(!updateDrones);
      setOpen(false);
    }
  }

  return (
    <ScrollArea className=" max-h-[65vh] sm:max-h-[75vh] sm:h-fit">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 px-3 sm:px-1"
        >
          <h1 className=" text-md font-semibold">Drone Informations.</h1>
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="model" {...field} />
                </FormControl>
                <FormDescription>Fill with model</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input placeholder="serial number" {...field} />
                </FormControl>
                <FormDescription>Fill with ur serial number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input type="file" onChange={handleFileChange} />
          {!imgElementData && (
            <p className=" text-destructive text-sm relative bottom-3">
              image is requiured! and minimum size must greater than 500kb
            </p>
          )}
          {/* <div className=" relative">
            <CldUploadWidget uploadPreset="l1rsxvfy">
              {({ open }) => {
                return <Button onClick={() => open()}>Upload an Image</Button>;
              }}
            </CldUploadWidget>
          </div> */}
          {/* <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Availability</FormLabel>
                  <FormDescription>
                    This drone is must be available when register
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={true} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(AvailabilityData).map((value) => (
                      <SelectItem className={cn(value === "BUSY" && "hidden")} key={`available-${value}`} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={load}
            variant={"default"}
            type="submit"
            className=" w-full"
          >
            {!load ? (
              "Register"
            ) : (
              <div className=" flex items-center space-x-2 animate-pulse">
                <Loader width={15} height={15} className=" animate-spin" />
                <p>Please wait</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
