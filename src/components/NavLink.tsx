import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  activeClassName?: string;
  end?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { className, activeClassName, href, children, end = false, ...props },
    ref,
  ) => {
    const pathname = usePathname();

    const isActive =
      typeof href === "string" &&
      (end
        ? pathname === href // match exacto
        : href === "/"
          ? pathname === "/"
          : pathname.startsWith(href)); // rutas hijas

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
