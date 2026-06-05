import Resource from "../models/resource.model.js";

export const getResources = async (req, res) => {
  try {
    const { subject } = req.params;

    const resources = await Resource.find({
      subject_slug: subject,
    });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};