import { getOutStandingBalance } from "@/app/server/members/memberManager";
import { useEffect } from "react";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "../ui/card";


type StatsNavProps = {
    numberOfIssues: number,
    totalRevenue: number,
    newRegistrations: number
}

export function StatsNav({numberOfIssues, totalRevenue, newRegistrations}: StatsNavProps) {
   
    return (
        <div className="flex space-x-2">
                <Card className="flex-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription className="text-sm font-medium">
                        Total Revenue
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="flex space-x-2">
                            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()}</div>
                            <div className="text-sm font-medium my-auto">INR</div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader className="">
                        <CardDescription>New Memberships</CardDescription>
                        <CardTitle className="text-2xl">{newRegistrations}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1">
                    <CardHeader className="">
                        <CardDescription>Books Issued</CardDescription>
                        <CardTitle className="text-2xl">{numberOfIssues}</CardTitle>
                    </CardHeader>
                </Card>
                 
            </div>
    )
}