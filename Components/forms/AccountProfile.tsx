"use client";
import "@/app/globals.scss";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { z } from "zod";
import styles from "@/Styles/accountProfile.module.scss";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { raleway } from "@/app/fonts";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("media");

  const router = useRouter();

  const pathname = usePathname();
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log(values);

    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
        console.log(imgRes[0].url);
      }
    }

    await updateUser({
      userId: user.id,
      name: values.name,

      username: values.username,
      image: values.profile_photo,
      bio: values.bio,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${styles.form_container} ${raleway.className}`}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem
              className={styles.formItem}
              style={{
                flexFlow: "row nowrap",
                justifyContent: "space-ar",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <FormLabel className={styles.form_imageLabel}>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo ac"
                    width={96}
                    height={96}
                    priority
                    className={styles.profilePhoto}
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo d"
                    width={24}
                    height={24}
                    className={styles.profilePhoto}
                  />
                )}
              </FormLabel>
              <FormControl className={styles.form_imageControl}>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className={styles.form_imageInput}
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={styles.formItem}>
              <FormLabel className={styles.form_textLabel}>Name</FormLabel>
              <FormControl className={styles.form_textControl}>
                <Input
                  type="text"
                  className={styles.form_textInput}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={styles.formItem}>
              <FormLabel className={styles.form_textLabel}>Username</FormLabel>
              <FormControl className={styles.form_textControl}>
                <Input
                  type="text"
                  className={styles.form_textInput}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className={styles.formItem}>
              <FormLabel className={styles.form_textLabel}>Bio</FormLabel>
              <FormControl className={styles.form_textControl}>
                <Textarea
                  className={styles.form_textInput}
                  rows={10}
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
