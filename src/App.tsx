import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  ClipboardPenLine,
  Database,
  ExternalLink,
  Github,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const DATASET = {
  name: 'XPlainVerse',
  repoId: 'Abhijeet8901/XPlainVerse',
  totalImages: '560,000',
  totalReal: '180,000',
  totalFake: '380,000',
};

const SITE = {
  shortTitle: 'Explainable Deepfake Detection Challenge 2026',
  title: 'ACM MM 2026 Grand Challenge',
  subtitle:
    'A challenge on image-level deepfake detection and grounded explanation generation.',
  location: 'ACM Multimedia 2026',
};

const LINKS = {
  dataset: 'https://huggingface.co/datasets/Abhijeet8901/XPlainVerse',
  baseline: 'https://github.com/Abhijeet8901/XPlainVerse-ACMChallenge',
  registrationForm: 'https://forms.office.com/r/gWypG9JGpe',
  eula: 'docs/EULA_Explainable_Deepfake_Detection_Challenge_2026.pdf',
  contactAbhinav: 'mailto:Abhinav.dhall@monash.edu',
  contactAbhijeet: 'mailto:abhijeet.narang1@monash.edu',
};

const stats = [
  { value: DATASET.name, label: 'Official Benchmark' },
  { value: DATASET.totalImages, label: 'Images in Current Release' },
  { value: '2', label: 'Challenge Tasks' },
  { value: 'ACM MM 2026', label: 'Grand Challenge' },
];

type LabelValue = {
  label: string;
  value: string | ReactNode;
};

type Person = {
  name: string;
  affiliation: string;
  image: string;
  href: string;
};

type Resource = {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  linkLabel: string;
};

const datasetBreakdown = [
  { split: 'Training', images: '450,000', real: '130,000', fake: '320,000' },
  { split: 'Validation', images: '110,000', real: '50,000', fake: '60,000' },
];

const heroHighlights = [
  { label: 'Training split', value: '450,000 images' },
  { label: 'Validation split', value: '110,000 images' },
  { label: 'Submission fields', value: 'Label + complex + simple explanations' },
];

const metadataFields: LabelValue[] = [
  { label: 'label', value: 'Binary image label: fake or real.' },
  { label: 'image_path', value: 'Relative path to the image file within the split.' },
  {
    label: 'complex_explanation_path',
    value: 'Relative path to the paired complex explanation JSON for the image.',
  },
  {
    label: 'simple_explanation_path',
    value: (
      <>
        Relative path to the paired simple explanation JSON for the image. <strong>Note:</strong> for real images, this is the same as <code>complex_explanation_path</code> because simple explanations are only provided for fake images.
      </>
    ),
  },
];

const accessSteps = [
  'Register your team using the official challenge registration form.',
  'Download, sign, and email the EULA to the organizers.',
  'After approval, download XPlainVerse from Hugging Face using the command below.',
];

const submissionExample = `{"sample_id":"000001","label":"fake","complex_explanation":"...","simple_explanation":"..."}`;

const explanationTracks = [
  {
    title: 'Complex explanation',
    tag: 'Detailed evidence',
    text:
      'A detailed explanation grounded in visible image evidence, such as artifacts, geometry issues, texture inconsistencies, text errors, lighting mismatches, or object interactions.',
  },
  {
    title: 'Simple explanation',
    tag: 'Clear and concise',
    text:
      'A shorter and more accessible explanation that preserves the key reason behind the decision without carrying every low-level detail from the complex explanation.',
  },
];

