import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const HospitalContext = createContext({
  selectedHospital: null,
  setSelectedHospital: () => {}, // Noop function for default
});

export const HospitalProvider = ({ children }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <HospitalContext.Provider value={{ selectedHospital, setSelectedHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

HospitalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useHospitalContext = () => useContext(HospitalContext);
