function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Branding */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">
            UniPrep
          </h1>
          <p className="text-sm text-gray-400">
            Your all-in-one academic platform for courses, exams, and placement preparation.
          </p>
        </div>

        {/* Courses */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Courses
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">B.Tech</li>
            <li className="hover:text-white cursor-pointer">M.Tech</li>
            <li className="hover:text-white cursor-pointer">BCA</li>
            <li className="hover:text-white cursor-pointer">MCA</li>
          </ul>
        </div>

        {/* Exams */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Exams
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">GATE</li>
            <li className="hover:text-white cursor-pointer">CLAT</li>
            <li className="hover:text-white cursor-pointer">UPSC</li>
            <li className="hover:text-white cursor-pointer">CAT</li>
          </ul>
        </div>

        {/* Contact / Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Support
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-gray-500">
        ©️ {new Date().getFullYear()} UniPrep. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;