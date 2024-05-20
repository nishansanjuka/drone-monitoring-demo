"use server";

import { Drone, PrismaClient } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase.config";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GetDrones(): Promise<Drone[] | undefined> {
  try {
    const drones = await prisma.drone.findMany();
    return drones as any;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function GetDrone(id: number): Promise<Drone | undefined> {
  try {
    const drone = await prisma.drone.findFirst({ where: { id: id } });
    return drone as any;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteDrone(id: number): Promise<boolean> {
  try {
    const session = await currentUser();
    if (session) {
      const drone = await prisma.drone.findUnique({ where: { id } });
      if (drone) {
        const assignedFarmer = await prisma.farmer.findFirst({
          where: { droneId: drone.id },
        });

        if (assignedFarmer) {
          await prisma.farmer.update({
            where: { id: assignedFarmer.id },
            data: {
              droneId: null,
            },
          });
        }

        if (drone.image && drone.imgPath) {
          const desertRef = ref(storage, drone.imgPath);
          await deleteObject(desertRef);
        }
        await prisma.drone.delete({ where: { id } });
      }
      return true;
    } else {
      throw new Error("Unauthorized!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    await prisma.$disconnect();
    return false;
  }
}
