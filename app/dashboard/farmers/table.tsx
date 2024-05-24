"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { useUpdates } from "@/lib/updates-hook";
import React, { Fragment, useEffect, useState } from "react";
import {
  FarmerWithFields,
  GetFarmers,
  deleteFarmer,
} from "@/lib/handle-farmer";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormContainer from "./container";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Delete, Ellipsis, FilePenLine, Trash } from "lucide-react";
import Link from "next/link";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function FarmersTable() {
  const [farmers, setFarmers] = useState<FarmerWithFields[] | undefined>([]);
  const [Load, setLoad] = useState<boolean>(true);
  const { updateFarmers, setUpdateFarmers } = useUpdates();

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  useEffect(() => {
    async function getData() {
      setLoad(true);
      setFarmers(await GetFarmers());
      setLoad(false);
    }
    getData();
  }, [updateFarmers]);

  return (
    <Fragment>
      {Load ? (
        <Fragment>
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className=" w-[120px] h-7" />
            </div>
          </div>

          <Card
            x-chunk="dashboard-06-chunk-0"
            className=" w-[85vw] xl:w-full mx-auto border-none overflow-x-hidden"
          >
            <CardHeader>
              <Skeleton className=" w-[160px] h-8" />
              <Skeleton className=" w-[450px] h-5" />
            </CardHeader>
            <CardContent>
              <div>
                <div className=" space-y-2">
                  <div className=" flex space-x-2 border-none">
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <div>
                      <span className="sr-only">Actions</span>
                    </div>
                  </div>
                  <div className=" flex space-x-2 border-none">
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <div>
                      <span className="sr-only">Actions</span>
                    </div>
                  </div>
                  <div className=" flex space-x-2 border-none">
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <div>
                      <span className="sr-only">Actions</span>
                    </div>
                  </div>
                  <div className=" flex space-x-2 border-none">
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <div>
                      <span className="sr-only">Actions</span>
                    </div>
                  </div>
                  <div className=" flex space-x-2 border-none">
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <div>
                      <span className="sr-only">Actions</span>
                    </div>
                  </div>
                  <div className=" flex space-x-2 border-none">
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <Skeleton className=" w-[45vw] h-8" />
                    <div>
                      <span className="sr-only">Actions</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter> */}
          </Card>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <FormContainer />
            </div>
          </div>
          <Card
            x-chunk="dashboard-06-chunk-0"
            className=" w-[85vw] xl:w-full mx-auto"
          >
            <CardHeader>
              <CardTitle>All Farmers</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                quisquam.
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
                    <TableHead>Assigned?</TableHead>
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
                              variant={"default"}
                              className=" w-fit bg-green-500 hover:bg-green-400 flex items-center justify-center space-x-1"
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
                          <TableCell className="">
                            <Badge
                              variant={
                                farmer.droneId === null
                                  ? "outline"
                                  : "destructive"
                              }
                              className=" w-fit flex items-center justify-center space-x-1"
                            >
                              {farmer.droneId !== null ? "Assigned" : "Available"}
                            </Badge>
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
                                    href={`/dashboard/update-farmer?id=${farmer.id}&fname=${farmer.firstName}&lname=${farmer.lastName}&land=${farmer.field.name}&type=${farmer.field.type}&size=${farmer.field.acres}`}
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
            {/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter> */}
          </Card>
        </Fragment>
      )}
    </Fragment>
  );
}
