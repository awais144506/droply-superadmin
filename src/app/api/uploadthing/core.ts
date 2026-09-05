import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define a route for Bank QR Codes (max 1 image, 4MB)
  bankQrUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ metadata, file }) => {
      // This runs on your server after the file is uploaded to UploadThing
      console.log("Upload complete, File URL:", file.url);
      return { uploadedBy: "admin", url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;