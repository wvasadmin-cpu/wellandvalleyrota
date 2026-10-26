"use server";

import { revalidatePath } from "next/cache";
import { grantContactsAccess, revokeContactsAccess } from "@/lib/contacts-access";

export async function unlockContactsAction(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  if (!(await grantContactsAccess(password))) {
    return { error: "That password isn't right — please try again." };
  }
  revalidatePath("/contacts");
  return {};
}

export async function lockContactsAction(): Promise<void> {
  await revokeContactsAccess();
  revalidatePath("/contacts");
}
