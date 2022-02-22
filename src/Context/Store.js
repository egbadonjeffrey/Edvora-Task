import React, { useState, useContext, useEffect } from "react";

const StoreContext = React.createContext();

export const useStore = () => useContext(StoreContext);

function StoreProvider({ children }) {
  const [user, setUser] = useState({});
  const [ride, setRide] = useState([]);
  const [filters, setFilters] = useState({ state: "", city: "" });
  const [status, setStatus] = useState(""); // upcoming, past

  // Fetching Date
  useEffect(() => {
    (async function () {
      await fetch("/Data.json")
        .then((response) => response.json())
        .then((res) => {
          setUser(res.user);
          setRide(res.ride);
        });
    })();
  }, [setUser, setRide]);

  function selectUpcomingRides() {
    const date = new Date();
    const now = date.getTime();

    return ride.filter((obj) => {
      const filterState = filters.state
        ? obj.state === filters.state
        : !filters.state;
      const filterCity = filters.city
        ? obj.city === filters.city
        : !filters.city;

      return obj.date * 1000 >= now && filterState && filterCity;
    });
  }

  function selectPastRides() {
    const date = new Date();
    const now = date.getTime();

    return ride.filter((obj) => {
      const filterState = filters.state
        ? obj.state === filters.state
        : !filters.state;
      const filterCity = filters.city
        ? obj.city === filters.city
        : !filters.city;

      return obj.date * 1000 < now && filterState && filterCity;
    });
  }

  function selectAllRides() {
    return ride.filter((obj) => {
      const filterState = filters.state
        ? obj.state === filters.state
        : !filters.state;
      const filterCity = filters.city
        ? obj.city === filters.city
        : !filters.city;

      return filterState && filterCity;
    });
  }

  const getRides = () => {
    switch (status) {
      case "upcoming":
        return selectUpcomingRides();

      case "past":
        return selectPastRides();

      default:
        return selectAllRides();
    }
  };

  const handleStatus = (state) => {
    setStatus(state);
  };

  const handleFilters = (obj) => {
    setFilters(obj);
  };

  const value = {
    handleStatus,
    handleFilters,
    selectUpcomingRides,
    selectPastRides,
    getRides,
    filters,
    status,
    ride,
    user,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;