const complexMetricItems = [
  {
    name: 'complex_bert_f1',
    text:
      'BERTScore F1 between the predicted and reference complex explanations.',
  },
  {
    name: 'complex_entity_f1',
    text:
      'Qwen 3.5 4B extracts diagnostic entities from both the ground-truth explanation and the predicted explanation. It then checks whether the ground-truth entities are covered by the prediction and whether the predicted entities are covered by the ground truth, and combines those two directional scores into an F1.',
  },
  {
    name: 'complex_facts_f1',
    text:
      'Qwen 3.5 4B extracts evidence facts or claims from both the ground-truth explanation and the predicted explanation. It then checks whether the ground-truth facts are covered by the prediction and whether the predicted facts are covered by the ground truth, and combines those two directional scores into an F1.',
  },
  {
    name: 'complex_overall_score',
    text:
      'Final complex explanation score: 30% semantic similarity, 40% entity overlap, and 30% fact overlap.',
  },
];

const simpleMetricItems = [
  {
    name: 'simple_bert_f1',
    text:
      'BERTScore F1 between the predicted and reference simple explanations. It measures whether the simplified meaning matches the reference.',
  },
  {
    name: 'simple_sle_score',
    text:
      'Raw score from the SLE simplicity model. It is reported directly in the output before clipping and normalization.',
  },
  {
    name: 'simple_overall_score',
    text:
      'Final simple explanation score: 70% semantic agreement and 30% normalized simplicity.',
  },
];

const complexMetricFormula = `complex_entity_f1 = harmonic_mean(entity_precision, entity_recall)
complex_facts_f1 = harmonic_mean(fact_precision, fact_recall)

complex_overall_score =
  0.3 * complex_bert_f1 +
  0.4 * complex_entity_f1 +
  0.3 * complex_facts_f1`;

const simpleMetricFormula = `simple_sle_norm = clip(simple_sle_score, -1, 4)
simple_sle_norm = (simple_sle_norm + 1) / 5

simple_overall_score =
  0.7 * simple_bert_f1 +
  0.3 * simple_sle_norm`;

const resources: Resource[] = [
  {
    icon: Database,
    title: 'XPlainVerse Dataset',
    text: 'Official Hugging Face release of XPlainVerse, including the current training and validation splits, paired explanation annotations, and manifest metadata.',
    href: LINKS.dataset,
    linkLabel: 'Open dataset',
  },
  {
    icon: Github,
    title: 'Code and Baselines',
    text: 'Official challenge repository with the public evaluation bundle, environment files, and baseline-facing resources for the explanation task.',
    href: LINKS.baseline,
    linkLabel: 'Open code and baselines',
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
  ] satisfies Person[],
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
  ] satisfies Person[],
  programCommittee: [
    {
      name: 'Junichi Yamagishi',
      affiliation: 'National Institute of Informatics, Tokyo, Japan',
      image: '/people/junichi-yamagishi.png',
      href: 'https://www.nii.ac.jp/en/faculty/digital_content/yamagishi_junichi/',
    },
    {
      name: 'Zhixi Cai',
      affiliation: 'Monash University',
      image: '/people/zhixi-cai.png',
      href: 'https://profile.controlnet.space/',
    },
    {
      name: 'Shahroz Tariq',
      affiliation: 'CSIRO Data61',
      image: '/people/shahroz-tariq.png',
      href: 'https://people.csiro.au/T/S/shahroz-tariq',
    },
    {
      name: 'Sebastiano Battiato',
      affiliation: 'Universita di Catania',
      image: '/people/sebastiano-battiato.png',
      href: 'https://www.dmi.unict.it/~battiato/',
    },
    {
      name: 'Luca Guarnera',
      affiliation: 'Universita di Catania',
      image: '/people/luca-guarnera.png',
      href: 'https://web.dmi.unict.it/faculty/luca.guarnera',
    },
    {
      name: 'Aditya Nigam',
      affiliation: 'IIT Mandi',
      image: '/people/aditya-nigam.png',
      href: 'https://faculty.iitmandi.ac.in/~aditya/',
    },
  ] satisfies Person[],
};

