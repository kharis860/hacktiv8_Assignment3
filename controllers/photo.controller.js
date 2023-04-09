const models = require("../models");
const { Photo, User } = models;

module.exports = {
  getAllPhoto: async (req, res) => {
    try {
      const data = await Photo.findAll({ include: User });
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  getPhotoById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Photo.findOne({
        where: {
          id,
        },
      });
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  addPhoto: async (req, res) => {
    try {
      const { title, caption, image_url } = req.body;
      const add = await Photo.create({ title, caption, image_url });
      res.status(201).json({ add });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  updatePhotoById: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, caption, image_url } = req.body;
      const update = await Photo.update({ title, caption, image_url }, { where: { id }, returning: true });
      res.status(200).json({ update });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  deletePhotoById: async (req, res) => {
    try {
      const { id } = req.params;
      const upTarget = await Photo.findOne({
        where: {
          id,
        },
      });
      // const del = await upTarget.destroy();
      const del = await Photo.delete({ where: { id }, returning: true });
      res.status(200).json({ del });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
};
