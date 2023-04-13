const models = require("../models");
const { Photo, User } = models;

module.exports = {
  getAllPhoto: async (req, res) => {
    try {
      const { id } = req.UserData;
      const data = await Photo.findAll({
        include: {
          model: User,
          attributes: ["username", "email"],
        },
        where: { UserId: id },
      });
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  getPhotoById: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: UserId } = req.UserData;
      const data = await Photo.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        res.status(404).json({ message: "data not found" });
        return;
      } else if (data.UserId !== UserId) {
        res.status(403).json({ message: "forbidden" });
        return;
      }
      res.status(200).json({ data: data });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  addPhoto: async (req, res) => {
    try {
      const { title, caption, image_url } = req.body;
      const { id } = req.UserData;
      const response = await Photo.create({ title, caption, image_url, UserId: id });
      res.status(201).json({ response });
    } catch (error) {
      console.log(error?.code || 500).json(error);
    }
  },
  updatePhotoById: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: UserId } = req.UserData;
      const { title, caption, image_url } = req.body;
      const update = await Photo.update({ title, caption, image_url }, { where: { id, UserId: UserId }, returning: true });
      console.log(update[0]);
      if (update[0] === 0) {
        res.status(401).json({ message: "sorry, you didn't permitted for this data" });
        return;
      }
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
