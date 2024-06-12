"use client";

import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import styles from "@/Styles/postThread.module.scss";
import { Button } from "../ui/button";
import { raleway } from "@/app/fonts";
import { z } from "zod";
import { addCommentToThread } from "@/lib/actions/thread.action";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export default function Comment({
  threadId,
  currentUserImg,
  currentUserId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread({
      threadId,
      commentText: values.thread,
      userId: JSON.parse(currentUserId),
      path: JSON.stringify(pathname),
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.commentForm_container}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className={styles.commentFormItem}>
              <FormLabel className={styles.commentForm_Label}>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={48}
                  height={48}
                  className={styles.commentForm_profilePhoto}
                />
              </FormLabel>
              <FormControl className={styles.commentForm_textControl}>
                <Input
                  className={styles.form_textInput}
                  style={{ paddingLeft: "30px" }}
                  type="text"
                  placeholder="  Comment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`form_submitButton ${raleway.className} ${styles.commentSubmit}`}
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}
