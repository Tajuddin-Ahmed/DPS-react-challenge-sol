import React, { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cities, setCities] = useState<User[]>([]);
  let uniqueCities;
  interface User {
    id: number;
    name: string;
    city: string;
    birthday: string;
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("https://dummyjson.com/users");
        const cities = response.data?.users.map(
          (user: any) => user.address.city
        );
        uniqueCities = [...new Set(cities)];
        setCities(uniqueCities);

        setUsers(response.data.users);
        setAllUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="mx-auto min-h-screen">
      <SearchFilter
        setUsers={setUsers}
        userData={users}
        cities={cities}
        AllUsers={allUsers}
      />
    </div>
  );
}

export default Home;
