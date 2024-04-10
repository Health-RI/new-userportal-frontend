// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { cn } from "@/utils/tailwindMerge";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ButtonProps {
  text: string;
  type?: "primary" | "secondary" | "info" | "warning";
  icon?: IconDefinition;
  href?: string;
  onClick?: () => void;
  className?: string;
  props?: React.ComponentPropsWithoutRef<"a">;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  icon,
  href,
  onClick,
  className,
  props,
}) => {
  const common =
    "rounded-lg px-4 py-2 font-bold transition-colors duration-200 tracking-wide sm:w-auto cursor-pointer";

  const classes = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary:
      "bg-transparent text-primary border-2 border-primary hover:bg-secondary hover:text-white hover:border-transparent",
    info: "bg-info text-white hover:bg-secondary",
    warning: "bg-warning text-black hover:bg-secondary hover:text-white",
  };

  return (
    <a
      href={href}
      className={cn(classes[type!] || "", common, className)}
      onClick={onClick}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      <span>{text}</span>
    </a>
  );
};

export default Button;
