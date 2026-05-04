const ProfilePanel = () => {
  return (
    <div className="w-80 bg-white p-5 shadow-lg hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      
      <div className="text-center">
        <img
          src="https://i.pravatar.cc/100"
          className="w-20 h-20 rounded-full mx-auto"
          alt="profile"
        />
        <h2 className="mt-2 font-semibold">Amit Sharma</h2>
        <button className="text-primary text-sm mt-1">Edit Profile</button>
      </div>

      <hr className="my-4" />

      <h3 className="font-semibold">General Details</h3>
      <p className="text-sm text-gray-500">Email: amit@email.com</p>
      <p className="text-sm text-gray-500">Phone: +91 XXXXX</p>

      <h3 className="font-semibold mt-4">Academic</h3>
      <p className="text-sm text-gray-500">B.Tech - CSE</p>
      <p className="text-sm text-gray-500">Semester 4</p>

      <h3 className="font-semibold mt-4">Subjects</h3>

      {[
        { name: "DBMS", val: 80 },
        { name: "CN", val: 70 },
      ].map((s) => (
        <div key={s.name} className="mt-2">
          <div className="flex justify-between text-sm">
            <span>{s.name}</span>
            <span>{s.val}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 rounded bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
              style={{ width: `${s.val}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePanel;