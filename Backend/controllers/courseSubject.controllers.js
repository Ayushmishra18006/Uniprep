import CourseSubject from "../models/courseSubject.model.js";

export const createCourseSubject = async (req, res) => {
  try {

    const data = await CourseSubject.create(req.body);

    res.status(201).json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getCourseSubjects = async (req, res) => {
  try {

    const { course, year, branch } = req.query;

    console.log("Received Query:", {
      course,
      year,
      branch,
    });

    const subjects = await CourseSubject.find({
      Course: {
        $regex: `^${course}$`,
        $options: "i",
      },
      Year: Number(year),
      Branch: branch,
    });

    console.log("Found Subjects:", subjects);

    res.status(200).json(subjects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};