import { getAllUsers } from "@/actions/getUsers";
import Image from "next/image";

export default async function Home() {
  const user = await getAllUsers();
  console.log(user);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] gap-5">
      <div className=" font-extrabold text-9xl">DashBoard</div>
      <div className=" font-extrabold text-xl">All Users</div>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b bg-gray-100 text-left text-gray-600 font-medium">
                Image
              </th>
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
                <td className="px-6 py-4 border-b">
                  <Image
                    className="w-12 h-12 rounded-full object-cover"
                    src={usr.imageUrl || "https://via.placeholder.com/150"}
                    alt="User Image"
                    width={5}
                    height={5}
                  />
                </td>
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
