import {
  ArrowRight,
  ClipboardPenLine,
  Database,
  ExternalLink,
  FileText,
  Github,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const SHOW_FAQ = false;

const SITE = {
  shortTitle: 'Deepfake Explainability Challenge 2026',
  title: 'ACM MM 2026 Grand Challenge',
  subtitle:
    'A challenge on deepfake detection and explanation.',
  location: 'ACM Multimedia 2026',
};

const LINKS = {
  dataset: '',
  baseline: '',
  leaderboard: '',
  registrationForm: '', //'https://forms.office.com/r/gWypG9JGpe',
  eula: '',
  paperTemplate: '',
  contactAbhinav: 'mailto:Abhinav.dhall@monash.edu',
  contactAbhijeet: 'mailto:abhijeet.narang1@monash.edu',
};

const stats = [
  { value: '2', label: 'Challenge Tasks' },
  { value: '22 Mar 2026', label: 'Release Date' },
  { value: '500k+', label: 'Images' },
  { value: 'ACM MM 2026', label: 'Grand Challenge' },
];

const tasks = [
  {
    icon: ShieldCheck,
    title: 'Task 1 · Deepfake Detection',
    summary:
      'Given an image sample, predict whether the image is real or fake.',
  },
  {
    icon: ClipboardPenLine,
    title: 'Task 2 · Deepfake Explanation',
    summary:
      'Given an image sample, provide an explanation for the model’s decision with respect to the manipulation.',
  },
];

const timeline = [
  {
    date: '22 Mar 2026',
    title: 'Data and resources released',
    description: 'Release of data, code, and challenge materials.',
  },
  {
    date: '10 May 2026',
    title: 'Result submission starts',
    description: 'Leaderboard / result submission opens.',
  },
  {
    date: '20 May 2026',
    title: 'Result submission deadline',
    description: 'Final deadline for submitting challenge results.',
  },
  {
    date: '28 May 2026',
    title: 'Paper submission deadline',
    description: 'Deadline for challenge paper submission.',
  },
  {
    date: '16 Jul 2026',
    title: 'Paper acceptance notification',
    description: 'Acceptance decisions released to participants.',
  },
  {
    date: '06 Aug 2026',
    title: 'Camera-ready deadline',
    description: 'Final camera-ready papers due.',
  },
];

const resources = [
  {
    icon: Database,
    title: 'Dataset',
    text:
      'The dataset and associated challenge resources will be released with the official challenge launch.',
    href: LINKS.dataset,
    linkLabel: 'Open dataset',
  },
  {
    icon: Github,
    title: 'Code & Baselines',
    text:
      'Code, baselines, and evaluation resources will be made available through the official challenge release.',
    href: LINKS.baseline,
    linkLabel: 'Open code repository',
  },
  {
    icon: FileText,
    title: 'Submission Materials',
    text:
      'Submission instructions, formats, and related participation documents will be shared with the challenge release.',
    href: LINKS.leaderboard,
    linkLabel: 'Open submission page',
  },
];

const people = {
  organizers: [
    {
      name: 'Abhinav Dhall',
      affiliation: 'Monash University',
      image: '/people/abhinav-dhall.jpg',
      href: 'https://research.monash.edu/en/persons/abhinav-dhall/',
    },
    {
      name: 'Shreya Ghosh',
      affiliation: 'The University of Queensland',
      image: '/people/shreya-ghosh.jpg',
      href: 'https://sites.google.com/view/shreyaghosh/home',
    },
    {
      name: 'Muhammad Haris Khan',
      affiliation: 'MBZUAI',
      image: '/people/muhammad-haris-khan.jpeg',
      href: 'https://mbzuai.ac.ae/study/faculty/muhammad-haris-khan/',
    },
    {
      name: 'Jianfei Cai',
      affiliation: 'Monash University',
      image: '/people/jianfei-cai.jpg',
      href: 'https://research.monash.edu/en/persons/jianfei-cai/',
    },
    {
      name: 'Usman Tariq',
      affiliation: 'American University of Sharjah',
      image: '/people/usman-tariq.jpeg',
      href: 'https://sites.google.com/site/usmantariq/',
    },
  ],
  dataChairs: [
    {
      name: 'Abhijeet Narang',
      affiliation: 'Monash University',
      image: '/people/abhijeet-narang.jpg',
      href: 'https://www.linkedin.com/in/abhijeet-narang-63b419175',
    },
    {
      name: 'Kartik Kuckreja',
      affiliation: 'MBZUAI',
      image: '/people/kartik-kuckreja.jpeg',
      href: 'https://kjaerstuisk.github.io/kartikkuckreja.github.io/',
    },
  ],
};

const faq = [
  {
    q: 'Who can participate?',
    a: 'The challenge is open to academic and industry participants working on deepfake detection, multimedia understanding, and explainable AI.',
  },
  {
    q: 'Will code and baselines be released?',
    a: 'Yes. The official release will include the relevant challenge materials and resources.',
  },
  {
    q: 'Is registration required before data access?',
    a: 'Yes. Teams will need to complete registration and the EULA process.',
  },
];

const navItems = [
  ['Overview', '#overview'],
  ['Tasks', '#tasks'],
  ['Resources', '#resources'],
  ['Registration', '#registration'],
  ['Timeline', '#timeline'],
  ['People', '#people'],
  ...(SHOW_FAQ ? ([['FAQ', '#faq']] as const) : []),
  ['Contact', '#contact'],
] as const;

function hasLink(href?: string) {
  return Boolean(href && href.trim().length > 0);
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-header">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ResourceAction({
  href,
  label,
}: {
  href?: string;
  label: string;
}) {
  if (!hasLink(href)) {
    return <span className="status-pill">Coming soon</span>;
  }

  return (
    <a
      href={href}
      className="text-link"
      target="_blank"
      rel="noreferrer"
    >
      {label} <ArrowRight size={16} />
    </a>
  );
}

