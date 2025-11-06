import { v2 as cloudinary } from 'cloudinary';

// Cloudinary ayarları
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'vera-upload', 
    });

    res.status(200).json({ secure_url: uploadResponse.secure_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Resim yüklenirken hata oluştu' });
  }
}
