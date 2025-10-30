import RegisterForm from "../components/registerForm";



export default function Page() {
    return <main className="pl-80 pt-52 min-w-screen min-h-screen  flex justify-center items-center ">
        <div className=" w-auto mb-auto  px-96 py-8 border-solid border-2 border-red-800 drop-shadow-[0_0_6px_white] rounded-lg bg-[url(/modal.jpg)] bg-no-repeat bg-center bg-cover">
         <RegisterForm/>
        </div></main>
}