const ArticleContainer: React.FC<{ classOverrides?: string }> = (props) => {
  return <section className={`xl:mx-24 gap-x-16 ${props.classOverrides}`}>{props.children}</section>;
}

export default ArticleContainer;
