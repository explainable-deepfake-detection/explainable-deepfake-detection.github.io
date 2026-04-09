---
viewer: false
task_categories:
- image-classification
language:
- en
tags:
- deepfakes
- image
- classification
- explainability
pretty_name: XPlainVerse
size_categories:
- 100K<n<1M
license: other
extra_gated_prompt: "You have completed the challenge registration and agree to the EULA at https://explainable-deepfake-detection.github.io/"
extra_gated_fields:
  Your name: text
  Your email in the registration form: text
  Institution: text
  Challenge team name: text
  I have submitted the registration form: checkbox
  I have signed the EULA and sent it to the organizers: checkbox
  If we didn't receive the email with EULA, your access will not be approved: checkbox
---
# XPlainVerse

The dataset used for the [Explainable Deepfake Detection Challenge](https://explainable-deepfake-detection.github.io/).

## Tasks

### Task 1: Image-Level Deepfake Detection

Given an input image, the goal is to predict whether the image is `fake` or `real`.

### Task 2: Deepfake Explanation

Given an input image, the goal is to generate two grounded natural-language explanations that support the authenticity decision:

- `complex_explanation`: a detailed explanation grounded in visible evidence in the image
- `simple_explanation`: a shorter and simpler explanation that preserves the core reason

The dataset includes complex explanations for both `fake` and `real` samples, and simple explanations for `fake` samples.

## Prepare the dataset

Download the dataset by

```bash
huggingface-cli login
huggingface-cli download Abhijeet8901/XPlainVerse --repo-type dataset --local-dir ./XPlainVerse
```

After downloading, the dataset is organized as follows:

```text
XPlainVerse/
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
        '-- fake/
```

For each split:

- `images/` contains image files
- `complex_explanations/` contains paired complex explanation JSON files for both `fake` and `real`
- `simple_explanations/` contains paired simple explanation JSON files for `fake`
- `manifest.jsonl` contains the metadata for that split

Each explanation JSON corresponds to the image with the same filename stem.

## Manifest Format

Each row in `manifest.jsonl` contains:

- `label`: binary image label, `fake` or `real`
- `image_path`: relative path to the image file
- `complex_explanation_path`: relative path to the paired complex explanation JSON
- `simple_explanation_path`: relative path to the paired simple explanation JSON

For `real` images, `simple_explanation_path` is the same as `complex_explanation_path` because separate simple explanations are only provided for `fake` samples.

Example:

```json
{"label":"fake","image_path":"train/images/fake/00023c53a28055f94cc742f4.png","complex_explanation_path":"train/complex_explanations/fake/00023c53a28055f94cc742f4.json","simple_explanation_path":"train/simple_explanations/fake/00023c53a28055f94cc742f4.json"}
```

## Dataset Summary

**XPlainVerse** is a large-scale image dataset for explainable deepfake detection with paired explanation annotations.

### Dataset Statistics

| Subset     | #Images | #Real   | #Fake   |
|------------|--------:|--------:|--------:|
| Training   | 450,000 | 130,000 | 320,000 |
| Validation | 110,000 | 50,000  | 60,000  |

See the [challenge website](https://explainable-deepfake-detection.github.io/) for challenge details, registration, and updates.

