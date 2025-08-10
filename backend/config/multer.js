import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
function fileFilter(req, file, cb) {

  const allowedFiles = [`image/png`, `image/jpg`, `image/jpeg`, `image/webp`, `image/gif`];
  if (!allowedFiles.includes(file.mimetype)) {
    cb(new Error(`Invalid file type ${file.mimetype}`), false)
  } else {
    cb(null, true)
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })
export default upload