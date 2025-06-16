import React from "react";
import PropTypes from "prop-types";

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className = "",
  tabClassName = "",
  activeTabClassName = "",
  inactiveTabClassName = "",
}) => {
  const baseTabsClasses = "flex space-x-4 border-b";
  const tabsClasses = `${baseTabsClasses} ${className}`;

  const baseTabClasses =
    "px-4 py-2 font-medium cursor-pointer transition-colors duration-200 font-poppins";
  const defaultActiveTabClasses = "text-blue-600 border-b-2 border-blue-600";
  const defaultInactiveTabClasses = "text-gray-500 hover:text-gray-700";

  const getTabClasses = (isActive) => {
    const activeClasses = activeTabClassName || defaultActiveTabClasses;
    const inactiveClasses = inactiveTabClassName || defaultInactiveTabClasses;
    return `${baseTabClasses} ${tabClassName} ${
      isActive ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <div className={tabsClasses}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabClasses(tab.id === activeTab)}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  activeTabClassName: PropTypes.string,
  inactiveTabClassName: PropTypes.string,
};

export default Tabs;
