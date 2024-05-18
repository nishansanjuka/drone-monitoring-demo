"use server";

import { Drone, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetDrones(): Promise<Drone[] | undefined> {
  try {
    const farmers = await prisma.drone.findMany();
    return farmers as any;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteDrone(id: number): Promise<boolean> {
  try {
    await prisma.drone.delete({ where: { id } });
    return true;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
    return false;
  }
}
