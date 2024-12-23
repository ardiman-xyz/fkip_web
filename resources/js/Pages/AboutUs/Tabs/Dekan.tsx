import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PiPlusBold, PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";

export const Dekan = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Dekan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="border rounded-lg p-4">Dekan</div>
                </div>
            </CardContent>
        </Card>
    );
};
