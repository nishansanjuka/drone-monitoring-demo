"use server";

import { Farmer, Field, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { farmersFormSchema } from "@/app/dashboard/farmers/form";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";

export async function UpdateFarmer({
  firstName,
  lastName,
  landName,
  landType,
  acres,
  id,
}: z.infer<typeof farmersFormSchema> & { id: string }): Promise<boolean> {
  try {
    const session = await currentUser();

    if (session) {
      const farmer = await prisma.farmer.findUnique({ where: { id } });

      if (farmer && farmer.fieldId) {
        await prisma.farmer.update({
          where: { id },
          data: {
            firstName,
            lastName,
          },
        });

        await prisma.field.update({
          where: {
            id: farmer.fieldId,
          },
          data: {
            name: landName,
            type: landType,
            acres: parseInt(acres),
          },
        });

        return true;
      } else {
        return false;
      }
    } else {
      throw new Error("Unauthorized!");
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function CreateFarmer({
  firstName,
  lastName,
  landName,
  landType,
  acres,
}: z.infer<typeof farmersFormSchema>): Promise<boolean> {
  try {
    const session = await currentUser();
    if (session) {
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
    } else {
      throw new Error("Unauthorized!");
    }
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

export async function GetFarmer(id: string): Promise<Farmer | null> {
  try {
    const farmer = await prisma.farmer.findUnique({ where: { id } });
    console.log(farmer);
    return farmer;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
    return null;
  }
}

export async function GetFarmerByAssignedDrone(
  id: number
): Promise<FarmerWithFields | undefined> {
  try {
    const farmer = await prisma.farmer.findFirst({
      where: { droneId: id },
      include: { field: true },
    });
    if (farmer) {
      return farmer as any;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteFarmer(id: string): Promise<boolean> {
  try {
    const session = await currentUser();
    if (session) {
      await prisma.farmer.delete({ where: { id } });
      return true;
    } else {
      throw new Error("Unauthorized!");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
    return false;
  }
}
