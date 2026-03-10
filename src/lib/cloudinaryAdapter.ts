import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

const folder = 'portfolio-media'

const stripExtension = (filename: string) => filename.replace(/\.[^/.]+$/, '')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cloudinaryAdapter =
  (): any =>
  ({ prefix = '' }: { collection?: unknown; prefix?: string } = {}) => ({
    name: 'cloudinary',

    handleUpload: async ({ file }: { file: { filename: string; buffer: Buffer } }) => {
      const publicId = `${folder}/${prefix ? prefix + '/' : ''}${stripExtension(file.filename)}`
      await new Promise<void>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto', public_id: publicId, overwrite: true },
          (error, result) => {
            if (error || !result) return reject(error)
            resolve()
          },
        )
        stream.end(file.buffer)
      })
    },

    handleDelete: async ({ filename }: { filename: string }) => {
      const publicId = `${folder}/${prefix ? prefix + '/' : ''}${stripExtension(filename)}`
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
    },

    generateURL: async ({ filename }: { filename: string }) => {
      const publicId = `${folder}/${prefix ? prefix + '/' : ''}${stripExtension(filename)}`
      return cloudinary.url(publicId, { secure: true, resource_type: 'auto' })
    },

    staticHandler: async (req: unknown, context: unknown): Promise<Response> => {
      const { params } = context as { params: { filename: string } }
      const publicId = `${folder}/${prefix ? prefix + '/' : ''}${stripExtension(params.filename)}`
      const url = cloudinary.url(publicId, { secure: true, resource_type: 'auto' })
      return Response.redirect(url, 302)
    },
  })
