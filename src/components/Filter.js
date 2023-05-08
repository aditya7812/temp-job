import React, { useState } from "react";

const Filter = ({ jobTypes, jobRoles, onFilterChange }) => {
  const [filters, setFilters] = useState({
    jobTypes: [],
    jobRoles: [],
  });

  const handleFilterChange = (filterType, filterValue) => {
    const newFilters = { ...filters };
    const filterIndex = newFilters[filterType].indexOf(filterValue);
    if (filterIndex === -1) {
      // add filter value
      newFilters[filterType].push(filterValue);
    } else {
      // remove filter value
      newFilters[filterType].splice(filterIndex, 1);
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div>
      <h3>Filter by:</h3>
      <div>
        <h4>Job Type</h4>
        {jobTypes.map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={filters.jobTypes.includes(type)}
              onChange={(e) =>
                handleFilterChange("jobTypes", e.target.value)
              }
            />
            {type}
          </label>
        ))}
      </div>
      <div>
        <h4>Job Role</h4>
        {jobRoles.map((role) => (
          <label key={role}>
            <input
              type="checkbox"
              value={role}
              checked={filters.jobRoles.includes(role)}
              onChange={(e) =>
                handleFilterChange("jobRoles", e.target.value)
              }
            />
            {role}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
