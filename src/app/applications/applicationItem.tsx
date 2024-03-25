import { Application } from "@/types/application.types";

export default function ApplicationItem({
    application,
}: { application: Application }) {

    return (
        <div className="mt-10 grid grid-cols-12 gap-x-12 gap-y-7 bg-white-smoke">
            app-item
        </div>
    );
}