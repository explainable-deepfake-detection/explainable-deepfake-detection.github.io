import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
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
  totalImages: '760,000',
  trainValImages: '560,000',
  trainValReal: '180,000',
  trainValFake: '380,000',
  testImages: '200,000',
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
  codabench: 'https://www.codabench.org/competitions/16461/',
  registrationForm: 'https://forms.office.com/r/gWypG9JGpe',
  eula: 'docs/EULA_Explainable_Deepfake_Detection_Challenge_2026.pdf',
  contactAbhinav: 'mailto:Abhinav.dhall@monash.edu',
  contactAbhijeet: 'mailto:abhijeet.narang1@monash.edu',
};

const stats = [
  { value: DATASET.name, label: 'Official Benchmark' },
  { value: DATASET.totalImages, label: 'Images' },
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
  { split: 'Test', images: DATASET.testImages, real: 'Hidden', fake: 'Hidden' },
];

const heroHighlights = [
  { label: 'Training split', value: '450,000 images' },
  { label: 'Validation split', value: '110,000 images' },
  { label: 'Test split', value: `${DATASET.testImages} images` },
  { label: 'Submission deadline', value: '15 Jun 2026' },
  { label: 'Submission fields', value: 'Detection + complex + simple explanations' },
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

const submissionFormatRows = [
  {
    file: 'detection.jsonl',
    rows: 'One row for every final-test image.',
    fields: 'id, pred_label where 0 = real and 1 = fake.',
  },
  {
    file: 'complex.jsonl',
    rows: 'One row for every final-test image; scored on a hidden 10,000-sample explanation subset.',
    fields: 'id, complex_explanation.',
  },
  {
    file: 'simple.jsonl',
    rows: 'One row for every final-test image; scored on the same hidden explanation subset.',
    fields: 'id, simple_explanation.',
  },
];

const submissionPolicyRows = [
  {
    item: 'Detection coverage',
    detail:
      'Submit one detection row for every final-test image. Missing detection rows are treated as incorrect predictions.',
  },
  {
    item: 'Explanation coverage',
    detail:
      'Complex and simple explanation files are evaluated on the explanation-evaluation subset. Missing explanation rows receive zero score for those samples.',
  },
  {
    item: 'Archive structure',
    detail:
      'Place detection.jsonl, complex.jsonl, and simple.jsonl at the root of the submitted zip file, with no top-level folder.',
  },
  {
    item: 'Filename matching',
    detail:
      'Every id value must exactly match the released test image filename, including the extension.',
  },
];

const submissionScoreRows = [
  {
    metric: 'Task 1',
    summary: 'Detection macro F1 and detection accuracy over all final-test images.',
  },
  {
    metric: 'Task 2',
    summary:
      'Explanation score on the 10,000-sample explanation-evaluation subset.',
  },
  {
    metric: 'Leaderboard explanation score',
    summary: '(complex_bert_f1 + simple_overall_score) / 2.',
  },
  {
    metric: 'Overall score',
    summary:
      '(detection_macro_f1 + explanation_score) / 2. The leaderboard is sorted by this score.',
  },
];

const testArchiveCommand = `cd XPlainVerse
cat test/test_images.tar.part-* > test/test_images.tar
tar -xf test/test_images.tar -C test`;

const submissionPackageLayout = `submission.zip
|-- detection.jsonl
|-- complex.jsonl
'-- simple.jsonl`;

const detectionMetricItems = [
  {
    name: 'detection_macro_f1',
    text:
      'Macro F1 over the real and fake classes, computed over all final-test images.',
  },
  {
    name: 'detection_accuracy',
    text:
      'Overall real/fake classification accuracy over all final-test images.',
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
      'Additional final-reporting metric. Qwen 3.5 4B extracts diagnostic entities from both the ground-truth explanation and the predicted explanation, checks coverage in both directions, and combines those directional scores into an F1.',
  },
  {
    name: 'complex_evidence_f1',
    text:
      'Additional final-reporting metric. Qwen 3.5 4B extracts evidence claims from both the ground-truth explanation and the predicted explanation, checks coverage in both directions, and combines those directional scores into an F1.',
  },
  {
    name: 'grounding_score',
    text:
      'Additional final-reporting score for the top 5 teams: the average of complex_entity_f1 and complex_evidence_f1. This is the LLM-based component of the final explanation score.',
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

const detectionMetricFormula = `detection_macro_f1 = macro_f1(real, fake)
detection_accuracy = correct_labels / total_images`;

const complexMetricFormula = `complex_entity_f1 = harmonic_mean(entity_precision, entity_recall)
complex_evidence_f1 = harmonic_mean(evidence_precision, evidence_recall)

grounding_score =
  (complex_entity_f1 + complex_evidence_f1) / 2`;

const simpleMetricFormula = `simple_sle_norm = clip(simple_sle_score, -1, 4)
simple_sle_norm = (simple_sle_norm + 1) / 5

simple_overall_score =
  0.7 * simple_bert_f1 +
  0.3 * simple_sle_norm`;

const explanationMetricFormula = `leaderboard_explanation_score =
  (complex_bert_f1 + simple_overall_score) / 2

final_explanation_score =
  0.4 * leaderboard_explanation_score +
  0.6 * grounding_score`;

const overallMetricFormula = `overall_score =
  (detection_macro_f1 + explanation_score) / 2`;

const validationBaselineRows = [
  {
    model: 'Qwen3-VL-8B-XPlainVerse',
    detectionF1: '0.713070',
    detectionAccuracy: '0.749027',
    complexBertF1: '0.677412',
    simpleBertF1: '0.682438',
    simpleSleNorm: '0.560891',
    simpleOverall: '0.645974',
    explanationScore: '0.661693',
  },
  {
    model: 'InternVL3.5-14B-XPlainVerse',
    detectionF1: '0.624027',
    detectionAccuracy: '0.668991',
    complexBertF1: '0.665358',
    simpleBertF1: '0.672473',
    simpleSleNorm: '0.563061',
    simpleOverall: '0.639649',
    explanationScore: '0.652504',
  },
];

const resources: Resource[] = [
  {
    icon: Database,
    title: 'XPlainVerse Dataset',
    text: 'Official Hugging Face release of XPlainVerse, including training and validation data, paired explanation annotations, manifest metadata, and the final-test image release.',
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
  {
    icon: ClipboardPenLine,
    title: 'Codabench Platform',
    text: 'Official challenge submission and leaderboard platform for the final evaluation phase.',
    href: LINKS.codabench,
    linkLabel: 'Open Codabench',
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
    {
      name: 'Ping Liu',
      affiliation: 'University of Nevada Reno',
      image: '/people/ping-liu.jpg',
      href: 'https://pinglmlcv.github.io/pingliu264/',  
    },
    {
      name: 'Rajesh Sharma',
      affiliation: 'Plaksha University',
      image: '/people/rajesh-sharma.jpg',
      href: 'https://plaksha.edu.in/faculty-details/rajesh-sharma/',  
    }
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
|-- val/
|   |-- manifest.jsonl
|   |-- images/
|   |   |-- fake/
|   |   '-- real/
|   |-- complex_explanations/
|   |   |-- fake/
|   |   '-- real/
|   '-- simple_explanations/
|       '-- fake/
'-- test/
    '-- images/`;

const manifestExample = `{"label":"fake","image_path":"train/images/fake/00023c53a28055f94cc742f4.png","complex_explanation_path":"train/complex_explanations/fake/00023c53a28055f94cc742f4.json","simple_explanation_path":"train/simple_explanations/fake/00023c53a28055f94cc742f4.json"}`;

const downloadCommand = `huggingface-cli login
huggingface-cli download ${DATASET.repoId} --repo-type dataset --local-dir ./XPlainVerse`;

type PageId =
  | 'overview'
  | 'details'
  | 'tasks'
  | 'metrics'
  | 'submission'
  | 'resources'
  | 'registration'
  | 'timeline'
  | 'people';

const pageIds: PageId[] = [
  'overview',
  'details',
  'tasks',
  'metrics',
  'submission',
  'resources',
  'registration',
  'timeline',
  'people',
];

const navItems: { label: string; page: PageId }[] = [
  { label: 'Overview', page: 'overview' },
  { label: 'Details', page: 'details' },
  { label: 'Tasks', page: 'tasks' },
  { label: 'Metrics', page: 'metrics' },
  { label: 'Submission', page: 'submission' },
  { label: 'Resources', page: 'resources' },
  { label: 'Registration', page: 'registration' },
  { label: 'Timeline', page: 'timeline' },
  { label: 'People', page: 'people' },
] as const;

function isPageId(value: string): value is PageId {
  return pageIds.includes(value as PageId);
}

function getPageFromHash(): PageId {
  const hashPage = window.location.hash.replace(/^#/, '');

  if (isPageId(hashPage)) {
    return hashPage;
  }

  return 'overview';
}

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
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);

  useEffect(() => {
    const syncPageWithUrl = () => {
      setActivePage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', syncPageWithUrl);
    window.addEventListener('popstate', syncPageWithUrl);

    return () => {
      window.removeEventListener('hashchange', syncPageWithUrl);
      window.removeEventListener('popstate', syncPageWithUrl);
    };
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand brand-button" type="button" onClick={() => navigateTo('overview')}>
            <div className="brand-badge">DFX</div>
            <div>
              <div className="brand-title">{SITE.shortTitle}</div>
              <div className="brand-subtitle">{SITE.location}</div>
            </div>
          </button>

          <nav className="nav desktop-nav" aria-label="Primary">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                className={activePage === page ? 'active' : undefined}
                type="button"
                onClick={() => navigateTo(page)}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            className="button button-small button-primary"
            type="button"
            onClick={() => navigateTo('registration')}
          >
            Register
          </button>
        </div>
      </header>

      <main id="top" className="page-main">
        {activePage === 'overview' && (
        <>
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
                The current release includes training and validation data for{' '}
                <strong>{DATASET.name}</strong> with explanation annotations, plus the
                final-test image split, evaluation assets, and manifest metadata.
              </p>

              <div className="hero-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => navigateTo('submission')}
                >
                  Submission Guide <ArrowRight size={18} />
                </button>
                {hasLink(LINKS.codabench) ? (
                  <a
                    className="button button-primary"
                    href={LINKS.codabench}
                    {...getLinkProps(LINKS.codabench)}
                  >
                    Submit on Codabench
                  </a>
                ) : (
                  <span className="button button-secondary button-disabled">
                    Codabench link unavailable
                  </span>
                )}
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
                  The XPlainVerse release for this challenge provides training and
                  validation data for both challenge tasks, the final-test image split,
                  explanation annotations for development, and manifest metadata.
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
                images across the training, validation, and test splits. Training and
                validation samples include paired explanation annotations and manifest
                metadata, while the test split is released for final challenge
                submission. This supports both predictive evaluation and analysis of
                how models justify their decisions.
              </p>
            </article>
          </div>
        </section>
        </>
        )}

        {activePage === 'details' && (
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
                  released training, validation, and test splits. The released training
                  and validation splits contain <strong>{DATASET.trainValImages}</strong>{' '}
                  images, including <strong>{DATASET.trainValReal}</strong> real and{' '}
                  <strong>{DATASET.trainValFake}</strong> fake images; the real/fake
                  composition of the final test split is not disclosed. Each released
                  sample is accompanied by the metadata needed to locate the image, and
                  training/validation samples include paired explanation files for
                  development and validation.
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
                  The test split is released for challenge submission with hidden
                  labels and hidden reference explanations.
                </p>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Dataset Structure</h3>
                <p>
                  Training and validation splits contain an <code>images</code>{' '}
                  directory, paired <code>complex_explanations</code> and{' '}
                  <code>simple_explanations</code> directories, and a{' '}
                  <code>manifest.jsonl</code> file. Complex explanations are organized
                  for both <code>fake</code> and <code>real</code> images, while simple
                  explanations are only provided for <code>fake</code>. After
                  extracting the released multipart archives, the test split contains a
                  flat <code>images</code> directory for final submission.
                </p>

                <pre className="code-card">
                  <code>{datasetLayout}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Metadata Details</h3>
                <p>
                  For training and validation, each line in <code>manifest.jsonl</code>{' '}
                  stores the label and relative paths needed to load an image together
                  with its complex and simple explanation files.
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
        )}

        {activePage === 'tasks' && (
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
                  for the released final test set.
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
                  prediction. Task 1 is evaluated with detection F1 and detection
                  accuracy over the final-test images.
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

                <p>
                  Task 2 has two required explanation outputs for the same image:
                  one complex explanation and one simple explanation.
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

                <p className="inline-note">
                  The official submission package is split into separate detection,
                  complex explanation, and simple explanation files. See the
                  Submission tab for the exact JSONL files and packaging rules.
                </p>
              </article>
            </div>
          </div>
        </section>
        )}

        {activePage === 'submission' && (
        <section id="submission" className="section section-alt">
          <div className="container narrow-layout">
            <SectionHeader
              eyebrow="Submission"
              title="Submission Guide"
              text="What to submit, how to package it, and how the leaderboard treats missing rows."
            />

            <div className="details-stack">
              <article className="content-card prose-card detail-section-block">
                <h3>Codabench Submission</h3>
                <p>
                  Official final-test submissions are handled through Codabench.
                  Teams may submit once per day and up to 10 times in total during
                  the final phase.
                </p>
                <p>
                  Each team can have only one public leaderboard entry. Teams may
                  choose which submitted run to display on the leaderboard using the
                  submission controls in Codabench.
                </p>

                <div className="hero-actions">
                  {hasLink(LINKS.codabench) ? (
                    <a
                      className="button button-primary"
                      href={LINKS.codabench}
                      {...getLinkProps(LINKS.codabench)}
                    >
                      Submit on Codabench <ArrowRight size={18} />
                    </a>
                  ) : (
                    <span className="status-pill large">Codabench link unavailable</span>
                  )}
                </div>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Required Files</h3>
                <p>
                  Submissions should be provided as JSONL files. The <code>id</code>{' '}
                  value must exactly match the released test image filename, including
                  the file extension.
                </p>

                <table className="data-table dense-table">
                  <thead>
                    <tr>
                      <th>File</th>
                      <th>Rows</th>
                      <th>Required fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionFormatRows.map((row) => (
                      <tr key={row.file}>
                        <td>
                          <code>{row.file}</code>
                        </td>
                        <td>{row.rows}</td>
                        <td>{row.fields}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="inline-note">
                  For <code>detection.jsonl</code>, <code>pred_label</code> must be{' '}
                  <code>0</code> for real and <code>1</code> for fake.
                </p>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Package Layout</h3>
                <p>
                  The submitted zip should contain the three JSONL files at its root.
                  Do not place the files inside a top-level folder.
                </p>

                <pre className="code-card">
                  <code>{submissionPackageLayout}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Test Image Archives</h3>
                <p>
                  The test images are released as multipart tar files stored directly
                  under <code>test/</code>. Join the parts first, then extract the tar
                  archive. The archive extracts into a flat <code>images/</code>{' '}
                  directory under <code>test/</code>.
                </p>

                <pre className="code-card">
                  <code>{testArchiveCommand}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Missing Rows and Matching</h3>
                <table className="data-table dense-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionPolicyRows.map((row) => (
                      <tr key={row.item}>
                        <td>{row.item}</td>
                        <td>{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Scoring Summary</h3>
                <p>
                  The leaderboard uses standard detection metrics for Task 1 and the
                  combined explanation score for Task 2. The public leaderboard is
                  sorted by the overall score, which combines both parts.
                </p>

                <table className="data-table dense-table">
                  <thead>
                    <tr>
                      <th>Metric group</th>
                      <th>Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionScoreRows.map((row) => (
                      <tr key={row.metric}>
                        <td>{row.metric}</td>
                        <td>{row.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="inline-note">
                  After the leaderboard phase, the organizers will select the top 5
                  teams and compute the complete complex-explanation metrics for final
                  reporting, including <code>complex_entity_f1</code>,{' '}
                  <code>complex_evidence_f1</code>, and{' '}
                  <code>grounding_score</code>. The final explanation score combines
                  40% leaderboard explanation score and 60% LLM-based grounding
                  score.
                </p>
              </article>
            </div>
          </div>
        </section>
        )}

        {activePage === 'metrics' && (
        <section id="metrics" className="section section-alt">
          <div className="container narrow-layout">
            <SectionHeader
              eyebrow="Metrics"
              title="Evaluation"
              text="Task 1 evaluates image-level detection. Task 2 evaluates complex and simple explanations on the explanation-evaluation subset."
            />

            <div className="details-stack">
              <article className="content-card prose-card detail-section-block">
                <h3>Task 1: Detection Metrics</h3>
                <p>
                  Deepfake detection is scored over all final-test images using standard
                  binary classification metrics.
                </p>

                <div className="card-grid two-up nested-grid">
                  {detectionMetricItems.map((metric) => (
                    <div key={metric.name} className="metric-card">
                      <div className="metric-name">{metric.name}</div>
                      <p>{metric.text}</p>
                    </div>
                  ))}
                </div>

                <pre className="code-card">
                  <code>{detectionMetricFormula}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Task 2: Complex Explanation Metrics</h3>
                <p>
                  The complex explanation track asks a simple question: does the
                  prediction say the same important things as the reference, and does
                  it point to the same visual evidence? To answer that, the evaluator
                  combines one semantic similarity score with two evidence-overlap
                  scores. For the overlap-based metrics, the evaluator uses{' '}
                  <code>Qwen/Qwen3.5-4B</code> to extract structured evidence from both
                  explanations before checking coverage in both directions.
                </p>

                <p className="inline-note">
                  The public Codabench leaderboard uses <code>complex_bert_f1</code>{' '}
                  for complex explanations. <code>complex_entity_f1</code>,{' '}
                  <code>complex_evidence_f1</code>, and{' '}
                  <code>grounding_score</code> are additional final-reporting
                  metrics for the top 5 teams, not the full public leaderboard score.
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
                  In other words, the evaluator first extracts entities and evidence
                  claims from one explanation, checks whether they are covered by the
                  other explanation, and then repeats the same process in reverse. This
                  rewards explanations that recover the same evidence without adding
                  unsupported content.
                </p>

                <p className="inline-note">
                  For Codabench leaderboard scoring, complex explanations are scored
                  with <code>complex_bert_f1</code> on the 10,000-sample
                  explanation-evaluation subset.
                </p>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Task 2: Simple Explanation Metrics</h3>
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
                  with BERTScore. In the dataset, because real samples
                  have no separate simple explanation, the complex explanation is used
                  as the simple reference.
                </p>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Explanation Score</h3>
                <p>
                  Task 2 combines the complex and simple tracks on the same
                  10,000-sample explanation-evaluation subset.
                </p>

                <pre className="code-card">
                  <code>{explanationMetricFormula}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Overall Score</h3>
                <p>
                  The main leaderboard score combines detection performance with the
                  explanation score.
                </p>

                <pre className="code-card">
                  <code>{overallMetricFormula}</code>
                </pre>
              </article>

              <article className="content-card prose-card detail-section-block">
                <h3>Validation Baselines</h3>
                <p>
                  The following validation results are reported for the fine-tuned
                  baseline models.
                </p>

                <table className="data-table dense-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Detection F1</th>
                      <th>Detection Accuracy</th>
                      <th>Complex BERT F1</th>
                      <th>Simple BERT F1</th>
                      <th>Simple SLE Norm</th>
                      <th>Simple Overall</th>
                      <th>Explanation Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationBaselineRows.map((row) => (
                      <tr key={row.model}>
                        <td>{row.model}</td>
                        <td>{row.detectionF1}</td>
                        <td>{row.detectionAccuracy}</td>
                        <td>{row.complexBertF1}</td>
                        <td>{row.simpleBertF1}</td>
                        <td>{row.simpleSleNorm}</td>
                        <td>{row.simpleOverall}</td>
                        <td>{row.explanationScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>
          </div>
        </section>
        )}

        {activePage === 'resources' && (
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
        )}

        {activePage === 'registration' && (
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

            <article className="content-card registration-policy-card">
              <div className="registration-step-label">Presentation policy</div>
              <h3>On-site presentation required</h3>
              <p>
                ACM Multimedia 2026 is an on-site event only. This means that all
                papers and contributions must be presented by a physical person
                on-site; remote presentations will not be hosted or allowed.
              </p>
              <p>
                Papers and contributions not presented on-site will be considered a
                no-show and removed from the proceedings of the conference. More
                details will be provided to handle unfortunate situations in which
                none of the authors would be able to attend the conference physically.
              </p>
            </article>
          </div>
        </section>
        )}

        {activePage === 'timeline' && (
        <section id="timeline" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="Timeline"
              title="Schedule"
              text="Important dates for the challenge."
            />

            <article className="content-card prose-card timeline-highlight-card">
              <div className="registration-step-label">Key deadline</div>
              <h3>Result submissions close on 15 Jun 2026</h3>
              <p>
                Submit final-test results before this deadline. Challenge paper
                submissions are due separately on 30 Jun 2026.
              </p>
            </article>

            <div className="timeline">
              {[
                {
                  date: '22 Mar 2026',
                  title: 'Data and resources released',
                  description:
                    'XPlainVerse and the initial challenge materials are released.',
                },
                {
                  date: '28 May 2026',
                  title: 'Result submission starts',
                  description: 'Leaderboard and result submission open.',
                },
                {
                  date: '15 Jun 2026',
                  title: 'Result submission deadline',
                  description: 'Final deadline for submitting challenge results.',
                },
                {
                  date: '30 Jun 2026',
                  title: 'Paper submission deadline',
                  description: 'Deadline for challenge paper submission.',
                },
                {
                  date: '16 Jul 2026',
                  title: 'Paper acceptance notification',
                  description: 'Acceptance decisions released to participants.',
                },
                {
                  date: '6 Aug 2026',
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
        )}

        {activePage === 'people' && (
        <>
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
        </>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-title">{SITE.shortTitle}</div>
            <p>ACM Multimedia 2026 Grand Challenge</p>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => navigateTo('overview')}>Overview</button>
            <button type="button" onClick={() => navigateTo('details')}>Details</button>
            <button type="button" onClick={() => navigateTo('metrics')}>Metrics</button>
            <button type="button" onClick={() => navigateTo('submission')}>Submission</button>
            <button type="button" onClick={() => navigateTo('timeline')}>Timeline</button>
            <button type="button" onClick={() => navigateTo('people')}>Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
