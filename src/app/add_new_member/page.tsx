"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlignLeftIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { addNewMember } from "../server/members/memberAPI";

type FormInputs = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

type NewUserStatus = "CREATED" | "FAILED" | "NOT_STARTED";

export default function Page() {
    async function onSubmit(form: any) {
        console.log(JSON.stringify(form));
        const memberId = await addNewMember(form);
        if (!memberId) setStatus("FAILED");
        else {
            setStatus("CREATED");
            setMemberId(memberId);
        }
    }
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [status, setStatus] = useState<NewUserStatus>("NOT_STARTED");
    const [memberId, setMemberId] = useState<string>();
    const router = useRouter();

    return (
        <div className="p-12 flex flex-col items-center">
            <Button variant={"outline"} className="mr-auto" onClick={() => router.back()}>
                <ArrowLeftIcon className="mr-2"></ArrowLeftIcon>
                Back
            </Button>
            <Card className="w-1/2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Add New Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>First Name</Label>
                                <Input  {...register("firstName", {required: true})} type={"text"} placeholder="First name" />
                                {
                                    errors.firstName && "FirstName is required"
                                }
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <Input type={"text"} placeholder="Surname, title" {...register("lastName")} />
                            </div>
                            <div>
                                <Label>Phone Number</Label>
                                <Input type={"tel"} placeholder="10 digit number" {...register("phoneNumber", {required: true, maxLength: 10})} />
                                {
                                    errors.phoneNumber && "Phone Number is required"
                                }
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input type={"email"} placeholder="abc@xyz.com" {...register("email", {required: true})} />
                                {
                                    errors.email && "Email is required"
                                }
                            </div>
                        </div>
                        
                    </CardContent>
                    <CardFooter>
                        {
                            memberId && status === "CREATED" ? <div className=" text-green-800">{`Success: New user created. Id: ${memberId}`}</div>
                            : 
                            <div className="w-1/2 mx-auto">
                                <Button type="submit" className="w-full">Submit</Button>
                                {status === "FAILED" && <div className="text-center mt-6 text-red-800">Failed to create New member. Error !</div>} 
                            </div> 
                        }
                    </CardFooter>
                </form>
            </Card>
    
        </div>
    )
} 