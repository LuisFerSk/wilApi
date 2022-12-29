const multer = require('multer')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage/imgs')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${uuid.v4()}.png`)
    }
})

const upload = multer({
    storage,
})

module.exports = upload;