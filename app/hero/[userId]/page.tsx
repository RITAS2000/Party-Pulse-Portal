
import HeroForm from "../../components/heroAdd"

export default function Page() {
    return <main className="pl-80 pt-40 w-full min-h-screen   ">
        <p className="text-xl pt-8 pb-2 pl-4">добавте персонажа </p>
        <div className="w-auto h-auto px-12 py-6 border-solid border  border-gray-700">
            <HeroForm />
            </div>
        </main>
}