"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Logo from "@/components/icon/logo";
import GoogleIcon from "@/components/icon/google";
import { signinWithMagicLink } from "./actions";
import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Login() {
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { success, error } = await signinWithMagicLink(values.email);
      if (error) throw error;
      success && setSuccess(true);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full min-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-pink-500">
              <Logo />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Magic Link Sign In */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {!success && (
                <SubmitButton
                  pendingText="Sending Magic Link..."
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-gray-800 text-white"
                >
                  Send Magic Link
                </SubmitButton>
              )}
              <p className="text-xs text-gray-500 text-center">
                {success
                  ? `Magic link sent! Please Check your email`
                  : `We'll email you a magic link for a password-free sign in`}
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
    </Form>
  );
}
