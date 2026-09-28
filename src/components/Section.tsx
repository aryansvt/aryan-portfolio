type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-10 lg:scroll-mt-[clamp(2rem,7vh,6rem)]">
      <h2 id={`${id}-title`} className="t-section mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}