function PersonCard({
  name,
  affiliation,
  image,
  href,
}: {
  name: string;
  affiliation: string;
  image: string;
  href: string;
}) {
  return (
    <article className="person-card">
      <div className="person-image-wrap">
        <img src={image} alt={name} className="person-image" />
      </div>

      <div className="person-content">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="person-name"
        >
          {name} <ExternalLink size={15} />
        </a>
        <div className="person-affiliation">{affiliation}</div>
      </div>
    </article>
  );
}

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top">
            <div className="brand-badge">DFX</div>
            <div>
              <div className="brand-title">{SITE.shortTitle}</div>
              <div className="brand-subtitle">{SITE.location}</div>
            </div>
          </a>

          <nav className="nav desktop-nav" aria-label="Primary">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <a className="button button-small button-primary" href="#registration">
            Register
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="pill">
                <Sparkles size={16} />
                <span>{SITE.title}</span>
              </div>

              <h1>{SITE.shortTitle}</h1>

              <p className="hero-text">{SITE.subtitle}</p>

              {/* <p className="hero-subtext">
                The rapid advancement of Generative AI has fundamentally reshaped how
                visual content is produced, circulated, and consumed. Recent diffusion
                and vision-language models can fabricate highly persuasive,
                photorealistic deepfakes that extend beyond identity alterations,
                enabling manipulations of human actions, intent, object interactions,
                and scene-level semantics.
              </p>

              <p className="hero-subtext">
                As deepfakes evolve from simple facial swaps to rich, context-aware
                manipulations driven by large-scale generative models, the core challenge
                is no longer detection alone but also understanding why an image is
                identified as manipulated. The challenge includes two tasks: deepfake
                detection and deepfake explanation.
              </p> */}

              <div className="hero-actions">
                <a className="button button-primary" href="#tasks">
                  View Tasks <ArrowRight size={18} />
                </a>
                <a className="button button-secondary" href="#registration">
                  Registration
                </a>
              </div>
            </div>

            <div className="hero-panel">
              <div className="panel-card panel-accent">
                <div className="panel-kicker">ACM MM 2026 Grand Challenge</div>
                <h3>Detection and explanation</h3>
                <p>
                  The challenge focuses on both deepfake detection and explanation,
                  supporting research on models that not only make predictions but also
                  provide interpretable reasoning.
                </p>
              </div>

              <div className="stats-grid">
                {stats.map((item) => (
                  <div key={item.label} className="stat-card">
                    <div className="stat-value">{item.value}</div>
                    <div className="stat-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Overview"
              title="Challenge Description"
              text=""
            />

            <div className="content-card large-card">
              <p>
                Deepfake detection is increasingly moving beyond simple face swaps toward rich semantic manipulations. 
                This challenge focuses on both identifying manipulated content and explaining model decisions. 
                </p>
                <p>
                  Built on top of MultiFakeVerse, the benchmark includes two tasks: Deepfake Detection, 
                  where the goal is to identify whether an image is real or fake, and Deepfake Explanation, 
                  where the goal is to explain the model’s decision with respect to the manipulation. 
                  The goal is to encourage research on deepfake systems that are both accurate and interpretable.
                </p>
              {/* <p>
                As deepfakes evolve from simple facial swaps to rich, context-aware
                manipulations driven by large-scale generative models, the core
                challenge facing the multimedia community is no longer detection alone
                but understanding why an image is identified as manipulated.
                Traditional detectors often act as black boxes, flagging inconsistencies
                without offering human-interpretable reasoning.
              </p>

              <p>
                The Deepfake Explainability Challenge brings these goals together
                through two tasks: deepfake detection and deepfake explanation. The
                challenge is motivated by MultiFakeVerse and related challenge
                resources, with data and materials to be released through the official
                challenge website.
              </p> */}
            </div>
          </div>
        </section>

        <section id="tasks" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Tasks"
              title="Challenge Tasks"
              text="The challenge consists of two tasks."
            />

            <div className="card-grid two-up">
              {tasks.map((task) => {
                const Icon = task.icon;

                return (
                  <article key={task.title} className="content-card task-card">
                    <div className="icon-chip">
                      <Icon size={20} />
                    </div>
                    <h3>{task.title}</h3>
                    <p>{task.summary}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="resources" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Resources"
              title="Dataset and Resources"
              text="Challenge data, code, and supporting materials will be released through the official challenge channels."
            />

            <div className="card-grid three-up">
              {resources.map((resource) => {
                const Icon = resource.icon;

                return (
                  <article key={resource.title} className="content-card resource-card">
                    <div className="icon-chip soft">
                      <Icon size={20} />
                    </div>
                    <h3>{resource.title}</h3>
                    <p>{resource.text}</p>
                    <ResourceAction href={resource.href} label={resource.linkLabel} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="registration" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Registration"
              title="Registration"
              text="Please complete the following steps to participate in the challenge."
            />

            <div className="registration-grid">
              <article className="content-card registration-card">
                <div className="registration-step-label">Step 1</div>
                <h3>Team Registration</h3>
                <p>
                  For participating in the challenge, the first step is to register your
                  team. Please complete the form with the required information.
                </p>
                {'\n'}

                <div className="registration-actions">
                  {hasLink(LINKS.registrationForm) ? (
                    <a
                      href={LINKS.registrationForm}
                      className="button button-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open registration form <ArrowRight size={18} />
                    </a>
                  ) : (
                    <span className="status-pill large">Coming soon</span>
                  )}
                </div>
              </article>

              <article className="content-card registration-card">
                <div className="registration-step-label">Step 2</div>
                <h3>EULA Agreement</h3>
                <p>
                  The second stage is the EULA agreement. Please download the dataset
                  EULA and sign it at your end.
                </p>

                <p>
                  Please email the signed EULA to {' '}
                  <a href="mailto:abhinav.dhall@monash.edu" className="inline-link">
                    abhinav.dhall@monash.edu
                  </a>
                  {' '}
                  and{' '}
                  <a href="mailto:explainable.deepfakes.challenge@gmail.com" className="inline-link">
                     explainable.deepfakes.challenge@gmail.com
                  </a>
                </p>

                <div className="registration-actions">
                  {hasLink(LINKS.eula) ? (
                    <a
                      href={LINKS.eula}
                      className="button button-secondary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download EULA
                    </a>
                  ) : (
                    <span className="status-pill large">Coming soon</span>
                  )}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="timeline" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Timeline"
              title="Schedule"
              text="Important dates for the challenge."
            />

            <div className="timeline">
              {timeline.map((item, index) => (
                <div key={`${item.date}-${item.title}`} className="timeline-row">
                  <div className="timeline-marker">
                    <span>{index + 1}</span>
                  </div>

                  <article className="timeline-card">
                    <div className="timeline-date">{item.date}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="people" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="People"
              title="People"
              text="Challenge organizers and data chairs."
            />

            <div className="people-block">
              <div className="people-subheading">Organizers</div>
              <div className="people-grid">
                {people.organizers.map((person) => (
                  <PersonCard key={person.name} {...person} />
                ))}
              </div>
            </div>

            <div className="people-block">
              <div className="people-subheading">Data Chairs</div>
              <div className="people-grid">
                {people.dataChairs.map((person) => (
                  <PersonCard key={person.name} {...person} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {SHOW_FAQ && (
          <section id="faq" className="section">
            <div className="container">
              <SectionHeader
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                text="Common questions about participation."
              />

              <div className="faq-grid">
                {faq.map((item) => (
                  <article key={item.q} className="content-card faq-card">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="contact" className="section contact-section">
          <div className="container">
            <SectionHeader
              eyebrow="Contact"
              title="Contact"
              text="For challenge-related queries, please contact:"
            />

            <div className="contact-grid">
              <a className="contact-card" href={LINKS.contactAbhinav}>
                <Mail size={18} />
                <div>
                  <div className="contact-name">Abhinav Dhall</div>
                  <div className="contact-email">Abhinav.dhall@monash.edu</div>
                </div>
              </a>

              <a className="contact-card" href={LINKS.contactAbhijeet}>
                <Mail size={18} />
                <div>
                  <div className="contact-name">Abhijeet Narang</div>
                  <div className="contact-email">abhijeet.narang1@monash.edu</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-title">{SITE.shortTitle}</div>
            <p>ACM Multimedia 2026 Grand Challenge</p>
          </div>

          <div className="footer-links">
            <a href="#overview">Overview</a>
            <a href="#registration">Registration</a>
            <a href="#timeline">Schedule</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;