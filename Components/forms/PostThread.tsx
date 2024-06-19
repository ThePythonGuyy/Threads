"use client";

import { ThreadValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import styles from "@/Styles/postThread.module.scss";
import { Button } from "../ui/button";
import { raleway } from "@/app/fonts";
import { z } from "zod";
import { createThread } from "@/lib/actions/thread.action";
import { useOrganization } from "@clerk/nextjs";

export default function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization }  = useOrganization();
  if(organization) {
    console.log(organization)
  }

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    
    console.log(values);
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.form_container}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className={styles.formItem}>
              <FormLabel className={styles.form_textLabel}>Content</FormLabel>
              <FormControl className={styles.form_textControl}>
                <Textarea
                  className={styles.form_textInput}
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`form_submitButton ${raleway.className}`}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
