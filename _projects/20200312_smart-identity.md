---
title: "ECOWAS ID Card Classifier"
image: /assets/images/projects/smart-identity.png
github_link: https://github.com/marolAI/Smart-Identity
demo_link: https://smart-identity.streamlit.app
tags: CV CNN AI Automation
tech: Python Tensorflow Keras Streamlit 
---

In many organizations, people spend hours a day manually sorting scanned documents, often combing through thousands of pages to find and categorize ID cards. This workflow is slow (multiple minutes per batch), error-prone, and creates a bottleneck that keeps staff from higher-value tasks.

To solve this, I built an “automated digital clerk” that uses a lightweight TensorFlow/Keras CNN pipeline to detect and classify ECOWAS ID cards in mixed document batches. The system is trained on thousands of labeled images, includes a simple pre-processing step to locate candidate card regions, and outputs structured results in seconds.

The result: document sorting drops from minutes to seconds, misclassification errors are reduced to under 1%, and frontline staff are freed to focus on customer service, problem-solving, and other work that requires a human touch. This automation both improves accuracy and amplifies team productivity.