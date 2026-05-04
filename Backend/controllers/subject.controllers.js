import Subject from "../models/subject.model.js";

/**
 * @route - GET /api/subjects/dbms
 * @description Get a subject
 * @access public
 */
const getSubject = async (req, res) => {
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

/**
 * @route - POST /api/subjects/createSubject
 * @description Get a subject
 * @access public
 */
const createSubject = async (req, res) => {
  try {
    console.log("POST SUBJECT API HIT");

    const { name, videos, notes, pyq, important } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const formattedName = name.trim().toLowerCase();

    const existing = await Subject.findOne({ name: formattedName });
    if (existing) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const newSubject = new Subject({
      name: formattedName,
      videos: videos || [],
      notes: notes || [],
      pyq: pyq || [],
      important: important || [],
    });

    const savedSubject = await newSubject.save();

    res.status(201).json({
      message: "Subject created successfully",
      data: savedSubject,
    });

  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getSubject, createSubject }