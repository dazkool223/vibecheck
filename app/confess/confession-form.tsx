"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { redirect } from "next/navigation";
import { createConfession } from "./clients.actions";

const formSchema = z.object({
  confessionText: z.string(),
});

const ConfessionFormWrapper = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await createConfession(userId, values.confessionText);
    if (response.success) {
      redirect("/confess/success");
    } else {
      alert(response.error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="confessionText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confess Here!</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write your heart out!"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ConfessionFormWrapper;
