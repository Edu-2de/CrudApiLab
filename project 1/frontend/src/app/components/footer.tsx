export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold tracking-wide mb-2">CrudApiLab</span>
          <span className="text-sm text-gray-300">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <a href="#" className="hover:underline text-white text-sm">About</a>
          <a href="#" className="hover:underline text-white text-sm">Contact</a>
          <a href="#" className="hover:underline text-white text-sm">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}