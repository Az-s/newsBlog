
const Card = ({ title, content, author, image }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      {/* Изображение новости */}
      {image && (
        <img
          className="w-full h-48 object-cover rounded-t-xl"
          src={image}
          alt={title}
        />
      )}
      <div className="p-4 bg-white rounded-b-xl">
        {/* Заголовок новости */}
        <h2 className="font-bold text-lg text-gray-900">{title}</h2>
        {/* Содержание (укороченное) */}
        <p className="text-gray-700 text-sm mt-2 line-clamp-3">{content}</p>
        {/* Автор новости */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex justify-center items-center text-white text-sm font-bold">
            {author[0]}
          </div>
          <p className="text-gray-800 text-sm">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;