import { useState } from "react";
import "./App.css";

const problems = [
  {
    id: "lead-generation",
    title: "Inconsistent lead generation",
    description:
      "There are many ways to find leads, but you struggle to use cold outreach and bring in clients beyond referrals.",
    outcome:
      "Build a more consistent approach to bringing potential clients into your business.",
  },
  {
    id: "offer-creation",
    title: "Clients keep comparing prices",
    description:
      "Prospects focus on price instead of the value your service provides.",
    outcome:
      "Communicate your value clearly and give potential clients stronger reasons to choose you.",
  },
  {
    id: "conversion",
    title: "Website visitors do not enquire",
    description:
      "People visit your website but do not take the next step and contact your business.",
    outcome:
      "Identify gaps that may be stopping visitors from becoming potential clients.",
  },
  {
    id: "business-research",
    title: "Finding the right businesses",
    description:
      "Identifying businesses that match your ideal customer profile takes time, and it's not always clear which ones are worth approaching",
    outcome:
      "Receive a research-backed report identifying suitable businesses, with evidence explaining why each business fits your target market and is worth approaching",
  },
  {
    id: "cold-outreach",
    title: "Cold outreach gets few replies",
    description:
      "Filtering leads, reaching out to them, and converting them into clients takes too much time.",
    outcome:
      "Make your outreach more focused and improve how you start conversations with potential clients.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand your current approach, the challenges you face, and what you have already tried.",
  },
  {
    number: "02",
    title: "Analyse",
    description:
      "Identify possible gaps in your offer, lead generation, outreach, and client journey.",
  },
  {
    number: "03",
    title: "Improve",
    description:
      "Explore practical ways to address the most important problems holding your business back.",
  },
];

