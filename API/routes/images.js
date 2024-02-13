import { Router } from 'express';
import upload from '../services/image-upload.js';
const router = Router();

/**
 * routes for handing images
 * @author anton byström
 */

const singleUpload = upload.single('image')
router.route("").post(function(req, res) {
    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(404).send({errors: [{title: "error in image upload", details: err.message}]})
        }
        return res.json({'imageUrl': req.file.location})
    })
})

export default router;
