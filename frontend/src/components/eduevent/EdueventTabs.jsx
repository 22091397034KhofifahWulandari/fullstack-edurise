import PropTypes from "prop-types";

const Tabs = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2 rounded-lg cursor-pointer font-poppins
            ${
              activeTab === tab.id ? "bg-white border border-black" : "bg-white"
            }
          `}
        >
          <div className="flex items-center">
            <span
              className={`${
                activeTab === tab.id ? "font-bold" : "font-normal"
              } text-gray-800`}
            >
              {tab.label}
            </span>
            {tab.count !== undefined && (
              <>
                <span className="mx-2 h-6 w-px bg-black"></span>
                <span className="text-xs">{tab.count} Rekaman</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Tabs;
