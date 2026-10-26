"use client";

import { useActionState } from "react";
import { unlockContactsAction } from "@/actions/contacts";

export default function ContactsUnlock() {
  const [state, formAction, isPending] = useActionState(unlockContactsAction, {});

  return (
    <div className="max-w-md">
      <h2 className="font-display text-2xl text-primary mb-2">Contacts</h2>
      <p className="text-sm text-base-content mb-5">
        Phone numbers for this exhibition&apos;s volunteers. Please enter the
        Exhibitors&apos; password to view them.
      </p>

      <form action={formAction}>
        <label
          htmlFor="contacts-password"
          className="block text-xs font-semibold tracking-[0.08em]
                     uppercase text-base-content/55 mb-1.5"
        >
          Exhibitors&apos; Password
        </label>
        <input
          id="contacts-password"
          type="password" name="password"
          className="w-full px-3 py-2 border border-base-300 bg-base-100
                     text-sm focus:outline-none focus:border-primary mb-3"
          required
          autoComplete="current-password"
        />
        {state.error && (
          <p className="text-sm text-error mb-3" role="alert">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-primary-content py-2 text-sm
                     font-semibold tracking-wide hover:bg-neutral
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Checking…" : "Show Contacts"}
        </button>
      </form>
    </div>
  );
}
