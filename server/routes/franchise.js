require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // files temporarily stored here

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });
const parentFolderId = process.env.GDRIVE_FOLDER_ID; // ✅ fix: use const here
async function createFolder(name, parentId) {
  const folderMetadata = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parentId],
  };
  const folder = await drive.files.create({
    requestBody: folderMetadata,
    fields: 'id, name',
  });
  return folder.data; // returns { id, name }
}

async function ensureFolderExists(name, parentId) {
  const response = await drive.files.list({
    q: `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)',
  });

  if (response.data.files.length > 0) {
    return response.data.files[0]; // folder exists
  } else {
    return await createFolder(name, parentId);
  }
}
router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, path: filePath, mimetype } = req.file;
    const userId = req.body.userId;
    const key = req.body.key;

    // Step 1: Ensure user folder exists under parent folder
    const userFolder = await ensureFolderExists(userId, parentFolderId);

    // Step 2: Ensure 'key' folder exists under user folder
    const keyFolder = await ensureFolderExists(key, userFolder.id);

    // Step 3: Upload file to 'key' folder
    const file = await drive.files.create({
      requestBody: {
        name: originalname,
        mimeType: mimetype,
        parents: [keyFolder.id],
      },
      media: {
        mimeType: mimetype,
        body: fs.createReadStream(filePath),
      },
      fields: 'id, webViewLink, webContentLink',
    });

    // Delete local file
    fs.unlinkSync(filePath);

    res.status(200).json({
      fileId: file.data.id,
      webViewLink: file.data.webViewLink,
      folderId: keyFolder.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;  

