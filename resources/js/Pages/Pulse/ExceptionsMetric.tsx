import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

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
