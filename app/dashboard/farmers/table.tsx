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
import { Fragment, useEffect, useState } from "react";
import { FarmerWithFields, GetFarmers } from "@/lib/handle-farmer";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormContainer from "./container";
import { Skeleton } from "@/components/ui/skeleton";

export default function FarmersTable() {
  const [farmers, setFarmers] = useState<FarmerWithFields[] | undefined>([]);
  const [Load, setLoad] = useState<boolean>(true);
  const { update } = useUpdates();

  useEffect(() => {
    async function getData() {
      setLoad(true);
      setFarmers(await GetFarmers());
      setLoad(false);
    }
    getData();
  }, [update]);

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
            className=" w-[85vw] mx-auto border-none overflow-x-hidden"
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
          <Card x-chunk="dashboard-06-chunk-0" className=" w-[85vw] mx-auto">
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
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmers &&
                    farmers.map((farmer) => (
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
                        <TableCell className="">{farmer.field.type}</TableCell>
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