const datasetLayout = `XPlainVerse/
|-- train/
|   |-- manifest.jsonl
|   |-- images/
|   |   |-- fake/
|   |   '-- real/
|   |-- complex_explanations/
|   |   |-- fake/
|   |   '-- real/
|   '-- simple_explanations/
|       '-- fake/
'-- val/
    |-- manifest.jsonl
    |-- images/
    |   |-- fake/
    |   '-- real/
    |-- complex_explanations/
    |   |-- fake/
    |   '-- real/
    '-- simple_explanations/
        '-- fake/`;

const manifestExample = `{"label":"fake","image_path":"train/images/fake/00023c53a28055f94cc742f4.png","complex_explanation_path":"train/complex_explanations/fake/00023c53a28055f94cc742f4.json","simple_explanation_path":"train/simple_explanations/fake/00023c53a28055f94cc742f4.json"}`;

const downloadCommand = `huggingface-cli login
huggingface-cli download ${DATASET.repoId} --repo-type dataset --local-dir ./XPlainVerse`;

const navItems = [
  ['Overview', '#overview'],
  ['Details', '#details'],
  ['Tasks', '#tasks'],
  ['Metrics', '#metrics'],
  ['Resources', '#resources'],
  ['Registration', '#registration'],
  ['Timeline', '#timeline'],
  ['People', '#people'],
  ['Contact', '#contact'],
] as const;

function hasLink(href?: string) {
  return Boolean(href && href.trim().length > 0);
}

function getLinkProps(href: string) {
  if (href.startsWith('#')) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noreferrer',
  };
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
  if (!href || !hasLink(href)) {
    return <span className="status-pill">Coming soon</span>;
  }

  return (
    <a href={href} className="text-link" {...getLinkProps(href)}>
      {label} <ArrowRight size={16} />
    </a>
  );
}

