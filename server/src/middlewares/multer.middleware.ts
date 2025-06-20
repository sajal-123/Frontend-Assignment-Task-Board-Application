import multer from "multer";
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb->calllback
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // starting use original name (kyoki jaise hi aayegi tabhi cloudinary use lelega) but not use it in production insted to use this use something else
      cb(null,file.originalname)
    }
  })
  
export const upload = multer({ storage })

