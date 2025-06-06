import React, { useEffect, useState } from "react";

function SearchFilter({ setUsers, userData, cities, AllUsers }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredName, setFilteredName] = useState("");
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
          user.firstName.toLowerCase().includes(filteredName) ||
          user.lastName.toLowerCase().includes(filteredName)
      );
      if (filteredName?.length > 0) {
        setUsers(filtered);
      } else {
        setUsers(AllUsers);
      }
      console.log(filtered);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <div className="flex flex-col gap-y-5">
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
          <div tabIndex={0} role="button" className="btn w-40">
            Select City
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {cities?.map((city, index) => (
              <li onClick={() => onSelectCity(city)} key={index}>
                <a>{city}</a>
              </li>
            ))}
          </ul>
        </div>
        <input
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-primary"
        />
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {userData?.map((user) => (
              <tr key={user.id}>
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
