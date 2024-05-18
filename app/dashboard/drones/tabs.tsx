"use client";

import Image from "next/image";

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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Fragment, useEffect, useState } from "react";
// import { GetDrones } from "@/lib/handle-drone";
import { Drone } from "@prisma/client";
import { GetDrones } from "@/lib/handle-drone";
import { useUpdates } from "@/lib/updates-hook";

export default function PageTabs() {
  const [droneData, setDroneData] = useState<Drone[] | undefined>([]);
  const [Load, setLoad] = useState<boolean>(true);

  const { updateDrones } = useUpdates();

  useEffect(() => {
    async function getData() {
      setLoad(true);
      setDroneData(await GetDrones());
      setLoad(false);
    }
    getData();
  }, [updateDrones]);

  return (
    <Fragment>
      {Load ? (
        <h1 className=" text-lg font-bold mt-10 ml-5">Please wait...</h1>
      ) : (
        <Fragment>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0" className=" -translate-x-2 sm:translate-x-0">
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {droneData &&
                      droneData.map((drone) => (
                        <TableRow key={`drone-${drone.serialNumber}`}>
                          <TableCell className="">
                            <Image
                              alt={drone.serialNumber}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={`/media/${drone.image}`}
                              width="64"
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
                            <Button
                              disabled={drone.availability === "BUSY"}
                              variant={"default"}
                              className=" text-xs rounded-full disabled:bg-slate-800 bg-green-500 hover:bg-green-400"
                            >
                              ASSIGN
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="available">
            <Card x-chunk="dashboard-06-chunk-0">
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {droneData &&
                      droneData
                        .filter((objs) => objs.availability === "AVAILABLE")
                        .map((drone) => (
                          <TableRow key={`drone-${drone.serialNumber}`}>
                            <TableCell className="">
                              <Image
                                alt={drone.serialNumber}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={`/media/${drone.image}`}
                                width="64"
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
                              <Button
                                variant={"default"}
                                className=" text-xs rounded-full bg-green-500 hover:bg-green-400"
                              >
                                ASSIGN
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="taken">
            <Card x-chunk="dashboard-06-chunk-0">
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {droneData &&
                      droneData
                        .filter((objs) => objs.availability === "BUSY")
                        .map((drone) => (
                          <TableRow key={`drone-${drone.serialNumber}`}>
                            <TableCell className="">
                              <Image
                                alt={drone.serialNumber}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={`/media/${drone.image}`}
                                width="64"
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
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Fragment>
      )}
    </Fragment>
  );
}
