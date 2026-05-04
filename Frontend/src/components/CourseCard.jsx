const CourseCard = ({ title, progress, color }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className={`h-20 rounded-lg ${color} text-white flex items-center justify-center text-xl font-bold`}>
        {title}
      </div>

      <p className="mt-3 text-sm text-gray-500">Progress</p>

      <div className="w-full bg-gray-200 h-2 rounded mt-1">
        <div
          className="h-2 rounded bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm mt-2">
        <span>{progress}%</span>
        <button className="text-primary font-medium">Continue</button>
      </div>
    </div>
  );
};

export default CourseCard;