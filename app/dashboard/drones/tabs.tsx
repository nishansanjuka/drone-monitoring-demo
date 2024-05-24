"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
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

import { Ellipsis, FilePenLine, Trash } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Fragment, useEffect, useState } from "react";
// import { GetDrones } from "@/lib/handle-drone";
import { Drone } from "@prisma/client";
import { GetDrones, deleteDrone } from "@/lib/handle-drone";
import { useUpdates } from "@/lib/updates-hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toUrlSafeBase64 } from "@/lib/handle-base-64";

export default function PageTabs() {
  const [droneData, setDroneData] = useState<Drone[] | undefined>([]);
  const [Load, setLoad] = useState<boolean>(true);

  const { updateDrones, setUpdateDrones } = useUpdates();
  const router = useRouter();

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
                      <TableHead>Updated</TableHead>
                      <TableHead>Action</TableHead>
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
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/dashboard/assign-drone?id=${
                                      drone.id
                                    }&model=${drone.model}&serial=${
                                      drone.serialNumber
                                    }&availability=${
                                      drone.availability
                                    }&img=${toUrlSafeBase64(drone.image)}`
                                  )
                                }
                                disabled={drone.availability === "BUSY"}
                                variant={"default"}
                                className=" text-xs rounded-full disabled:bg-slate-800 bg-green-500 hover:bg-green-400"
                              >
                                ASSIGN
                              </Button>
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    <Ellipsis width={15} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-24">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-foreground hover:text-foreground/70 cursor-pointer">
                                    <Link
                                      href={`/dashboard/update-drone?id=${
                                        drone.id
                                      }&model=${drone.model}&serial=${
                                        drone.serialNumber
                                      }&availability=${
                                        drone.availability
                                      }&img=${toUrlSafeBase64(drone.image)}`}
                                      className=" flex items-center"
                                    >
                                      <FilePenLine className="mr-2 h-4 w-4" />
                                      <span>update</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={async () => {
                                      await deleteDrone(drone.id);
                                      setUpdateDrones(!updateDrones);
                                    }}
                                    className="text-destructive hover:text-destructive/70 cursor-pointer"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="available"
            className=" w-[85vw] xl:w-full mx-auto border-none overflow-x-hidden"
          >
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
                      <TableHead>Updated</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {droneData &&
                      droneData
                        .filter((objs) => objs.availability === "AVAILABLE")
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
                              <Button
                                onClick={() =>
                                  router.push(
                                    `/dashboard/assign-drone?id=${
                                      drone.id
                                    }&model=${drone.model}&serial=${
                                      drone.serialNumber
                                    }&availability=${
                                      drone.availability
                                    }&img=${toUrlSafeBase64(drone.image)}`
                                  )
                                }
                                disabled={drone.availability === "BUSY"}
                                variant={"default"}
                                className=" text-xs rounded-full disabled:bg-slate-800 bg-green-500 hover:bg-green-400"
                              >
                                ASSIGN
                              </Button>
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    <Ellipsis width={15} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-24">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-foreground hover:text-foreground/70 cursor-pointer">
                                    <Link
                                      href={`/dashboard/drones/update?id=${
                                        drone.id
                                      }&model=${drone.model}&serial=${
                                        drone.serialNumber
                                      }&availability=${
                                        drone.availability
                                      }&img=${toUrlSafeBase64(drone.image)}`}
                                      className=" flex items-center"
                                    >
                                      <FilePenLine className="mr-2 h-4 w-4" />
                                      <span>update</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={async () => {
                                      await deleteDrone(drone.id);
                                      setUpdateDrones(!updateDrones);
                                    }}
                                    className="text-destructive hover:text-destructive/70 cursor-pointer"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
                      <TableHead>Registered</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Action</TableHead>
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    <Ellipsis width={15} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-24">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-foreground hover:text-foreground/70 cursor-pointer">
                                    <Link
                                      href={`/dashboard/drones/update?id=${
                                        drone.id
                                      }&model=${drone.model}&serial=${
                                        drone.serialNumber
                                      }&availability=${
                                        drone.availability
                                      }&img=${toUrlSafeBase64(drone.image)}`}
                                      className=" flex items-center"
                                    >
                                      <FilePenLine className="mr-2 h-4 w-4" />
                                      <span>update</span>
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={async () => {
                                      await deleteDrone(drone.id);
                                      setUpdateDrones(!updateDrones);
                                    }}
                                    className="text-destructive hover:text-destructive/70 cursor-pointer"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
