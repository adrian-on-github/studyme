"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { UserData } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsDialog = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const router = useRouter();

  const deleteAccount = async (id: string) => {
    try {
      console.log(id);
      const res = await fetch(`/api/user/delete?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data);
      }
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUser(userData.user);
      } catch (err) {
        console.error("Failed to parse userData:", err);
      }
    }
    setMount(true);
  }, []);

  if (!mount || !user) return null;

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="border-black/10 border my-0.5 py-1 px-2 rounded-md"
      >
        <p className="flex flex-row items-center gap-x-1 cursor-pointer hover:bg-black/3 transition duration-200">
          <Settings size={16} />
          Settings
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center py-4">
          <Image
            src={user?.image!}
            alt="image"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              defaultValue={user?.fullname}
              disabled
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Email</Label>
            <Input
              id="email-1"
              name="email"
              defaultValue={user?.email}
              disabled
            />
          </div>
        </div>
        <Button
          className="text-red-500"
          variant="ghost"
          onClick={() => {
            if (user?.userId) {
              deleteAccount(user.userId);
            }
          }}
        >
          Delete Account
        </Button>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
