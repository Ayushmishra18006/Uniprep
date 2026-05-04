import Subject from "../models/subject.model.js";

export const getSubject = async (req, res) => {
  try {
    console.log("API HIT");
    const subject = req.params.name.trim().toLowerCase();
    console.log("Searching for:",subject);

    const data = await Subject.findOne({ name: subject });

    if (!data) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};