import Progress from "../models/progress.model.js";

export const markVideoComplete = async (req, res) => {
  try {
    const { resourceId } = req.params;

    const userId = req.user.id; // may need _id

    const existing = await Progress.findOne({
      userId,
      resourceId,
    });

    if (existing) {
      return res.status(200).json({
        message: "Video already completed",
      });
    }

    await Progress.create({
      userId,
      resourceId,
      completed: true,
    });

    res.status(201).json({
      message: "Progress saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
