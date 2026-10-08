export default function SectionHead({ n, label, children, em }: { n: string; label: string; children: string; em: string }) {
  return (
    <header className="shead">
      <p className="tag rv">{n} — {label}</p>
      <h2 className="hd rv-mask"><span>{children}{/['’]$/.test(children) ? "" : " "}<i className="em">{em}</i></span></h2>
    </header>
  );
}
