type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

// highlighter link; an empty href renders plain highlighted text so no dead links ship
export function TextLink({ href, children, className = "" }: TextLinkProps) {
  if (!href) {
    return <span className={`hl ${className}`}>{children}</span>;
  }

  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={`hl ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}
