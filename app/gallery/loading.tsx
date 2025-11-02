import { ClockLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <ClockLoader size={30} className="text-blue-600 "
            />
    </div>
  );
}