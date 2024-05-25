"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssignFarmer } from "@/lib/handle-assign";
import { fromUrlSafeBase64 } from "@/lib/handle-base-64";
import {
  FarmerWithFields,
  GetFarmers,
  deleteFarmer,
} from "@/lib/handle-farmer";
import { useUpdates } from "@/lib/updates-hook";
import { Ellipsis, FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import noDrone from "@/public/assets/no-drone.jpg";

export default function AssignPage() {
  const searchParams = useSearchParams();
  const [farmers, setFarmers] = useState<FarmerWithFields[] | undefined>([]);
  const [Load, setLoad] = useState<boolean>(true);

  const { setUpdateFarmers, updateFarmers } = useUpdates();

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setLoad(true);
      setFarmers(await GetFarmers());
      setLoad(false);
    }
    getData();
  }, []);

  return (
    <Fragment>
      {Load ? (
        <h1 className=" text-lg font-bold">Please wait...</h1>
      ) : (
        <div className=" w-full flex items-center justify-center">
          <Card className="w-full h-full max-w-[90vw]">
            <CardHeader>
              <CardTitle>Assign Farmer</CardTitle>
              <CardDescription>
                <Image
                  alt={"assign-img"}
                  className="aspect-square rounded-md mt-3 object-cover w-64 xl:w-36 bg-muted"
                  height="500"
                  src={fromUrlSafeBase64(searchParams.get("img")) || noDrone}
                  width="500"
                />
                <h1 className=" text-lg underline my-2">Drone details</h1>
                <h1>Drone id : {searchParams.get("id")}</h1>
                <h1>Drone model : {searchParams.get("model")}</h1>
                <h1>Drone serial number : {searchParams.get("serial")}</h1>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <ScrollArea className=" h-[50vh] sm:h-[70vh] ">
          </ScrollArea> */}
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
                    <TableHead>Assign</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
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
                        <TableRow
                          key={`farmers-table${farmer.id}`}
                          className=" hover:bg-transparent"
                        >
                          <TableCell className="">
                            <p className=" text-muted-foreground font-bold">
                              {farmer.id}
                            </p>
                          </TableCell>
                          <TableCell>{farmer.firstName}</TableCell>
                          <TableCell>{farmer.lastName}</TableCell>
                          <TableCell className="">
                            {farmer.field.type}
                          </TableCell>
                          <TableCell className="">
                            <Badge
                              variant={"destructive"}
                              className=" w-fit flex items-center justify-center space-x-1"
                            >
                              <p>{`${Intl.NumberFormat(undefined, {
                                minimumIntegerDigits: 2,
                              }).format(farmer.field.acres)}`}</p>
                              <p>AC</p>
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
                            }).format(new Date(farmer.createdAt))}
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
                            <Button
                              disabled={farmer.droneId === null ? false : true}
                              onClick={async () => {
                                await AssignFarmer({
                                  farmer: farmer.id,
                                  drone: searchParams.get("id"),
                                });
                                router.back();
                              }}
                              variant={"default"}
                              className=" text-xs rounded-full disabled:bg-slate-800 bg-green-500 hover:bg-green-400"
                            >
                              ASSIGN
                            </Button>
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
                                    href={`/dashboard/farmers/update?id=${farmer.id}&fname=${farmer.firstName}&lname=${farmer.lastName}&land=${farmer.field.name}&type=${farmer.field.type}&size=${farmer.field.acres}`}
                                    className=" flex items-center"
                                  >
                                    <FilePenLine className="mr-2 h-4 w-4" />
                                    <span>update</span>
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    deleteFarmer(farmer.id);
                                    setUpdateFarmers(!updateFarmers);
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
        </div>
      )}
    </Fragment>
  );
}
