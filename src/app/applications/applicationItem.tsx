import { ListedApplication } from "@/types/application.types";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ApplicationItem({
    application,
    collapsable
}: { application: ListedApplication, collapsable: boolean },) {

    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => setCollapsed(!collapsed);

    return collapsable && collapsed ? (
        <div className="mt-4 p-4 cursor-pointer bg-white-smoke rounded-lg border-2 w-5/6 flex justify-between items-center" onClick={toggleCollapsed}>
            <div></div>
            <span className="text-primary text-xl">Application Id: {application.id}</span>
            <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} className="text-sm" />
        </div>
    ) : (
        <div className="mt-4 bg-white-smoke rounded-lg border-2 w-5/6">
            <div className="flex items-center flex-col">
                <div className="p-4 cursor-pointer bg-white-smoke rounded-lg w-full flex justify-between items-center" onClick={toggleCollapsed}>
                    <div></div>
                    <span className="text-primary text-xl">Application Id: {application.id}</span>
                    {collapsable ?
                        (<FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} className="text-sm" />) : (<div></div>)
                    }
                </div>
                <span className="text-xl">Title: {application.title}</span>
            </div>

            <div className="flex justify-center gap-10 p-6">
                <span className="px-2">State: {application.currentState}</span>
                <span className="px-2">Last Modified: {application.stateChangedAt.toLocaleString()}</span>
            </div>
        </div>
    );
}