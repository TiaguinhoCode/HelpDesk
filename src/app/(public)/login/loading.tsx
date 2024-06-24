// Biblioteca
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

// React

export default function Loading() {
    return (
        <div className="flex flex-col items-center">
            <div className="loader"></div>
            <div className="pt-2">
                <p className="text-[13px]">Carregando...</p>
            </div>
        </div>
    );
}
