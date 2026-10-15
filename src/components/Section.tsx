import { sections } from "@/content/sections";

type SectionProps = {
  id: (typeof sections)[number]["id"];
  children: React.ReactNode;
};

// title on the left, sticky on wide screens; content on the right
export function Section({ id, children }: SectionProps) {
  const label = sections.find((s) => s.id === id)?.label ?? id;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="wrap section">
      <div className="section-label">
        <h2 id={`${id}-title`} className="t-section reveal">
          {label}
        </h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
