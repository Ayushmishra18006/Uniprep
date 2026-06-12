import Subject from "../models/subject.model.js";
import Resource from "../models/resource.model.js";
import Progress from "../models/progress.model.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const subjects = await Subject.find();

    const result = [];

    for (const subject of subjects) {
      const totalVideos = await Resource.countDocuments({
        subject_slug: subject.slug,
        type: "videos",
      });

      const videos = await Resource.find({
        subject_slug: subject.slug,
        type: "videos",
      });

      const videoIds = videos.map((v) => v._id);

      const completedVideos = await Progress.countDocuments({
        userId,
        resourceId: {
          $in: videoIds,
        },
        completed: true,
      });

      const progress =
        totalVideos === 0
          ? 0
          : Math.round(
              (completedVideos / totalVideos) * 100
            );

      result.push({
        title: subject.title,
        progress,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};