function App() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState("home");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectionError, setSelectionError] = useState("");

  // Replace this with your deployed Google Apps Script Web App URL.
  const scriptUrl = "https://script.google.com/macros/s/AKfycbztHliFh1lfUkt0lHgfli7o34q3ajVcNbtn1ITxEnF4y27SNaSdRfql6NiL2yQYeQvAeg/exec";

  const selectedProblems = problems.filter((problem) =>
    selected.includes(problem.id)
  );

  const selectedTitles = selectedProblems.map((problem) => problem.title);

  function toggleProblem(id) {
    setSelectionError("");

    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function continueToNextPage() {
    if (selected.length === 0) {
      setSelectionError("Please select at least one challenge to continue.");
      return;
    }

    setSelectionError("");
    setPage("slots-full");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setPage("home");
    setSubmitError("");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setSubmitError("Please enter your email address.");
      return;
    }

    if (scriptUrl === "PASTE_YOUR_WEB_APP_URL_HERE") {
      setSubmitError(
        "Email notifications are not connected yet. Please try again later."
      );
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          email: email.trim(),
          services: selectedTitles,
          submittedAt: new Date().toISOString(),
        }),
      });

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            goBack();
          }}
          aria-label="Growth Studio home"
        >
          <span className="brand-mark">H</span>
          <span className="brand-name">Hari</span>
        </a>

        <div className="header-label">
          Growth strategy for B2B agencies
        </div>
      </header>

      {page === "home" ? (
        <main>
          <section className="hero-section" id="home">
            <div className="hero-content">
              <span className="eyebrow">
                FOR B2B SERVICE AGENCIES
              </span>

              <h1>
                Good at what you do, but  <span className="highlight-red"> struggling </span> with
              </h1>

              <ul className="hero-challenges">
                <li>Inconsistent leads</li>
                <li>Clients comparing prices</li>
                <li>
                  Website visitors not converting into enquiries
                </li>
              </ul>

              <p className="hero-description">
                Identify what&apos;s holding your agency back and
                explore practical ways to improve.
              </p>

              <a href="#challenges" className="button button-dark">
                Tell us your challenge
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="hero-visual">
              <div className="visual-topline">
                <span className="status-dot" />
                A clearer path to growth
              </div>

              <div className="visual-heading">
                Growth starts with understanding the problem.
              </div>

              <div className="approach-list">
                <div className="approach-item">
                  <div className="approach-number">01</div>
                  <div>
                    <h3>Understand</h3>
                    <p>Explore the challenges in your business.</p>
                  </div>
                  <span className="approach-symbol">↗</span>
                </div>

                <div className="approach-item">
                  <div className="approach-number">02</div>
                  <div>
                    <h3>Identify</h3>
                    <p>Find possible gaps in your current approach.</p>
                  </div>
                  <span className="approach-symbol">↗</span>
                </div>

                <div className="approach-item">
                  <div className="approach-number">03</div>
                  <div>
                    <h3>Improve</h3>
                    <p>Explore practical ways to move forward.</p>
                  </div>
                  <span className="approach-symbol">↗</span>
                </div>
              </div>

              <div className="visual-footer">
                <span>CLARITY BEFORE ACTION</span>
                <span>GS / 001</span>
              </div>
            </div>
          </section>

          <section className="challenges-section section-padding" id="challenges">
            <div className="section-heading">
              <div>
                <span className="eyebrow">LET&apos;S START HERE</span>
                <h2>What is holding your business back?</h2>
              </div>

              <p className="section-intro">
                Every business has different challenges. Select the
                ones you are dealing with so we can better understand
                what you are working through.
              </p>
            </div>

            <div className="challenge-toolbar">
              <span>SELECT YOUR CHALLENGES</span>
              <span>
                {selected.length} selected
              </span>
            </div>

            <div className="challenge-grid">
              {problems.map((problem, index) => {
                const isSelected = selected.includes(problem.id);

                return (
                  <button
                    type="button"
                    key={problem.id}
                    className={`challenge-card ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => toggleProblem(problem.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="challenge-card-top">
                      <span className="challenge-index">
                        0{index + 1}
                      </span>

                      <span className="selection-indicator">
                        {isSelected ? "✓" : "+"}
                      </span>
                    </div>

                    <h3>{problem.title}</h3>
                    <p>{problem.description}</p>

                    <div className="challenge-outcome">
                      <span className="outcome-label">
                        WHAT TO EXPLORE
                      </span>
                      <span>{problem.outcome}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectionError && (
              <p className="form-error selection-error" role="alert">
                {selectionError}
              </p>
            )}

            <div className="challenge-actions">
              <p>
                Choose one or more challenges that best describe
                your situation.
              </p>

              <button
                type="button"
                className="button button-dark"
                onClick={continueToNextPage}
              >
                Continue
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>

          <section className="process-section section-padding">
            <div className="process-heading">
              <span className="eyebrow">OUR APPROACH</span>
              <h2>Understand first. Act with purpose.</h2>
              <p>
                Before deciding what to change, understand the
                problem and where the biggest opportunities may be.
              </p>
            </div>

            <div className="process-grid">
              {processSteps.map((step) => (
                <article className="process-card" key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="closing-section">
            <div className="closing-content">
              <span className="eyebrow">YOUR NEXT STEP</span>
              <h2>Growth gets clearer when the problem does.</h2>
            
              <a href="#challenges" className="button button-light">
                Tell us your challenge
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="closing-decoration" aria-hidden="true">
              GS
            </div>
          </section>
        </main>
      ) : (
        <main className="slots-page">
          <button
            type="button"
            className="back-button"
            onClick={goBack}
          >
            <span aria-hidden="true">←</span>
            Back to challenges
          </button>

          <div className="slots-layout">
            <section className="slots-content">
              <span className="eyebrow">CONSULTATION AVAILABILITY</span>

              <h1> <span className="highlight-blue">All slots are</span> <span className="highlight-red">currently full.</span></h1>

              <p className="slots-description">
                Tell us what you are working through and we will
                keep you informed when a consultation slot becomes
                available.
              </p>

              {submitted ? (
                <div className="success-message" role="status">
                  <div className="success-icon">✓</div>
                  <h2>Thanks for your interest.</h2>
                  <p>
                    Your email has been submitted. We&apos;ll keep
                    you informed when a consultation slot becomes
                    available.
                  </p>
                </div>
              ) : (
                <form className="notification-form" onSubmit={handleSubmit}>
                  <label htmlFor="email">Email address</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />

                  {submitError && (
                    <p className="form-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="button button-dark submit-button"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Notify me"}
                    {!submitting && (
                      <span aria-hidden="true">→</span>
                    )}
                  </button>

                  <p className="privacy-note">
                    Your email will be used to notify you about
                    consultation availability.
                  </p>
                </form>
              )}
            </section>

            <aside className="selected-summary">
              <span className="eyebrow">YOUR SELECTED CHALLENGES</span>
              <h2>What you&apos;re working through</h2>

              {selectedProblems.length > 0 ? (
                <ul className="selected-list">
                  {selectedProblems.map((problem) => (
                    <li key={problem.id}>
                      <span className="summary-check">✓</span>
                      <span>{problem.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No challenges selected.</p>
              )}

              <button
                type="button"
                className="edit-selection"
                onClick={goBack}
              >
                Edit your selection
                <span aria-hidden="true">↗</span>
              </button>
            </aside>
          </div>
        </main>
      )}

      <footer className="site-footer">
        <a
          href="#home"
          className="footer-brand"
          onClick={(event) => {
            event.preventDefault();
            goBack();
          }}
        >
          <span className="brand-mark">H</span>
          <span>Hari</span>
        </a>

        <p>Clarity for better business growth.</p>

        <span className="copyright">
          © {new Date().getFullYear()} Hari. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default App;