const Card = ({
  img,
  title,
  description,
  detail,
  jenjang,
  lokasi,
  deadline,
  onClick,
}) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md flex flex-col max-w-[300px] w-full mx-auto h-full">
      <img
        src={img}
        alt={title}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="font-medium text-sm md:text-base mb-2 leading-tight min-h-[3.5rem]">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-gray-600 flex-grow mb-4 min-h-[4.5rem]">
            {description}
          </p>
        )}

        <button
          className="w-full bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors"
          onClick={() =>
            onClick({
              img,
              title,
              description,
              detail,
              jenjang,
              lokasi,
              deadline,
            })
          }
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default Card;
