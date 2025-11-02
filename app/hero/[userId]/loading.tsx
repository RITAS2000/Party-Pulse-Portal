import { ClockLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <ClockLoader size={30} color="white"/>
    </div>
  );
}