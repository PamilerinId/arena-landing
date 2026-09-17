export function Tilt({
  dir,
  children,
}: {
  dir: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div className={`tilt tilt-${dir}`}>
      <div>{children}</div>
    </div>
  );
}
