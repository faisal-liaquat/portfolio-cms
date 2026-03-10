import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

const folder = 'portfolio-media'

const stripExtension = (filename: string) => filename.replace(/\.[^/.]+$/, '')

export const cloudinaryAdapter = () => ({
  name: 'cloudinary' as const,

  handleUpload: async ({ file }: { file: { filename: string; buffer: Buffer } }) => {
    await new Promise<void>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          public_id: `${folder}/${stripExtension(file.filename)}`,
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) return reject(error)
          resolve()
        },
      )
      stream.end(file.buffer)
    })
  },

  handleDelete: async ({ filename }: { filename: string }) => {
    await cloudinary.uploader.destroy(`${folder}/${stripExtension(filename)}`, {
      resource_type: 'image',
    })
  },

  generateURL: async ({ filename }: { filename: string }) => {
    return cloudinary.url(`${folder}/${stripExtension(filename)}`, {
      secure: true,
      resource_type: 'auto',
    })
  },

  staticHandler: async (
    _req: Request,
    { params }: { params: { filename: string } },
  ): Promise<Response> => {
    const url = cloudinary.url(`${folder}/${stripExtension(params.filename)}`, {
      secure: true,
      resource_type: 'auto',
    })
    return Response.redirect(url, 302)
  },
})