function LabelValueList({ items }: { items: LabelValue[] }) {
  return (
    <div className="meta-list">
      {items.map((item) => (
        <div key={item.label} className="meta-item">
          <div className="meta-label">{item.label}</div>
          <div className="meta-value">{item.value}</div>
        </div>
      ))}
    </div>
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
        <a href={href} target="_blank" rel="noreferrer" className="person-name">
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

              <p className="hero-subtext">
                The Explainable Deepfake Detection Challenge introduces{' '}
                <strong>{DATASET.name}</strong>, a large-scale benchmark for image-level
                deepfake detection and explanation generation built on top of
                MultiFakeVerse. Participants are asked not only to determine whether an
                image is real or fake, but also to provide two grounded natural-language
                explanations: a detailed <strong>complex explanation</strong> and a
                non-technical <strong>simple explanation</strong>.
              </p>

              <p className="hero-subtext">
                The current release includes the training and validation splits of{' '}
                <strong>{DATASET.name}</strong>, together with complex explanation
                annotations, released simple explanations for fake samples,
                evaluation assets, and manifest metadata for each sample.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#details">
                  Challenge Details <ArrowRight size={18} />
                </a>
                <a
                  className="button button-secondary"
                  href={LINKS.dataset}
                  {...getLinkProps(LINKS.dataset)}
                >
                  Open Dataset
                </a>
              </div>
            </div>

            <div className="hero-panel">
              <div className="panel-card panel-accent">
                <div className="panel-kicker">Dataset Snapshot</div>
                <h3>Current XPlainVerse Release</h3>
                <p>
                  The current XPlainVerse release provides training and validation data
                  for both challenge tasks, together with complex explanations for both
                  classes, simple explanations for fake samples, and manifest metadata.
                </p>

                <div className="panel-metrics">
                  {heroHighlights.map((item) => (
                    <div key={item.label} className="panel-metric">
                      <div className="panel-metric-label">{item.label}</div>
                      <div className="panel-metric-value">{item.value}</div>
                    </div>
                  ))}
                </div>
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
          <div className="container narrow-layout">
            <SectionHeader
              eyebrow="Overview"
              title="Challenge Description"
              text="The challenge focuses on both image authenticity prediction and grounded explanation generation."
            />

            <article className="content-card prose-card">
              <p>
                Deepfake detection is increasingly moving beyond simple face swaps
                toward richer semantic manipulations. This challenge focuses on both
                identifying manipulated content and explaining model decisions. In
                many practical settings, a prediction alone is not enough; systems
                should also indicate the visual evidence that supports a decision.
              </p>
              <p>
                <strong>{DATASET.name}</strong> builds on top of MultiFakeVerse and 
                extends it with paired explanation annotations for explainable 
                deepfake analysis. The challenge includes two 
                tasks: <strong>Deepfake Detection</strong>, where the goal is to
                identify whether an image is real or fake, and{' '}
                <strong>Deepfake Explanation</strong>, where the goal is to explain the
                model&apos;s decision using visible evidence in the image through both a
                detailed complex explanation for technical users and a simplified
                 explanation for the masses.
              </p>
              <p>
                The current release provides <strong>{DATASET.totalImages}</strong>{' '}
                images across the training and validation splits, together with paired
                explanation annotations and manifest metadata for each sample. This
                supports both predictive evaluation and analysis of how models justify
                their decisions.
              </p>
            </article>
          </div>
        </section>

        <section id="details" className="section section-alt">
          <div className="container narrow-layout">
            <SectionHeader
              eyebrow="Details"
              title="Challenge Details"
              text="Dataset summary, structure, metadata format, and access workflow."
            />

            <div className="details-stack">
              <article className="content-card prose-card detail-section-block">
                <h3>Dataset Summary</h3>
                <p>
                  For both tasks, we use <strong>{DATASET.name}</strong>. The dataset contains{' '}
                  <strong>{DATASET.totalImages}</strong> images across the currently
                  released training and validation splits, including{' '}
                  <strong>{DATASET.totalReal}</strong> real and{' '}
                  <strong>{DATASET.totalFake}</strong> fake images. Each sample is
                  accompanied by the metadata needed to locate the image and its paired
                  explanation file, supporting both detection and explanation
                  experiments.
                </p>

                <table className="data-table dense-table">
                  <thead>
                    <tr>
                      <th>Subset</th>
                      <th>Images</th>
                      <th>Real</th>
                      <th>Fake</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasetBreakdown.map((row) => (
                      <tr key={row.split}>
                        <td>{row.split}</td>
                        <td>{row.images}</td>
                        <td>{row.real}</td>
                        <td>{row.fake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="inline-note">
                  The current public release includes the train and validation splits.
                  The test set will be released later.
                </p>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Dataset Structure</h3>
                <p>
                  Each split contains an <code>images</code> directory, a paired{' '}
                  <code>complex_explanations</code> directory, a{' '}
                  <code>simple_explanations</code> directory, and a{' '}
                  <code>manifest.jsonl</code> file. Complex explanations are organized
                  for both <code>fake</code> and <code>real</code> images, while simple
                  explanations are only provided for <code>fake</code>. Each
                  explanation JSON corresponds to the image with the same filename
                  stem, making it easy to pair visual samples with their grounded
                  textual annotations.
                </p>

                <pre className="code-card">
                  <code>{datasetLayout}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Metadata Details</h3>
                <p>
                  Each line in <code>manifest.jsonl</code> stores the label and relative
                  paths needed to load an image together with its complex and simple
                  explanation files.
                </p>

                <LabelValueList items={metadataFields} />

                <pre className="code-card code-compact">
                  <code>{manifestExample}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Dataset Access</h3>
                <p>
                  Dataset access is handled through the challenge registration process.
                  Once the required steps are complete, approved teams can download
                  XPlainVerse from Hugging Face using the command below.
                </p>

                <ol className="step-list">
                  {accessSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>

                <pre className="code-card">
                  <code>{downloadCommand}</code>
                </pre>
              </article>
            </div>
          </div>
        </section>

        <section id="tasks" className="section">
          <div className="container narrow-layout">
            <SectionHeader
              eyebrow="Tasks"
              title="Challenge Tasks"
              text="The challenge consists of two tasks on XPlainVerse: authenticity prediction and grounded explanation generation."
            />

            <div className="task-stack">
              <article className="content-card prose-card task-detail-card">
                <div className="task-heading-row">
                  <div className="icon-chip">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3>Task 1: Deepfake Detection</h3>
                    <p className="task-kicker">
                      In this task, participants are asked to determine whether an input
                      image is <strong>real</strong> or <strong>fake</strong>.
                    </p>
                  </div>
                </div>

                <p>
                  This is the authenticity classification task of the challenge.
                  Participants are expected to develop their methods using the released
                  training and validation splits of XPlainVerse, and submit predictions
                  for the official test set when it is released.
                </p>

                <p>
                  <strong>Real:</strong> the image is authentic and does not contain
                  synthesized or manipulated visual content.
                </p>

                <p>
                  <strong>Fake:</strong> the image is generated or manipulated.
                </p>

                <p>
                  The model output for each test image should be a single authenticity
                  prediction. The official evaluation metric and submission template will
                  be released together with the test set and evaluation package.
                </p>
              </article>

              <article className="content-card prose-card task-detail-card">
                <div className="task-heading-row">
                  <div className="icon-chip">
                    <ClipboardPenLine size={20} />
                  </div>
                  <div>
                    <h3>Task 2: Deepfake Explanation</h3>
                    <p className="task-kicker">
                      In this task, participants are asked to generate both a complex
                      explanation and a simple explanation supporting the authenticity
                      decision for the input image.
                    </p>
                  </div>
                </div>

                <p>
                  This task focuses on explainability. In addition to recognizing whether
                  an image is real or fake, participants must produce two explanations
                  grounded in the image itself. Both should justify the decision using
                  visible evidence, such as artifacts, inconsistencies, or other
                  authenticity cues, but they serve different communicative purposes.
                </p>

                <p>
                  The <strong>complex explanation</strong> should be evidence-rich and
                  specific, while the <strong>simple explanation</strong> should convey
                  the core reason in a clearer, shorter, and more accessible way.
                  Both explanations must remain consistent with the submitted
                  authenticity label.
                </p>

                <div className="card-grid two-up nested-grid">
                  {explanationTracks.map((track) => (
                    <div key={track.title} className="track-card">
                      <div className="track-tag">{track.tag}</div>
                      <h4>{track.title}</h4>
                      <p>{track.text}</p>
                    </div>
                  ))}
                </div>

                <p>
                  Participants may use the paired explanation annotations provided in
                  XPlainVerse to develop and validate their methods. The public
                  evaluation bundle scores the complex and simple outputs separately and
                  reports both track-specific scores and overall explanation scores.
                </p>

                <pre className="code-card code-compact">
                  <code>{submissionExample}</code>
                </pre>

                <p className="inline-note">
                  The explanation submission for each sample should include the
                  authenticity label, one complex explanation, and one simple
                  explanation.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="metrics" className="section section-alt">
          <div className="container narrow-layout">
            <SectionHeader
              eyebrow="Metrics"
              title="How Task 2 Is Evaluated"
              text="The public evaluator scores complex and simple explanations separately. Complex explanations are judged on semantic match and evidence overlap, while simple explanations are judged on semantic match and simplicity."
            />

            <div className="details-stack">
              <article className="content-card prose-card detail-section-block">
                <h3>Complex Explanation Metrics</h3>
                <p>
                  The complex explanation track asks a simple question: does the
                  prediction say the same important things as the reference, and does
                  it point to the same visual evidence? To answer that, the evaluator
                  combines one semantic similarity score with two evidence-overlap
                  scores. For the overlap-based metrics, the evaluator uses{' '}
                  <code>Qwen/Qwen3.5-4B</code> to extract structured evidence from both
                  explanations before checking coverage in both directions.
                </p>

                <div className="card-grid two-up nested-grid">
                  {complexMetricItems.map((metric) => (
                    <div key={metric.name} className="metric-card">
                      <div className="metric-name">{metric.name}</div>
                      <p>{metric.text}</p>
                    </div>
                  ))}
                </div>

                <pre className="code-card">
                  <code>{complexMetricFormula}</code>
                </pre>

                <p className="inline-note">
                  In other words, the evaluator first extracts entities and facts from
                  one explanation, checks whether they are covered by the other
                  explanation, and then repeats the same process in reverse. This
                  rewards explanations that recover the same evidence without adding
                  unsupported content.
                </p>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Simple Explanation Metrics</h3>
                <p>
                  The simple explanation track is designed to reward two things at the
                  same time: faithfulness and simplicity. A good simple explanation
                  should preserve the core reason from the reference while expressing
                  it in a shorter, easier form.
                </p>

                <div className="card-grid three-up nested-grid">
                  {simpleMetricItems.map((metric) => (
                    <div key={metric.name} className="metric-card">
                      <div className="metric-name">{metric.name}</div>
                      <p>{metric.text}</p>
                    </div>
                  ))}
                </div>

                <pre className="code-card">
                  <code>{simpleMetricFormula}</code>
                </pre>

                <p className="inline-note">
                  The raw SLE value is clipped and normalized before it is combined
                  with BERTScore. In the dataset, because the real samples
                  has no separate simple explanation, the complex explanation is used
                  as the simple reference.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="resources" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Resources"
              title="Dataset and Resources"
              text="Official materials that are currently available."
            />

            <div className="resource-grid">
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

        <section id="registration" className="section">
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
                  Register your team first so the organizers can match your dataset
                  access request with your challenge submission details.
                </p>

                <div className="registration-actions">
                  {hasLink(LINKS.registrationForm) ? (
                    <a
                      href={LINKS.registrationForm}
                      className="button button-primary"
                      {...getLinkProps(LINKS.registrationForm)}
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
                  Download the dataset EULA, sign it, and email the signed copy to the
                  organizers. After the registration and EULA process is complete,
                  approved teams will be able to access the dataset release on Hugging
                  Face.
                </p>

                <p>
                  Please email the signed EULA to{' '}
                  <a href="mailto:abhinav.dhall@monash.edu" className="inline-link">
                    abhinav.dhall@monash.edu
                  </a>{' '}
                  and{' '}
                  <a
                    href="mailto:explainable.deepfakes.challenge@gmail.com"
                    className="inline-link"
                  >
                    explainable.deepfakes.challenge@gmail.com
                  </a>
                  .
                </p>

                <div className="registration-actions">
                  {hasLink(LINKS.eula) ? (
                    <a
                      href={LINKS.eula}
                      className="button button-primary"
                      {...getLinkProps(LINKS.eula)}
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

        <section id="timeline" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Timeline"
              title="Schedule"
              text="Important dates for the challenge."
            />

            <div className="timeline">
              {[
                {
                  date: '22 Mar 2026',
                  title: 'Data and resources released',
                  description:
                    'XPlainVerse and the initial challenge materials are released.',
                },
                {
                  date: '10 May 2026',
                  title: 'Result submission starts',
                  description: 'Leaderboard and result submission open.',
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
              ].map((item, index) => (
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

        <section id="people" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="People"
              title="People"
              text="Challenge organizers, data chairs, and program committee."
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

            <div className="people-block">
              <div className="people-subheading">Program Committee</div>
              <div className="people-grid">
                {people.programCommittee.map((person) => (
                  <PersonCard key={person.name} {...person} />
                ))}
              </div>
            </div>
          </div>
        </section>

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
            <a href="#details">Details</a>
            <a href="#metrics">Metrics</a>
            <a href="#registration">Registration</a>
            <a href="#timeline">Schedule</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
