import Logo from "./logo";

export default function Footer() {
  return (
    // A top-level <footer> (not nested in a <section>) so it's exposed as the page's contentinfo landmark
    <footer className="xl:px-24">
      <div className="container justify-around p-10 mx-auto footer text-base-content">
        <div className="px-8 text-center lg:px-2 lg:text-left">
          <Logo classOverride="w-20 h-20 lg:mx-0 mx-auto lg:mb-8 stroke-base-content" />
          <p className="text-lg leading-loose"><strong className="my-4 text-2xl">Liwu Codez</strong><br />Changing the world one <code>if_statement</code> at a time</p>
          <p className="w-full">© Jeremiah Chienda 2022</p>
        </div>
        <div>
          <h2 className="footer-title opacity-80"><span aria-hidden="true">☕️ </span>Buy me a Coffee</h2>
          <div className="w-full form-control">
            <label className="label" htmlFor="eth-amount">
              <span className="label-text">I accept ETH if you're feeling generous ❤️</span>
            </label>
            <div className="w-full input-group input-group-lg">
              <input id="eth-amount" type="number" placeholder="1" step="0.25" min="0" className="w-full min-w-0 text-xl input input-bordered" />
              <span>ETH</span>
            </div>
          </div>
          <button className="w-full rounded btn btn-accent sm:btn-wide">Connect & Send $250</button>
          <p>Or manually send to <strong>liwucodez.crypto</strong></p>
        </div>
      </div>
    </footer>
  )
}
