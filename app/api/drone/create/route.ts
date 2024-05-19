import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { storage } from "@/lib/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const session = await currentUser();

  if (session) {
    const body = await request.formData();

    const img = body.get("drone-img") as File;
    const serialNumber = body.get("serial-number") as string;
    const model = body.get("model") as string;
    const availability = body.get("availability") as string;

    if (img && serialNumber && model && availability) {
      const storageRef = ref(
        storage,
        `drones/${generateRandomString(15)}-${img.name}`
      );

      const metadata = {
        contentType: img.type,
      };

      const snapshot = await uploadBytesResumable(storageRef, img, metadata);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      await prisma.drone.create({
        data: {
          serialNumber,
          model,
          availability: availability === "true" ? "AVAILABLE" : "BUSY",
          image: downloadUrl,
          imgPath: snapshot.ref.fullPath,
        },
      });

      return Response.json({ done: "OK" }, { status: 201 });
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
