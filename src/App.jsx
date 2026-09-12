import React, { useState, useEffect } from 'react';
import './App.css';

/* ---------- static data ---------- */

const ORACLE_ROWS = [
  { ticker: 'NVDA', pair: 'FEA/NVDA', price: '226.08', status: null },
];

const MARQUEE_ITEMS = [
  'COLLECTED', 'STORM BRAKE ARMED', 'BAND RE-CENTERED', 'BOOK SOLD WITH THE NFT',
  'AGENT MINTED', 'VAULT FUNDED', 'ORACLE CHECKED', 'BAND CENTERED',
];

const STATS = [
  {
    tag: 'THE PRIMITIVE', big: 'ERC-6551',
    desc: 'A self-managing digital asset carrying a real NVDA balance.',
  },
  {
    tag: 'THE ENGINE', big: '24/7',
    desc: 'Programmable, on-chain NVDA market making that compounds yield.',
  },
  {
    tag: 'THE TERMINAL', big: 'HYBRID',
    desc: 'Autopilot for when you sleep. A terminal when you take the wheel.',
  },
  {
    tag: 'THE FORTRESS', big: '12',
    desc: 'On-chain brakes. The bot can trade but never drain capital.',
  },
];

const STRATEGIES = [
  {
    num: '01', title: 'THE HARVESTER', sub: 'RUNNING TODAY', live: true,
    desc: 'The vault parks as concentrated liquidity in the deepest NVDA pool, centered on the Chainlink NVDA/USD price, and every swap that crosses it pays the pool fee straight in. No direction, no prediction. When the oracle dies or the market runs, it sits in cash. The bot can quote and pull, never withdraw.',
    earns: 'The rake on NVDA at 0.3% per swap.',
    config: 'USDG · NVDA · BAND ±1%',
    status: 'LIVE ON ROBINHOOD CHAIN 4663',
  },
  {
    num: '02', title: 'THE TILT', sub: 'NVDA WITH AN OPINION', live: false,
    desc: 'Market making on the same NVDA pool that does not insist on staying neutral: the inventory is allowed to lean, and the lean is a parameter rather than a mood. A higher ceiling than the harvester, and a lower floor, which is the entire trade.',
    earns: 'Direction on NVDA, which the harvester refuses on purpose. It cuts both ways and there is no version where it does not.',
    config: 'ON THE BENCH',
    status: 'NOT LIVE',
  },
  {
    num: '03', title: 'THE DEPTH', sub: 'WIDER ON THE SAME NAME', live: false,
    desc: 'One book, more ranges: instead of a single band around NVDA, liquidity is layered across several widths at once, weighted by where the flow actually is rather than split evenly. Same rake, more doors, still one stock.',
    earns: 'Nothing new. The same NVDA fee, collected across more of the curve.',
    config: 'ON THE BENCH',
    status: 'NOT LIVE',
  },
  {
    num: '04', title: 'THE CALENDAR', sub: 'KNOWING WHEN NOT TO BE THERE', live: false,
    desc: 'The days a market maker gives it all back are not spread evenly through the year, they cluster around NVDA earnings and events anyone can see coming. A strategy whose whole skill is standing down before them instead of reacting after.',
    earns: 'The days it is not in the NVDA pool at all on the days it reads them.',
    config: 'ON THE BENCH',
    status: 'NOT LIVE',
  },
];

const LOOP_POINTS = [
  { cls: 'p1', title: 'FEES', sub: 'coin creator fees', active: false },
  { cls: 'p2', title: 'CONVERT', sub: 'ETH into USDG', active: true },
  { cls: 'p3', title: 'DISTRIBUTE', sub: 'equal per token', active: false },
  { cls: 'p4', title: 'QUOTE', sub: 'liquidity in the band', active: false },
  { cls: 'p5', title: 'COLLECT', sub: 'the rake, on cadence', active: false },
  { cls: 'p6', title: 'SELL', sub: 'the book travels', active: false },
];

