"use server";

import { Farmer, Field, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { farmersFormSchema } from "@/app/dashboard/farmers/form";
import { z } from "zod";

export async function CreateFarmer({
  firstName,
  lastName,
  landName,
  landType,
  acres,
}: z.infer<typeof farmersFormSchema>): Promise<boolean> {
  try {
    const field = await prisma.field.create({
      data: {
        name: landName,
        type: landType,
        acres: parseInt(acres),
      },
    });

    await prisma.farmer.create({
      data: {
        fieldId: field.id,
        firstName,
        lastName,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export interface FarmerWithFields extends Farmer {
  field: Field;
}

export async function GetFarmers(): Promise<FarmerWithFields[] | undefined> {
  try {
    const farmers = await prisma.farmer.findMany({ include: { field: true } });
    return farmers as any;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
