import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FormContainer from "./container";
import PageTabs from "./tabs";

export default function Drones() {
  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mr-2 sm:mr-0">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="taken">Taken</TabsTrigger>
          </TabsList>
          <FormContainer />
        </div>
        <PageTabs />
      </Tabs>
    </>
  );
}
