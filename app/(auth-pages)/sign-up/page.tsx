import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import Logo from "@/components/icon/logo";
import GoogleIcon from "@/components/icon/google";
import { signUpAction } from "@/app/(auth-pages)/actions";

export default async function Login() {
  return (
    <form>
      <Card className="w-full max-w-md">
        <div className="pt-4 px-4">
          <Logo />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-pink-500">
            Sign Up
          </CardTitle>
          <CardDescription>
            {`Already Registered? `}
            <Link
              href="/sign-in"
              className="text-orange-500 hover:underline font-medium"
            >
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Magic Link Sign In */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full"
              />
            </div>
            <SubmitButton
              pendingText="Sending Magic Link..."
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-gray-800 text-white"
            >
              Send Magic Link
            </SubmitButton>
            <p className="text-xs text-gray-500 text-center">
              We'll email you a magic link for a password-free sign in
            </p>
          </div>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full border border-gray-300 space-x-2 flex items-center justify-center"
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
