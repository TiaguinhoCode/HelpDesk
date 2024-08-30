// Biblioteca
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSaveOutline } from "react-icons/io5";
import { Divider } from "@nextui-org/react";

// Componentes
import { Btn } from "@/components/ui/button";
import Link from "next/link";

export default function CreateHostPage() {
    return (
        <div className="w-full  h-screen flex flex-col space-x-4">
            <div className="w-full flex">
                <div className="w-full bg-white rounded-xl fixed p-5 flex justify-between fixed items-center">
                    <div className="flex cursor-pointer hover:bg-[#006fee] p-2 rounded-xl hover:text-white">
                        <Link href="/host">
                            <FaArrowLeftLong />
                        </Link>
                    </div>
                    <div className="flex">
                        <Btn description="Salvar" startContent={<IoSaveOutline size={15} />} className="ml-3 text-sm cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className="mt-2 w-72">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="text-center p-2 bg-white">
                        <svg aria-hidden="true" role="img" className="h-24 w-24 text-gray-800 rounded-full mx-auto" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>
                        <p className="pt-2 text-lg font-semibold text-gray-700">Nome</p>
                        <p className="text-sm text-gray-700 pb-2">Nome@dominio.com</p>

                        <Divider className="my-2" />
                        <div className="text-center py-4 bg-white">
                            <p className="pt-2 text-sm font-semibold text-gray-700">Departamento</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}