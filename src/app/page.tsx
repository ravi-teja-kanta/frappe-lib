import BooksTab from "@/components/books/books-tab";
import MembersTab from "@/components/members/members-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12">
      <h2 className=" font-bold text-2xl">
    	Dashboard
      </h2>
	  <Tabs defaultValue="overview" className="mt-4">
		<TabsList>
			<TabsTrigger value="overview">Overview</TabsTrigger>
			<TabsTrigger value="books">Books</TabsTrigger>
			<TabsTrigger value="members">Members</TabsTrigger>
		</TabsList>
		<TabsContent value="overview">Make changes to your account here.</TabsContent>
		<TabsContent value="books">
			<BooksTab />
		</TabsContent>
		<TabsContent value="members">
			<MembersTab />
		</TabsContent>
		</Tabs>
    </main>
  );
}
