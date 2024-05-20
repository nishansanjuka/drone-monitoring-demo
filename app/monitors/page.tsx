"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetDrone, GetDrones } from "@/lib/handle-drone";
import {
  FarmerWithFields,
  GetFarmerByAssignedDrone,
  GetFarmers,
} from "@/lib/handle-farmer";
import { useUpdates } from "@/lib/updates-hook";
import { Drone } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

export default function MonitorsPage() {
  const [droneData, setDroneData] = useState<Drone[] | undefined>([]);
  const [farmers, setFarmers] = useState<FarmerWithFields[] | undefined>([]);
  const [Load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setLoad(true);
      setDroneData(await GetDrones());
      setFarmers(await GetFarmers());
      setLoad(false);
    }
    getData();
  }, []);

  return (
    <Tabs defaultValue="farmers">
      {Load ? (
        <h1 className=" font-bold text-lg">Please wait...</h1>
      ) : (
        <Fragment>
          <div className="flex items-center justify-between mr-2 sm:mr-0">
            <TabsList>
              <TabsTrigger value="farmers">Farmers</TabsTrigger>
              <TabsTrigger value="drones">Drones</TabsTrigger>
            </TabsList>
          </div>
          {farmers ? (
            <TabsContent value="farmers">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className=" w-[85vw] xl:w-full mx-auto border-none overflow-x-hidden"
              >
                <CardHeader>
                  <CardTitle>Farmers</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Farmer ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Type of The Land</TableHead>
                        <TableHead>Size in Acres</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {farmers &&
                        farmers
                          .sort(
                            (a, b) =>
                              new Date(a.createdAt).getTime() -
                              new Date(b.createdAt).getTime()
                          )
                          .map((farmer) => (
                            <TableRow key={`farmer-${farmer.id}`}>
                              <TableCell className="font-bold text-muted-foreground">
                                {farmer.id}
                              </TableCell>
                              <TableCell className="">
                                {farmer.firstName}
                              </TableCell>
                              <TableCell className="">
                                {farmer.lastName}
                              </TableCell>
                              <TableCell className="">
                                {farmer.field.type}
                              </TableCell>
                              <TableCell className="">
                                {farmer.field.acres}
                              </TableCell>
                              <TableCell className=" font-bold text-muted-foreground">
                                {Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }).format(new Date(farmer.updatedAt))}
                              </TableCell>
                              <TableCell className=" font-bold text-muted-foreground">
                                {Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }).format(new Date(farmer.updatedAt))}
                              </TableCell>
                              <TableCell>
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button
                                      disabled={farmer.droneId ? false : true}
                                      variant="outline"
                                    >
                                      {farmer.droneId === null
                                        ? "Not Assigned"
                                        : "Assigned Drone"}
                                    </Button>
                                  </DrawerTrigger>
                                  <DrawerContent>
                                    <DDrone id={farmer.droneId} />
                                  </DrawerContent>
                                </Drawer>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ) : (
            <p>not found :/</p>
          )}

          {droneData ? (
            <TabsContent value="drones">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className=" w-[85vw] xl:w-full mx-auto border-none overflow-x-hidden"
              >
                <CardHeader>
                  <CardTitle>Drones</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Serial Number</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Assign</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead>Farmer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {droneData &&
                        droneData
                          .sort(
                            (a, b) =>
                              new Date(a.createdAt).getTime() -
                              new Date(b.createdAt).getTime()
                          )
                          .map((drone) => (
                            <TableRow key={`drone-${drone.serialNumber}`}>
                              <TableCell className="">
                                <Image
                                  alt={drone.serialNumber}
                                  className="aspect-square rounded-md object-cover w-64 xl:w-36 bg-muted"
                                  height="500"
                                  src={
                                    drone.image
                                      ? drone.image
                                      : "/public/vercel.svg"
                                  }
                                  width="500"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {drone.model}
                              </TableCell>
                              <TableCell className=" font-bold text-muted-foreground">
                                {drone.serialNumber}
                              </TableCell>
                              <TableCell className="">
                                <Badge
                                  variant={
                                    drone.availability === "AVAILABLE"
                                      ? "outline"
                                      : "destructive"
                                  }
                                >
                                  {drone.availability}
                                </Badge>
                              </TableCell>
                              <TableCell className=" font-bold text-muted-foreground">
                                {Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }).format(new Date(drone.updatedAt))}
                              </TableCell>
                              <TableCell className=" font-bold text-muted-foreground">
                                {Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }).format(new Date(drone.updatedAt))}
                              </TableCell>
                              <TableCell>
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <Button
                                      disabled={
                                        drone.availability === "AVAILABLE"
                                      }
                                      variant="outline"
                                    >
                                      {drone.availability === "AVAILABLE"
                                        ? "Not Assigned"
                                        : "Assigned Farmer"}
                                    </Button>
                                  </DrawerTrigger>
                                  <DrawerContent>
                                    <Farmer id={drone.id} />
                                  </DrawerContent>
                                </Drawer>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ) : (
            <p>not found :/</p>
          )}
        </Fragment>
      )}
    </Tabs>
  );
}

const Farmer = ({ id }: { id: number }) => {
  const [farmer, setFarmer] = useState<FarmerWithFields | undefined>();
  const [Load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setLoad(true);
      setFarmer(await GetFarmerByAssignedDrone(id));
      setLoad(false);
    }
    getData();
  }, [id]);

  return (
    <div className=" w-full h-fit p-5">
      {Load ? (
        <p className=" font-bold text-lg">please wait...</p>
      ) : farmer ? (
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Farmer Details</CardTitle>
            <CardDescription>
              assigned farmer details according to drone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="framework"
                    className=" text-muted-foreground font-bold mb-5"
                  >
                    Farmer : {farmer.id}
                  </Label>
                  <div className=" flex flex-col space-y-1">
                    <p className=" capitalize">
                      Name : {farmer.firstName} {farmer.lastName}
                    </p>
                    <p className=" capitalize">
                      Land Type : {farmer.field.name}
                    </p>
                    <p className=" capitalize">
                      Land Type : {farmer.field.type}
                    </p>
                    <p className=" capitalize">
                      Size is acres : {farmer.field.acres} AC
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      ) : (
        <p>Not found :/</p>
      )}
    </div>
  );
};

const DDrone = ({ id }: { id: number | null }) => {
  const [drone, setDrone] = useState<Drone | undefined>();
  const [Load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setLoad(true);
      if (id) {
        setDrone(await GetDrone(id));
      }
      setLoad(false);
    }
    getData();
  }, [id]);

  return (
    <div className=" w-full h-fit p-5">
      {Load ? (
        <p className=" font-bold text-lg">please wait...</p>
      ) : drone ? (
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Drone Details</CardTitle>
            <CardDescription>
              assigned farmer details according to drone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    htmlFor="framework"
                    className=" text-muted-foreground font-bold mb-5"
                  >
                    Drone : {drone.id}
                  </Label>
                  <Image
                    alt={drone.serialNumber}
                    className="aspect-square rounded-md object-cover w-64 xl:w-36 bg-muted"
                    height="500"
                    src={drone.image ? drone.image : "/public/vercel.svg"}
                    width="500"
                  />
                  <div className=" flex flex-col space-y-1">
                    <p className=" capitalize">Model : {drone.model}</p>
                    <p className=" capitalize">
                      Serial Number : {drone.serialNumber}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      ) : (
        <p>Not found :/</p>
      )}
    </div>
  );
};
