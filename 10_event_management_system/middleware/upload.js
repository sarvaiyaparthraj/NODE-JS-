import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folderName = "uploads/";

    if (file.fieldname === "eventIMG") {
      folderName += "eventIMG";
    }

    if (file.fieldname === "eventPoster") {
      folderName += "eventPoster";
    }
    if (file.fieldname === "eventBanner") {
      folderName += "eventBanner";
    }
    if (file.fieldname === "eventSpeaker") {
      folderName += "eventSpeaker";
    }
    if (file.fieldname === "eventDocument") {
      folderName += "eventDocument";
    } else {
      folderName = "Other";
    }
    fs.mkdirSync(folderName, { recursive: true });

    return cb(null, folderName);
  },
});

const fileFilter = (req, file, cd) => {
  const imgType = ["image/jpg", "image/jpeg", "image/png"];

  const documentType = ["application/pdf"];

  if (file.fieldname === "eventDocument") {
    if (documentType.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      cb(new Error("Only pdf format allowed"));
    }
  } else {
    if (imgType.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      cb(new Error("only jpg,jpeg or png format allowed"));
    }
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploads;