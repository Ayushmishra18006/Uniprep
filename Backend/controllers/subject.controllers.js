import Subject from "../models/subject.model.js";

export const getSubject = async (req, res) => {
  try {
    const subject = req.params.name.toLowerCase();

    const data = await Subject.findOne({ name: subject });

    if (!data) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};