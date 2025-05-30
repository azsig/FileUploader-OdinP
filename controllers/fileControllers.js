const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
  const { folderId } = req.body;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const file = await prisma.file.create({
      data: {
        filename: req.file.filename,
        path: req.file.path,
        userId: req.user.id,
        folderId: folderId ? Number(folderId) : null,
      }
    });
    res.json(file);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFileDetails = async (req, res) => {
  const { id } = req.params;
  const file = await prisma.file.findUnique({ where: { id: Number(id) } });
  if (!file || file.userId !== req.user.id) return res.status(404).json({ error: 'File not found' });
  res.json({
    id: file.id,
    filename: file.filename,
    originalname: file.filename, // jika ingin simpan originalname, tambahkan di schema & upload
    size: fs.existsSync(file.path) ? fs.statSync(file.path).size : null,
    uploadedAt: file.uploadedAt,
    downloadUrl: `/files/${file.id}/download`
  });
};

exports.downloadFile = async (req, res) => {
  const { id } = req.params;
  const file = await prisma.file.findUnique({ where: { id: Number(id) } });
  if (!file || file.userId !== req.user.id) return res.status(404).json({ error: 'File not found' });
  res.download(path.resolve(file.path), file.filename);
};