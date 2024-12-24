import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ExceptionsMetric, ServerMetrics } from "./ServerMetrics";

export default function Monitoring() {
    return (
        <Authenticated
            header={<h2 className="text-2xl font-black">System Monitoring</h2>}
        >
            <div className="p-4 space-y-6">
                <ServerMetrics />
                <ExceptionsMetric />
            </div>
        </Authenticated>
    );
}
