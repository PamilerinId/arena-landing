export function Reveal({
  delay = 0,
  as: Tag = "div",
  className,
  children,
  style,
}: {
  delay?: number;
  as?: "div" | "section" | "header" | "li" | "article";
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
