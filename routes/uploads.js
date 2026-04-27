const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { query } = require('../dbLogic/userDB');
const uploadsRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'video') {
            cb(null, 'videos/');
        } else {
            cb(null, 'videoIMG/');
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.fieldname === 'video') {
            const allowedTypes = ['video/mp4'];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid video type. Only MP4 allowed.'), false);
            }
        } else if (file.fieldname === 'thumbnail') {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid image type. Only JPG/PNG allowed.'), false);
            }
        } else {
            cb(null, true);
        }
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // Global max (the video size)
    }
});

uploadsRouter.post('/upload', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
    try {
        // Defensive check: ensure files were actually uploaded
        if (!req.files || !req.files['video'] || !req.files['thumbnail']) {
            return res.status(400).json({ error: 'Both video and thumbnail are required.' });
        }

        const videoFile = req.files['video'][0];
        const thumbnailFile = req.files['thumbnail'][0];

        // Additional size checks (multer's limits only apply to the video in this case)
        if (videoFile.size > 100 * 1024 * 1024) {
            return res.status(400).json({ error: 'Video exceeds 100MB limit.' });
        }
        if (thumbnailFile.size > 10 * 1024 * 1024) {
            return res.status(400).json({ error: 'Thumbnail exceeds 10MB limit.' });
        }
        const { title, description, userId } = req.body;
        const videoPath = videoFile.path;
        const thumbnailPath = thumbnailFile.path;

        await query(
            `INSERT INTO user_videos (title, description, video_path, thumbnail_path, user_id) VALUES ($1, $2, $3, $4, $5)`,
            [title, description, videoPath, thumbnailPath, userId]
        );

        res.status(200).json({ message: 'Video uploaded successfully' });
    }
    catch (error) {
        console.error('UPLOAD ERROR:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = { uploadsRouter, upload };