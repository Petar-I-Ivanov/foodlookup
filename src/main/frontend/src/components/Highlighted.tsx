const Highlighted: React.FC<{ text?: string; highlight?: string }> = ({
  text = "",
  highlight = "",
}) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(
    `(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
    "gi"
  );

  return (
    <span>
      {text
        .split(regex)
        ?.filter(String)
        .map((part, i) =>
          regex.test(part) ? (
            <span key={i} className="highlighted">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
};

export default Highlighted;
