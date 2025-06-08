import React, { useEffect, useState } from "react";

function SearchFilter({ setUsers, userData, cities, AllUsers }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [highlightOldest, setHighlightOldest] = useState<boolean>(false);
  const [oldestUserIds, setOldestUserIds] = useState<Set<number>>(new Set());

  interface User {
    id: number;
    firstName: string;
    age: number;
    address: {
      city: string;
    };
  }

  const onSelectCity = (city: string) => {
    const filtered = AllUsers?.filter(
      (user: any) => user.address.city === city
    );
    setUsers(filtered);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredName(inputValue);
      console.log(inputValue);
      const filtered = AllUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(inputValue) ||
          user.lastName.toLowerCase().includes(inputValue)
      );
      if (filteredName === "") {
        setUsers(AllUsers);
      }
      setUsers(filtered);
      console.log(filtered);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // highlight checkbox feature
  useEffect(() => {
    if (highlightOldest) {
      const oldestPerCity = new Map<string, number>();
      const cityUsers = new Map<string, User[]>();

      AllUsers.forEach((user: User) => {
        const city = user.address.city;
        if (
          !oldestPerCity.has(city) ||
          user.age > (oldestPerCity.get(city) ?? 0)
        ) {
          oldestPerCity.set(city, user.age);
        }
        cityUsers.set(city, [...(cityUsers.get(city) || []), user]);
      });

      const oldestIds = new Set<number>();
      cityUsers.forEach((usersInCity, city) => {
        const maxAge = oldestPerCity.get(city);
        usersInCity.forEach((user) => {
          if (user.age === maxAge) {
            oldestIds.add(user.id);
          }
        });
      });

      setOldestUserIds(oldestIds);
    } else {
      setOldestUserIds(new Set());
    }
  }, [highlightOldest, AllUsers]);

  return (
    <div className="flex flex-col gap-y-5 p-5 border border-white bg-white">
      <div className="flex flex-row justify-center gap-x-5 items-center">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <div className="dropdown">
          <div tabIndex={0} className="btn w-40">
            Select City
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-gray-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {cities?.map((city, index) => (
              <li onClick={() => onSelectCity(city)} key={index}>
                <a>{city}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <label htmlFor="highestAge">
            <span className="text-xs">Highlight oldest per city</span>
          </label>
          <input
            id="highestAge"
            type="checkbox"
            checked={highlightOldest}
            onChange={() => setHighlightOldest(!highlightOldest)}
            className="checkbox checkbox-primary"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-screen overflow-y-auto">
        <table className="table border border-blue-100">
          {/* head */}
          <thead>
            <tr className="border border-gray-400">
              <th>Name</th>
              <th>City</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {userData?.map((user) => (
              <tr
                key={user.id}
                className={
                  oldestUserIds.has(user.id)
                    ? "bg-blue-100 border-2 border-blue-500"
                    : ""
                }
              >
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.address.city}</td>
                <td>{user.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchFilter;
