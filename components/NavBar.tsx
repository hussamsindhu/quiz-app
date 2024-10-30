"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) {
    return <></>;
  }

  return (
    <div className=" flex items-center justify-between p-4">
      <div
        className="text-2xl text-yellow-600 cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        QUIZ DEMO
      </div>
      <div className="flex gap-5 border rounded-full border-yellow-600 px-4 py-1">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/math");
          }}
        >
          Math
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/english");
          }}
        >
          English
        </div>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
