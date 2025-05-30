const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createFolder = async (req, res) => {
  const { name } = req.body;
  try {
    const folder = await prisma.folder.create({
      data: { name, userId: req.user.id }
    });
    res.json(folder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFolders = async (req, res) => {
  const folders = await prisma.folder.findMany({ where: { userId: req.user.id } });
  res.json(folders);
};

exports.getFolder = async (req, res) => {
  const { id } = req.params;
  const folder = await prisma.folder.findUnique({ where: { id: Number(id) } });
  if (!folder || folder.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  res.json(folder);
};

exports.updateFolder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const folder = await prisma.folder.update({
      where: { id: Number(id) },
      data: { name }
    });
    res.json(folder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFolder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.folder.delete({ where: { id: Number(id) } });
    res.json({ message: 'Folder deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};