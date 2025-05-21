const mongoose = require("mongoose");
const nodemailer=require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware exports k phle

fileSchema.post("save", async function (doc) {
  try {
    console.log('DOC:', doc);

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  //send mail
  let info=await transporter.sendMail({
    from:'Codehelp-By Babbar',
    to:doc.mail,
    subject:"New File Uploaded on Cloudinary",
    html:'<h2>Hello Jee</h2> <p>File Uploaded</p>',
  })
  console.log("INFO",info);

}
  catch(error){
    console.error(error);
  }
});


module.exports = mongoose.model("File", fileSchema);
