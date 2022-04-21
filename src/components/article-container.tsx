const ArticleContainer: React.FC<{ classOverrides?: string }> = (props) => {
  return <section className={`xl:px-24 gap-x-16 ${props.classOverrides}`}>{props.children}</section>;
}

export default ArticleContainer;
