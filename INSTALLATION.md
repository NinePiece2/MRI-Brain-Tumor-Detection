# Installation Instructions

## Table of Contents

- [Installation Instructions](#installation-instructions)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Dataset Location](#dataset-location)
  - [Training Compile/Run Intructions](#training-compilerun-intructions)
  - [Application Compile/Run Instructions](#application-compilerun-instructions)
    - [API](#api)
    - [UI](#ui)
  - [Manual Deployment Instructions](#manual-deployment-instructions)
    - [Build the API](#build-the-api)
    - [Build the UI](#build-the-ui)
    - [Deploy the Application](#deploy-the-application)
  - [Automated Deployment Instructions](#automated-deployment-instructions)

## Requirements

- Python [3.9.13](https://www.python.org/downloads/release/python-3913/)
- [Node.js](https://nodejs.org/en/download/prebuilt-installer) 20.14.0 or higher

## Dataset Location

The two datasets used can be located at the following links:

- For Classification [Brain Tumor MRI Dataset](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset)
- For Segmentation [Brain MRI segmentation Dataset](https://www.kaggle.com/datasets/mateuszbuda/lgg-mri-segmentation)

## Training Compile/Run Intructions

- Download the datasets from the links provided above and extract them to a directory on your local machine
- In a ```.env``` file in the root directory add the variables ```CLASSIFICATION_DATASET_PATH``` and ```SEGMENTATION_DATASET_PATH``` to the path of the directories containing the datasets.
- Run ```pipenv install``` to install the required packages
- Run ```pipenv shell```
- In the Python Notebook select the pipenv environment, or use the command line to run the notebook.
- Run required blocks of code

## Application Compile/Run Instructions

### API

- In a ```.env``` file in the root directory add the variable ```MODEL_PATH``` to the path of the directory containing the models
- Run ```pipenv install``` to install the required packages
- Run ```pipenv shell```
- Enter the API directory in one terminal window using ```cd API```
- Run the API using ```python app.py```
  
### UI

- In a seperte terminal window enter the UI directory using ```cd UI```
- Run ```npm install```
- Run the UI using ```npm run dev```
- Open a browser and navigate to ```http://localhost:3000```
- Any code changes to the UI or API will automatically reload their respective applications

## Manual Deployment Instructions

### Build the API

- Download the classification_model.h5 and segmentation_model.h file from the release or create your own from the training instructions
- Create a directory in the project root called models and place the files in the directory /models
- With Docker installed, run the following commands:
  - ```docker build -f Flask-Dockerfile -t ninepiece2/mri-brain-tumor-detection:api .```
  - ```docker push ninepiece2/mri-brain-tumor-detection:api```

### Build the UI

- Run the following command in the UI directory:
  - ```npm install```
  - ```npm run build```
- With Docker installed, run the following commands in the project's root:
  - ```docker build -f NextJS-Dockerfile -t ninepiece2/mri-brain-tumor-detection:ui .```
  - ```docker push ninepiece2/mri-brain-tumor-detection:ui```

### Deploy the Application

The application can be deployed using the Docker Compose given in the project's root directory. The ```docker-compose.yml``` file contains the necessary configurations to deploy the API and UI. The ```docker-compose.yml``` file also contains a nginx container to proxy SSL requests UI container so it can be load balanced by HAProxy or other load balancers.

- Copy the docker-compose.yml file to the server
- Run the following command in the directory where the docker-compose.yml file is located:
  - ```docker-compose up -d```

## Automated Deployment Instructions

- Any changes to the main branch will automatically build and deploy the application to a Local Server
- The application can be accessed at ```https://mribraintumordetection.romitsagu.com```
