import Subject from "../models/subject.model.js";

export const createSubject = async (req, res) => {
  try {

    const subject = await Subject.create(req.body);

    res.status(201).json(subject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getSubjects = async (req, res) => {
  try {

    const subjects = await Subject.find();

    res.status(200).json(subjects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};