const HOW_STEPS = [
  {
    num: '01', title: 'MINT',
    desc: <>The NFT deterministically owns an <span className="hl">ERC-6551</span> account. You hold the master key: withdraw, pause, transfer, at any time.</>,
  },
  {
    num: '02', title: 'QUOTE',
    desc: <>A scoped agent key places liquidity <span className="hl">ONLY</span> in the canonical NVDA pool, only centered on the Chainlink NVDA/USD price, only inside the band the contract allows. It can never move funds out.</>,
  },
  {
    num: '03', title: 'COLLECT',
    desc: <>Every swap that crosses the band pays the pool fee into the vault. Storm brakes pull everything to cash when the market runs; the exit can never be locked.</>,
  },
  {
    num: '04', title: 'SELL',
    desc: <>The wallet, its book and its fee stream transfer in one transaction. No drain before the sale.</>,
  },
];

/* ---------- hero card slideshow ---------- */
/* Drop your images in the "public/cards" folder of your project,
   named card-1.jpg, card-2.jpg, card-3.jpg ... (any image extension works,
   just keep the numbering sequential). Add or remove entries below to match
   how many photos you upload. */
const CARD_PHOTOS = [
  '/cards/card-1.png',
  '/cards/card-2.png',
  '/cards/card-3.png',
  '/cards/card-4.png',
  '/cards/card-5.png',
  '/cards/card-6.png',
  '/cards/card-7.png',
  '/cards/card-8.png',
  '/cards/card-9.png',
  '/cards/card-10.png',
  '/cards/card-11.png',
  '/cards/card-12.png',
  '/cards/card-13.png',
  '/cards/card-14.png',
];

/* ---------- component ---------- */

