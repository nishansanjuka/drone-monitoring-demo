import { AvailabilityData } from "@prisma/client";
import { icons } from "lucide-react";

interface Routes {
  name: string;
  href: string;
  icon: keyof typeof icons;
}

interface Lands {
  label: string;
  value: string;
}
export const routes: Routes[] = [
  {
    name: "Home",
    href: "/",
    icon: "Home",
  },
  {
    name: "Farmers",
    href: "/dashboard/farmers",
    icon: "Tractor",
  },
  {
    name: "Drones",
    href: "/dashboard/drones",
    icon: "Origami",
  },
  {
    name: "Monitor",
    href: "/monitors",
    icon: "ScreenShare",
  },
];

export const agriculturalFields: Lands[] = [
  {
    label: "Tea Plantation",
    value: "tea",
  },
  {
    label: "Coconut Grove",
    value: "coconut",
  },
  {
    label: "Rice Paddy",
    value: "rice",
  },
  {
    label: "Wheat Field",
    value: "wheat",
  },
  {
    label: "Coffee Plantation",
    value: "coffee",
  },
  {
    label: "Sugarcane Field",
    value: "sugarcane",
  },
  {
    label: "Banana Plantation",
    value: "banana",
  },
  {
    label: "Cotton Field",
    value: "cotton",
  },
  {
    label: "Vineyard",
    value: "vineyard",
  },
  {
    label: "Olive Grove",
    value: "olive",
  },
];


// export const droneAvailabilityData : AvailabilityData[] = [
//   ''
// ]