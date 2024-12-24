const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mb-0">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-sm">
          <p>© {new Date().getFullYear()} ОД "КР-КНР"</p>
        </div>
        <div className="text-sm text-center py-4">
          <a
            href="https://github.com/Az-s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition duration-200"
          >
            Developed by ©
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
