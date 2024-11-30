# MRI Brain Tumor Detection

## Table of Contents

- [MRI Brain Tumor Detection](#mri-brain-tumor-detection)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Motivation](#motivation)
  - [Objectives](#objectives)
  - [Methodology](#methodology)
    - [System Architecture](#system-architecture)
    - [Model Implementation](#model-implementation)

## Introduction

Brain tumor diagnosis is a critical medical process that relies heavily on precise analysis of Magnetic Resonance Imaging (MRI) scans. Each scan captures intricate details of brain tissue, where subtle differences in intensity values can signal abnormalities, such as tumors. However, manually analyzing these scans is time-consuming and prone to human error, especially given the tumor shape, size, and location variability. Advances in computer vision and deep learning have paved the way for automated solutions capable of addressing these challenges by leveraging large datasets and sophisticated algorithms.

## Motivation

Timely and accurate diagnosis of brain tumors is essential to improve patient outcomes. However, the complexity of MRI image analysis often strains healthcare resources, leaving room for delays in diagnosis and treatment. Automating the segmentation and classification of brain tumors using deep learning models offers a transformative solution. By reducing reliance on manual interpretation, such systems can enhance diagnostic accuracy, streamline clinical workflows, and ensure patients receive faster and more effective care. Furthermore, advancements in frameworks like TensorFlow and PyTorch, combined with specialized tools for medical imaging such as Nibabel and OpenCV, make such tools increasingly feasible.

## Objectives

This project uses Python and state-of-the-art frameworks to create a robust AI-driven system for segmenting and classifying brain tumors from MRI scans. Key objectives include:

1. Developing a Segmentation Model: Implement a U-Net-based architecture to delineate brain tumors and their surrounding critical structures with precision.
2. Building a Classification System: Design a convolutional neural network (CNN) capable of distinguishing between tumor types or the presence versus absence of tumors.
3. Optimizing Model Performance: Achieve high accuracy and precision in both segmentation and classification, targeting metrics such as Testing Accuracy scores above 95% and robust sensitivity and specificity rates.
4. Enhancing Usability: Provide an intuitive, web-based interface using frameworks like Flask or React for seamless integration into hospital environments, supported by secure cloud deployment on platforms like AWS or Google Cloud using Docker.

## Methodology

### System Architecture

The system architecture encompasses four core components: preprocessing, segmentation, classification, and user interface development.

1. Preprocessing: Raw MRI scans are standardized using DICOM protocols and prepared through denoising, resizing, and normalization using OpenCV and SimpleITK.
2. Segmentation: A U-Net model is utilized to detect brain tumors and surrounding structures, ensuring precise boundary definitions critical for diagnosis.
3. Classification: A Convolutional Neural Network (CNN) architecture, such as ResNet or DenseNet, classifies the segmented regions into specific tumor types.
4. User Interface Development: The processed data and results are integrated into a user-friendly web application, developed using Flask or React frameworks, for seamless interaction by hospital staff.

### Model Implementation

- Segmentation: The U-Net model was implemented to delineate brain tumor regions from MRI scans. This model leverages its encoder-decoder architecture to retain spatial context while producing pixel-level segmentation. The training involved optimizing the Dice loss function to handle class imbalances in medical datasets.
- Classification: To classify tumor types, a pre-trained ResNet model, fine-tuned on MRI data, is used. The CNN's feature extraction layers are complemented by dense layers for decision-making, ensuring robust performance.
- Data Handling: MRI data were sourced from publicly available, anonymized medical datasets. Data preprocessing included histogram equalization, noise reduction, and augmentation techniques to increase model robustness. OpenCV and SimpleITK facilitated image transformations and metadata handling.
