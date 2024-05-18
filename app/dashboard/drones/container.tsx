"use client";

import { PopDrawer } from "@/components/drawer";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import DroneForm from "./form";

export default function FormContainer() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div>
      <PopDrawer
        buttonTrigger={
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Drone
            </span>
          </Button>
        }
        title={"Add New Drone"}
        description={"create new drone bla bla bla"}
        content={<DroneForm setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
