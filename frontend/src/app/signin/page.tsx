"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button className="w-full mt-6 bg-sky-600 hover:bg-sky-700" type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          Already have an account? {" "}
          <Link href="/login" className="font-medium text-sky-600 hover:underline">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
