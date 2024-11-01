"use client";
import { useEffect, useState } from "react";

type User = {
  username: string;
  externalUserId: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://quiz-app-peach-gamma-64.vercel.app/api/users"
      );
      const data = await res.json();
      setUser(data ?? []);
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] gap-5">
      <div className=" font-extrabold text-9xl">DashBoard</div>
      <div className=" font-extrabold text-xl">All Users</div>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b bg-gray-100 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-6 py-4 border-b bg-gray-100 text-left text-gray-600 font-medium">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.map((usr, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b text-gray-700">
                  {usr?.username || ""}
                </td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {usr?.email || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
