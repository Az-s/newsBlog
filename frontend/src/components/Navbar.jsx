import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg"; // Укажите путь к логотипу

const menus = [
  {
    title: "Руководство",
    links: [
      { label: "Президент Общественного Объединения", to: "/menu1/option1" },
      { label: "Первый Вице-президент", to: "/menu1/option2" },
      { label: "Второй вице-президент", to: "/menu1/option3" },
      { label: "Структура Управления Общества Дружбы", to: "/menu1/option3" },
      { label: "Список граждан-инициаторов", to: "/menu1/option3" },
      { label: "Наблюдательный совет", to: "/menu1/option3" },
    ],
  },
  {
    title: "Один пояс-Один путь",
    links: [
      { label: "О Посольстве КНР в КР", to: "/menu2/option1" },
      {
        label: "О Посольстве и Консульских учреждениях КР в КНР",
        to: "/menu2/option2",
      },
    ],
  },
  {
    title: "Пресс служба",
    links: [
      { label: "НОВОСТИ", to: "/press/news" },
      { label: "Статьи", to: "/menu3/option2" },
      { label: "Фото альбом ", to: "/menu3/option3" },
      { label: "Видео альбом  ", to: "/menu3/option3" },
      { label: "Наши будни ", to: "/menu3/option3" },
      { label: "Вопросы по визам ", to: "/menu3/option3" },
    ],
  },
  {
    title: "Мероприятия",
    links: [
      { label: "Конференции", to: "/menu4/option1" },
      { label: "Выставки", to: "/menu4/option2" },
      { label: "Круглые столы", to: "/menu4/option3" },
      { label: "Семинары", to: "/menu4/option3" },
    ],
  },
  {
    title: "НПА",
    links: [
      { label: "О Кыргызской Республике", to: "/menu5/option1" },
      { label: "О Китайской Народной Республике", to: "/menu5/option2" },
      { label: "Закон КР об Общественных Объединениях", to: "/menu5/option3" },
      { label: "О дружбе ", to: "/menu5/option1" },
      { label: "Интересные факты о КНР", to: "/menu5/option2" },
      { label: "История дипломатических отношений КР и КНР", to: "/menu5/option3" },
    ],
  },
  {
    title: "Обратная связь",
    links: [
      { label: "Партнеры Общества Дружбы", to: "/menu6/option1" },
      { label: "Контакты ", to: "/menu6/option2" },
      { label: "Реквизиты ", to: "/menu6/option3" },
    ],
  },
];

const Navbar = () => {
  const [openMegaMenu, setOpenMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMegaMenu = (menu) => {
    setOpenMegaMenu(openMegaMenu === menu ? null : menu);
  };

  return (
    <header className="w-full shadow-md bg-gray-100 border-b border-b-[#e6ebf4] z-50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center sm:px-8 px-4 py-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        {/* Burger Button for Mobile */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-6">
          <div
            className="relative"
            onMouseEnter={() => toggleMegaMenu("home")}
            onMouseLeave={() => toggleMegaMenu(null)}
          >
            <button className="font-inter font-medium text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
              Главная
            </button>

            {openMegaMenu === "home" && (
              <ul className="absolute left-0 top-full bg-white shadow-lg rounded-lg p-4 z-20 w-72 border border-gray-200 space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("section1")}
                    className="block text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition text-left"
                  >
                    Информация об обществе дружбы
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section2")}
                    className="block text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition text-left"
                  >
                    История создания
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section3")}
                    className="block text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition text-left"
                  >
                    Заявление о вступлении в общество дружбы
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section3")}
                    className="block text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition text-left"
                  >
                    Миссия общества дружбы
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("section3")}
                    className="block text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition text-left"
                  >
                    Цели общества дружбы
                  </button>
                </li>
              </ul>
            )}
          </div>

          {menus.map((menu, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => toggleMegaMenu(`menu${index + 1}`)}
              onMouseLeave={() => toggleMegaMenu(null)}
            >
              <button className="font-inter font-medium text-gray-700 hover:text-blue-600 transition whitespace-nowrap">
                {menu.title}
              </button>

              {openMegaMenu === `menu${index + 1}` && (
                <ul className="absolute left-0 top-full bg-white shadow-lg rounded-lg p-4 z-20 w-72 border border-gray-200 space-y-2">
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.to}
                        className="block text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-3 py-2 transition text-left"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Создать
        </Link>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md z-20">
            <ul className="space-y-2 p-4">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="block text-gray-700 hover:text-blue-600 rounded-md px-3 py-2 transition"
                >
                  Главная
                </button>
              </li>
              {Array.from({ length: 6 }).map((_, index) => (
                <li key={index}>
                  <Link
                    to={`/menu${index + 1}`}
                    className="block text-gray-700 hover:text-gray-600 rounded-md px-3 py-2 transition"
                  >
                    Меню {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
