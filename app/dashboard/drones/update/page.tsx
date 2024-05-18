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
    .boolean({
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
import React, { ChangeEvent, useEffect, useState } from "react";
import { useUpdates } from "@/lib/updates-hook";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
// import { CreateDrone } from "@/lib/handle-drone";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter, useSearchParams } from "next/navigation";
import { AvailabilityData } from "@prisma/client";

export default function DroneUpdateForm({
  setOpen,
}: {
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof dronesFormSchema>>({
    resolver: zodResolver(dronesFormSchema),
    defaultValues: {
      model: searchParams.get("model")?.toString(),
      serialNumber: searchParams.get("serial")?.toString(),
      availability: searchParams.get("availability") === "AVAILABLE",
    },
  });

  const router = useRouter();

  const [FileData, setFileData] = useState<File | null>(null);

  const [load, setLoad] = useState<boolean>(false);

  const { updateDrones, setUpdateDrones } = useUpdates();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileData(event.target.files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof dronesFormSchema>) {
    setLoad(true);
    const formData = new FormData();

    // if (FileData) {
    //   // formData.append("drone-img", FileData);
    //   formData.append("serial-number", values.serialNumber);
    //   formData.append("model", values.model);
    //   formData.append("availability", "true");
    // }
    formData.append("serial-number", values.serialNumber);
    formData.append("model", values.model);
    formData.append(
      "availability",
      values.availability === true ? "true" : "false"
    );
    const response = await fetch(
      `/api/drone/update?id=${searchParams.get("id")}`,
      {
        method: "POST",
        body: formData,
      }
    );
    setLoad(false);
    if (response.ok) {
      setUpdateDrones(!updateDrones);
      router.push("/dashboard/drones");
    }
  }

  return (
    <div className="w-[90vw] sm:w-[500px] bg-transparent border border-border p-5 rounded-md mx-auto ">
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
          {/* <div className=" relative">
            <CldUploadWidget uploadPreset="l1rsxvfy">
              {({ open }) => {
                return <Button onClick={() => open()}>Upload an Image</Button>;
              }}
            </CldUploadWidget>
          </div> */}
          <FormField
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
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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
