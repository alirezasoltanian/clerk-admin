'use client'

import { onSubmitClerkResetImage } from '@/app/_actions/clerk'
// import { onSubmitArchitectResetImage } from '@/app/_action/architect';
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { FileDialog } from '@/components/file-dialog'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileWithPreview, profileImageSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateReactHelpers } from '@uploadthing/react/hooks'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Inputs {
  image: File[]
}
interface Props {
  beText: boolean
}
const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function UploadClerkProfileImage({ beText }: Props) {
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const { isUploading, startUpload } = useUploadThing('clerkImage')

  const [isPending, startTransition] = React.useTransition()
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(profileImageSchema),
  })

  const uploadToServer = async () => {
    if (!form.getValues().image) return

    try {
      startTransition(async () => {
        const resImage = await startUpload(form.getValues().image)
        const formattedImage = resImage?.map((image) => image.url)[0] || ''
        console.log(formattedImage[0])
        const res = await onSubmitClerkResetImage(formattedImage)
        if (typeof res === 'object') {
          toast.success(`${res.message}`)
          setOpen(false)
          router.refresh()
        } else {
          toast.error(`${res}`)
        }
      })
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex gap-2" asChild>
        {beText ? (
          <Button variant="outline">Edit Profile Image</Button>
        ) : (
          <button className="outline transition-colors duration-500 hover:bg-slate-400/50 bg-slate-400/10 w-full h-full"></button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Image</DialogTitle>
          <DialogDescription>
            Make changes to your profile Image here. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <div
          className="w-full 
        flex flex-col 
        "
        >
          <FileDialog
            setValue={form.setValue}
            name="image"
            maxFiles={1}
            maxSize={1024 * 1024 * 1}
            files={files}
            setFiles={setFiles}
            disabled={isPending}
          />
        </div>
        <DialogFooter className="">
          <Button
            onClick={uploadToServer}
            className="w-[80%] m-auto"
            disabled={isPending || !files}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
