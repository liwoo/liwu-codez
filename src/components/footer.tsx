import ArticleContainer from "./article-container";
import Logo from "./logo";

export default function Footer() {
  return (
    <ArticleContainer>
      <footer className="container justify-around p-10 mx-auto footer text-secondary-content">
        <div className="px-8 text-center lg:px-2 lg:text-left">
          <Logo classOverride="w-20 h-20 lg:mx-0 mx-auto lg:mb-8 stroke-offBlack dark:stroke-offWhite" />
          <p className="text-lg leading-loose"><strong className="my-4 text-2xl">Liwu Codez</strong><br />Changing the world one <code>if_statement</code> at a time</p>
          <p className="w-full">© Jeremiah Chienda 2022</p>
        </div>
        <div>
          <span className="footer-title">☕️ Buy me a Coffee</span>
          <div className="form-control">
            <label className="label">
              <span className="label-text">I accept ETH if you're feeling generous ❤️</span>
            </label>
            <label className="input-group input-group-lg">
              <input type="number" placeholder="1" step="0.25" min="0" className="text-xl input input-bordered" />
              <span>ETH</span>
            </label>
          </div>
          <button className="rounded btn btn-accent btn-wide">Connect & Send $250</button>
          <p>Or manually send to <strong>liwucodez.crypto</strong></p>
        </div>
      </footer>
    </ArticleContainer>
  )
}
