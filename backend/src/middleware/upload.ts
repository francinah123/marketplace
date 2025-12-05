import multer from "multer";
import path from "path";

// Local disk storage (swap for S3 memoryStorage later)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

export const uploadImages = multer({ storage });

export const uploadVideos = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files allowed"));
  },
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

export const uploadAudios = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) cb(null, true);
    else cb(new Error("Only audio files allowed"));
  },
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

export const uploadProducts = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only product images allowed"));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ✅ Extended video upload with stricter MIME type support and larger size limit
export const videoUpload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files allowed"));
    }
  },
});

