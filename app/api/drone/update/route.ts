import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase.config";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await currentUser();

  if (session) {
    const body = await request.formData();
    var downloadUrl: string | null = null;
    var imgPath: string | null = null;

    const img = body.get("drone-img") as File;
    const serialNumber = body.get("serial-number") as string;
    const model = body.get("model") as string;
    const availability = body.get("availability") as string;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (img) {
      const storageRef = ref(
        storage,
        `drones/${generateRandomString(15)}-${img.name}`
      );

      const metadata = {
        contentType: img.type,
      };

      const snapshot = await uploadBytesResumable(storageRef, img, metadata);
      downloadUrl = await getDownloadURL(snapshot.ref);
      imgPath = snapshot.ref.fullPath;
    }

    if (serialNumber && model && availability) {
      if (id) {
        const existDrone = await prisma.drone.findUnique({
          where: { id: parseInt(id) },
        });
        const assigendFarmer = await prisma.farmer.findFirst({
          where: { droneId: parseInt(id) },
        });

        if (assigendFarmer && availability === "true") {
          await prisma.farmer.update({
            where: { id: assigendFarmer.id },
            data: {
              droneId: null,
            },
          });
        }

        if (existDrone) {
          await prisma.drone.update({
            where: {
              id: parseInt(id),
            },
            data: {
              serialNumber,
              model,
              availability: availability === "true" ? "AVAILABLE" : "BUSY",
              image: downloadUrl ? downloadUrl : existDrone.image,
              imgPath: imgPath ? imgPath : existDrone.imgPath,
            },
          });
        }
        return Response.json({ done: "OK" }, { status: 200 });
      } else {
        return new Response("Bad Request", { status: 400 });
      }
    } else {
      return new Response("Bad Request", { status: 400 });
    }
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
}

// async function writeFile(fileContent: Buffer, fileName: string): Promise<void> {
//   const filePath = path.join(process.cwd() + "/public", "/media", fileName);

//   await fs.writeFile(filePath, fileContent);
// }

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
