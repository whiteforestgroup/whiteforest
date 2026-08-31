"use client";

import { useState, useTransition } from "react";
import { Check, Camera } from "lucide-react";
import { toast } from "sonner";
import { markBookingComplete, setBookingPhoto } from "@/lib/actions";

export function JobDetailActions({
  bookingId,
  firstName,
  initialBeforePhoto,
  initialAfterPhoto,
  isCompleted,
}: {
  bookingId: string;
  firstName: string;
  initialBeforePhoto: boolean;
  initialAfterPhoto: boolean;
  isCompleted: boolean;
}) {
  const [beforePhoto, setBeforePhoto] = useState(initialBeforePhoto);
  const [afterPhoto, setAfterPhoto] = useState(initialAfterPhoto);
  const [completed, setCompleted] = useState(isCompleted);
  const [isPending, startTransition] = useTransition();

  function toggle(which: "before" | "after") {
    const next = which === "before" ? !beforePhoto : !afterPhoto;
    if (which === "before") setBeforePhoto(next);
    else setAfterPhoto(next);
    startTransition(() => {
      setBookingPhoto(bookingId, which, next);
    });
  }

  return (
    <>
      <h2 className="text-fg-subtle mt-6 mb-2 text-xs font-semibold tracking-wide uppercase">
        Before &amp; After Photos
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggle("before")}
          className={`flex flex-col items-center gap-2 rounded-2xl p-6 shadow-sm ${
            beforePhoto ? "bg-amber-500 text-white" : "bg-card-bg text-fg-muted"
          }`}
        >
          {beforePhoto ? (
            <Check className="h-6 w-6" />
          ) : (
            <Camera className="h-6 w-6" />
          )}
          <span className="text-sm font-semibold">
            {beforePhoto ? "Before added" : "Add before"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => toggle("after")}
          className={`flex flex-col items-center gap-2 rounded-2xl p-6 shadow-sm ${
            afterPhoto ? "bg-amber-500 text-white" : "bg-card-bg text-fg-muted"
          }`}
        >
          {afterPhoto ? (
            <Check className="h-6 w-6" />
          ) : (
            <Camera className="h-6 w-6" />
          )}
          <span className="text-sm font-semibold">
            {afterPhoto ? "After added" : "Add after"}
          </span>
        </button>
      </div>

      <button
        type="button"
        disabled={isPending || completed}
        onClick={() => {
          startTransition(async () => {
            await markBookingComplete(bookingId);
            setCompleted(true);
            toast.success(`${firstName}'s job marked complete`);
          });
        }}
        className="mt-8 w-full rounded-full bg-amber-500 py-3.5 text-center font-semibold text-white shadow-sm disabled:opacity-60"
      >
        {completed ? "Completed" : "Mark Complete"}
      </button>
    </>
  );
}
