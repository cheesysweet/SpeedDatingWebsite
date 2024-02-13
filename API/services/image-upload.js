import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

/**
 * service used for uploading image
 * @author anton byström
 */


const s3 = new aws.S3()

 // filter to only stores jpeg or png images
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error("Invalid image type, only JPEG or PNG"), false);
  }
}

// upload function for storing the image
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'dt198g-speed-dating',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

export default upload;