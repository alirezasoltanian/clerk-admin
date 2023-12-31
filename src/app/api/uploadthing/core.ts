// FileRouter for your app, can contain multiple FileRoutes
import { getUser } from '@/app/_actions/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const handleAuth = async () => {
  const isAuth = (await getUser()).isAuthenticated
  const user = (await getUser()).user

  if (!isAuth) throw new Error('Unauthorized')
  return { user }
}
const f = createUploadthing()

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImage: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
    // Set permissions and file types for this FileRoute
    .middleware(async (req) => {
      // This code runs on your server before upload
      const user = (await getUser()).user

      // If you throw, the user will not be able to upload
      //   if (!user) throw new Error("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user?.name }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)
    }),
  clerkImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  // courseAttachment: f(["text", "image", "video", "audio", "pdf"])
  //   .middleware(() => handleAuthTeacher())
  //   .onUploadComplete(() => {}),
  // chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
  //   .middleware(() => handleAuthTeacher())
  //   .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
