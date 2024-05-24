"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// export const dronesFormSchema = z.object({
//   model: z
//     .string({
//       required_error: "model name required!",
//     })
//     .min(2, {
//       message: "model name must be at least 2 characters.",
//     }),
//   serialNumber: z
//     .string({
//       required_error: "serial number required!",
//     })
//     .min(2, {
//       message: "serial number must be at least 2 characters.",
//     }),
//   availability: z
//     .boolean({
//       required_error: "availability required!",
//     })
//     .optional(),
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
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useUpdates } from "@/lib/updates-hook";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
// import { CreateDrone } from "@/lib/handle-drone";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter, useSearchParams } from "next/navigation";
import { AvailabilityData } from "@prisma/client";
import { dronesFormSchema } from "../drones/form";
import Image from "next/image";
import { fromUrlSafeBase64 } from "@/lib/handle-base-64";

export default function DroneUpdateForm() {
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
  const [imgElementData, setImgElementData] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0].size / 1024 > 500) {
      setImgElementData(true);
      setFileData(event.target.files[0]);
    } else {
      setImgElementData(false);
    }
  };

  useEffect(() => {
    if (FileData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(FileData);
    } else {
      const base64Img = fromUrlSafeBase64(searchParams.get("img") || "");
      setImageSrc(`data:image/jpeg;base64,${base64Img}`);
    }
  }, [FileData, searchParams]);

  async function onSubmit(values: z.infer<typeof dronesFormSchema>) {
    setLoad(true);
    const formData = new FormData();

    if (FileData) {
      formData.append("drone-img", FileData);
    }
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

          <Image
            alt={"update-img"}
            className="aspect-square rounded-md object-cover w-64 xl:w-36 bg-muted"
            height="500"
            src={
              FileData ? imageSrc : fromUrlSafeBase64(searchParams.get("img"))
            }
            width="500"
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