export default function App() {
  const [oracleTick, setOracleTick] = useState(0);
  const [copiedFooter, setCopiedFooter] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [expandedAgent, setExpandedAgent] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setOracleTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const handleRotationDone = () => {
    if (CARD_PHOTOS.length < 2) return;
    setSlideIndex((i) => (i + 1) % CARD_PHOTOS.length);
  };

  const handleCopy = (text, setter) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setter(true);
    setTimeout(() => setter(false), 1400);
  };

  return (
    <div className="fea-app">
      <div className="grid-texture" />
      <div className="star-rain">
        <div className="star-layer l1" />
        <div className="star-layer l2" />
        <div className="star-layer l3" />
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="brand">
          <img src="/logo.png" alt="FEA logo" className="brand-mark" />
          FEA
        </div>
        <div className="nav-links">
          <a href="#agent"><span>/</span>THE AGENT</a>
          <a href="#loop"><span>/</span>LOOP</a>
          <a href="#how"><span>/</span>HOW</a>
          <a href="#platform"><span>/</span>PLATFORM</a>
        </div>
        <div className="nav-right">
          <div className="nav-textlinks">
            <a href="#paper">PAPER</a>
            <a href="#docs">DOCS</a>
          </div>
          <a className="icon-btn" href="https://x.com/FEArhchain" target="_blank" rel="noopener noreferrer">𝕏</a>
          <a className="nav-cta" href="#buy">BUY ON OPENSEA</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="agent">
        <div className="hero-copy">
          <div className="hero-tag">[ FUNGIBLE ECONOMIC AGENTS · ERC-6551 · NVDA/USD · ROBINHOOD CHAIN 4663 ]</div>
          <h1>
            A DIGITAL COLLECTIBLE THAT<br />
            <span className="accent">RUNS AN NVDA HEDGE FUND.</span>
          </h1>
          <p>
            A fungible economic agent is a collectible that manages itself.
            The token owns a smart-account wallet, and that wallet carries its
            own balance sheet: cash and tokenized NVDA, working the deepest
            NVDA/USD pool on Robinhood Chain. Algorithmic market making runs
            it while you sleep; the terminal is there for when you want to
            take the wheel. The bot quotes the NVDA pair only, centered on
            the Chainlink NVDA/USD price, and can never withdraw. Buy the
            NFT and the whole NVDA book moves with it, in one transaction.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#buy">BUY ON OPENSEA</a>
            <a className="btn btn-outline" href="#coin">BUY THE COIN</a>
          </div>
          <div className="hero-coin">
            <span>COIN</span>
            <span className="pill">ROBINHOOD CHAIN 4663</span>
          </div>
        </div>

        <div className="hero-card-stage">
          <div className="hero-card-3d" onAnimationIteration={handleRotationDone}>
            <div className="hero-card-face front">
              <div className="hc-eyebrow">AGENT #{String(slideIndex + 1).padStart(3, '0')}</div>
              <div className="hc-photo-slot">
                {CARD_PHOTOS.length === 0 && <span>PHOTO</span>}
                {CARD_PHOTOS.map((src, i) => (
                  <div
                    key={src}
                    className={`hc-slide ${i === slideIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${src})` }}
                  />
                ))}
              </div>
              <div className="hc-footer">
                <span>FEA/NVDA</span>
                <span>#{String(slideIndex + 1).padStart(3, '0')}</span>
              </div>
            </div>
            <div className="hero-card-face back">
              <div className="hc-back-grid" />
              <div className="hc-back-label">FUNGIBLE<br />ECONOMIC<br />AGENT</div>
            </div>
          </div>
        </div>

        <div className="oracle-panel">
          <div className="oracle-head">
            <span><span className="live-dot">■</span> LIVE ORACLE · NVDA/USD · ROBINHOOD CHAIN 4663</span>
            <span>{String(oracleTick % 100).padStart(2, '0')}</span>
          </div>
          {ORACLE_ROWS.map((row, i) => (
            <div className={`oracle-row ${i === 0 ? 'active' : ''}`} key={row.ticker}>
              <span className="ticker">{row.ticker}</span>
              <span>{row.pair}</span>
              <span>${row.price}</span>
              <span className="status">{row.status || (i === 0 ? 'LIVE' : '')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="collection">
        <div className="gallery-head">
          <div className="eyebrow">[ THE COLLECTION ]</div>
          <h2>EVERY AGENT. SAME NVDA POOL. ROBINHOOD CHAIN 4663.</h2>
        </div>
        <div className="gallery-grid">
          {CARD_PHOTOS.map((src, i) => (
            <div
              className="gallery-card"
              key={src}
              onClick={() => setExpandedAgent(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setExpandedAgent(i); }}
            >
              <div className="hc-eyebrow">AGENT #{String(i + 1).padStart(3, '0')}</div>
              <div className="hc-photo-slot static">
                <div className="hc-slide active" style={{ backgroundImage: `url(${src})` }} />
              </div>
              <div className="hc-footer">
                <span>FEA/NVDA</span>
                <span>#{String(i + 1).padStart(3, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {expandedAgent !== null && (
        <div className="agent-modal-overlay" onClick={() => setExpandedAgent(null)}>
          <button className="agent-modal-close" onClick={() => setExpandedAgent(null)} aria-label="Close">
            ✕
          </button>
          <div className="agent-modal-stage" onClick={(e) => e.stopPropagation()}>
            <div className="agent-modal-3d">
              <div className="hero-card-face front">
                <div className="hc-eyebrow">AGENT #{String(expandedAgent + 1).padStart(3, '0')}</div>
                <div className="hc-photo-slot">
                  <div
                    className="hc-slide active"
                    style={{ backgroundImage: `url(${CARD_PHOTOS[expandedAgent]})` }}
                  />
                </div>
                <div className="hc-footer">
                  <span>FEA/NVDA</span>
                  <span>#{String(expandedAgent + 1).padStart(3, '0')}</span>
                </div>
              </div>
              <div className="hero-card-face back">
                <div className="hc-back-grid" />
                <div className="hc-back-label">FUNGIBLE<br />ECONOMIC<br />AGENT</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>
              {item}
              <span className="slash"> /</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.tag}>
            <div className="eyebrow">{s.tag}</div>
            <div className="big">{s.big}</div>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

      {/* THESIS */}
      <section className="thesis">
        <h2>
          NOT A PICTURE<br />
          OF A <span className="hi">FUND. A</span><br />
          FUND THE SIZE<br />
          OF A TOKEN.
        </h2>
        <div className="thesis-body">
          <p>
            The agent never guesses direction. It parks the vault in the
            deepest NVDA pool and collects the fee every swap pays. Measured
            here: an NVDA trade costs about 0.33%, and liquidity kept 77%
            of the pool's fees.
          </p>
          <a className="btn btn-outline" href="#paper">READ THE PAPER</a>
        </div>
      </section>

      {/* STRATEGIES */}
      <section className="strategies">
        {STRATEGIES.map((s) => (
          <div className={`strategy-card ${s.live ? 'live' : ''}`} key={s.num}>
            <div className="strategy-top">
              <span className="strategy-num">{s.num}</span>
            </div>
            <h3>{s.title}</h3>
            <div className="strategy-sub">{s.sub}</div>
            <p className="desc">{s.desc}</p>
            <div className="strategy-meta">
              <div className="row"><span>EARNS</span><span>{s.earns}</span></div>
              <div className="row"><span>CONFIG</span><span>{s.config}</span></div>
            </div>
            <div className="strategy-status">
              <span className="dot" /> {s.status}
            </div>
          </div>
        ))}
      </section>

      {/* LOOP */}
      <section className="loop-section" id="loop">
        <div className="loop-copy">
          <div className="eyebrow">[ THE LOOP ]</div>
          <h2>
            FEES IN. FEES IN AGAIN. THE BALANCE SHEET TRAVELS WITH THE TOKEN.
          </h2>
          <p>
            Two streams, one vault. Today the agent collects the pool fee
            from everyone else's trading. Creator fees from the coin join at
            launch. Sell the NFT and the live book goes with it.
          </p>
        </div>
        <div className="loop-diagram">
          <div className="loop-ring" />
          <div className="loop-center">
            <div className="eyebrow-small">EVERY FEE</div>
            <div className="headline">SPLIT BY TOKEN ID</div>
            <div className="sub">PAID INTO EACH VAULT</div>
          </div>
          {LOOP_POINTS.map((p) => (
            <div className={`loop-point ${p.cls} ${p.active ? 'active' : ''}`} key={p.cls}>
              <div className="lp-title">{p.title}</div>
              <div className="lp-sub">{p.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        {HOW_STEPS.map((step) => (
          <div className="how-row" key={step.num}>
            <div className="how-sticky">
              <div className="eyebrow">[ HOW IT WORKS ]</div>
              <h2>OWN THE WALLET. THE BOT ONLY DRIVES.</h2>
              <p>
                A smart account splits driving from owning. Nothing to run,
                and nobody to hand your keys to.
              </p>
              <a className="btn btn-primary" href="#buy">BUY ON OPENSEA</a>
            </div>
            <div className="how-step">
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* PLATFORM */}
      <section className="platform" id="platform">
        <div className="platform-head">
          <div className="eyebrow">[ THE PLATFORM · AUTOPILOT AND COPILOT ]</div>
          <h2>AUTOPILOT FOR WHEN YOU SLEEP. A TRADING DESK FOR WHEN YOU TAKE THE WHEEL.</h2>
        </div>
        <div className="platform-grid">
          <div className="term-card">
            <div className="term-bar">
              <span className="dots"><span /><span /><span /></span>
              /MINT
            </div>
            <div className="term-body">
              <div><span className="prefix">&gt;</span>STRATEGY: NVDA FEE HARVESTER</div>
              <div><span className="prefix">&gt;</span>DEPLOYING 6551 ACCOUNT ... <span className="green">OK</span></div>
              <div><span className="prefix">&gt;</span>AGENT KEY INSTALLED AT MINT</div>
              <div><span className="prefix">&gt;</span>HOLDER KEEPS THE MASTER KEY</div>
              <div><span className="prefix">&gt;</span>AGENT DEPLOYED ON NVDA</div>
            </div>
            <div className="term-foot">
              <h4>MINT</h4>
              <p>One agent on offer: the NVDA market maker, bot already authorised at mint.</p>
            </div>
          </div>

          <div className="term-card">
            <div className="term-bar">
              <span className="dots"><span /><span /><span /></span>
              /DASHBOARD
            </div>
            <div className="term-body">
              <div>AGENT #01 QUOTING NVDA ±1%</div>
              <div>AGENT #02 QUOTING NVDA ±3%</div>
              <div>AGENT #03 IN CASH STORM BRAKE</div>
              <div><span className="prefix">&gt;</span>PAUSE · ROTATE KEY · WITHDRAW</div>
              <div><span className="prefix">&gt;</span>ALL AGENTS PINNED TO NVDA</div>
            </div>
            <div className="term-foot">
              <h4>DASHBOARD</h4>
              <p>A command centre for your NVDA agents. Every one of them is a dedicated sub-account with its own book, its own bands and its own brakes, read straight from chain.</p>
            </div>
          </div>

          <div className="term-card">
            <div className="term-bar">
              <span className="dots"><span /><span /><span /></span>
              /TRADE
            </div>
            <div className="term-body">
              <div>NVDA FEA/NVDA <span className="green">ORACLE LIVE</span></div>
              <div>$226.08 · BAND ±1%</div>
              <div><span className="prefix">&gt;</span>BUY / SELL · FLOOR FROM ORACLE</div>
              <div><span className="prefix">&gt;</span>POOL FEE SHOWN ON THE TICKET</div>
              <div><span className="prefix">&gt;</span>EVERY SIGNATURE IN THE BLOTTER</div>
            </div>
            <div className="term-foot">
              <h4>TERMINAL</h4>
              <p>Take the wheel: the same pools the bot uses, the same oracle floor, by hand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="buy">
        <div className="status-chip"><span className="dot" /> FLEET LIVE</div>
        <h2>
          BUY THE TOKEN<br />
          OWN THE <span className="glow">HOUSE</span>
        </h2>
        <p className="fine">Not financial advice.</p>
        <a className="btn btn-primary" href="#buy">BUY ON OPENSEA</a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <p className="footer-blurb">
              Collectibles whose wallets make markets in tokenized NVDA on
              Robinhood Chain 4663. You keep the keys.
            </p>
            <img src="/logo.png" alt="FEA logo" className="footer-mark" />
          </div>
          <div className="footer-col">
            <h5>NAVIGATE</h5>
            <a href="#agent">THE AGENT</a>
            <a href="#loop">LOOP</a>
            <a href="#how">HOW</a>
            <a href="#platform">PLATFORM</a>
            <a href="#buy">BUY ON OPENSEA</a>
          </div>
          <div className="footer-col">
            <h5>CHANNELS</h5>
            <a href="#paper">THE PAPER</a>
            <a href="#docs">DOCS</a>
            <a href="#dashboard">DASHBOARD</a>
            <a href="#terminal">TERMINAL</a>
            <a href="#explorer">EXPLORER</a>
            <a href="https://x.com/FEArhchain" target="_blank" rel="noopener noreferrer">X / TWITTER</a>
          </div>
        </div>

        <div className="footer-disclaimer">
          "Fund" here means the shape of the thing, not a legal form: there
          is no manager, no fund vehicle, no LP agreement and no pooled
          capital. Every vault is its own wallet, owned by its own token.
          Tokenized NVDA on Robinhood Chain is a debt instrument, not
          equity. The bot can be wrong. Not financial advice.
        </div>

        <div className="footer-bottom">
          <div className="footer-collection">
            <span>COLLECTION</span>
            <span className="pill">ROBINHOOD CHAIN 4663</span>
            <span className="pill-copy">0x1819161f0f1c39b672057e5654916751c7913377</span>
            <button className="copy-btn" onClick={() => handleCopy('0x1819161f0f1c39b672057e5654916751c7913377', setCopiedFooter)}>
              {copiedFooter ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <span>FEA © 2026</span>
          <span>■ THE HOUSE IS OPEN ON ROBINHOOD CHAIN 4663</span>
        </div>
      </footer>
    </div>
  );
}