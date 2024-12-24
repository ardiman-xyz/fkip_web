// components/Pulse/ServerMetrics.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";

export const ServerMetrics = () => {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get("/pulse/stats");
                setMetrics(response.data);
            } catch (error) {
                console.error("Failed to fetch metrics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 30000); // Refresh every 30s

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* CPU Usage */}
            <Card>
                <CardHeader>
                    <CardTitle>CPU Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={metrics.servers[0].cpu} />
                    <span className="text-sm text-gray-500">
                        {metrics.servers[0].cpu}%
                    </span>
                </CardContent>
            </Card>

            {/* Memory Usage */}
            <Card>
                <CardHeader>
                    <CardTitle>Memory Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={metrics.servers[0].memory} />
                    <span className="text-sm text-gray-500">
                        {metrics.servers[0].memory}%
                    </span>
                </CardContent>
            </Card>

            {/* Slow Requests */}
            <Card>
                <CardHeader>
                    <CardTitle>Slow Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {metrics.slow_requests.map((request: any) => (
                            <div key={request.id} className="text-sm">
                                <p className="font-medium">{request.uri}</p>
                                <p className="text-gray-500">
                                    {request.duration}ms
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// components/Pulse/ExceptionsMetric.tsx
export const ExceptionsMetric = () => {
    const [exceptions, setExceptions] = useState<any[]>([]);

    useEffect(() => {
        const fetchExceptions = async () => {
            const response = await axios.get("/api/pulse/exceptions");
            setExceptions(response.data);
        };

        fetchExceptions();
        const interval = setInterval(fetchExceptions, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Exceptions</CardTitle>
            </CardHeader>
            <CardContent>
                {exceptions.map((exception) => (
                    <div
                        key={exception.id}
                        className="p-4 border-b last:border-0"
                    >
                        <p className="font-medium text-red-600">
                            {exception.class}
                        </p>
                        <p className="text-sm text-gray-600">
                            {exception.message}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(exception.occurred_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
