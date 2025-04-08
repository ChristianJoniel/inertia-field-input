import { clsx } from "clsx";
import { type HTMLAttributes } from "react";
import React from "react";

export interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function InputError({
  message,
  className = "",
  ...props
}: InputErrorProps) {
  return message ? (
    <p
      className={clsx("text-sm text-red-600 dark:text-red-400", className)}
      {...props}
    >
      {message}
    </p>
  ) : null;
}
