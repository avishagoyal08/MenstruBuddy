Here's a detailed `README.md` file for your MenstruBuddy project based on the information provided:

---

# MenstruBuddy

MenstruBuddy is an innovative web-based platform that integrates machine learning and web development to provide women with tools for menstrual health awareness and management. By focusing on common health concerns such as menstrual tracking and Polycystic Ovary Syndrome (PCOS) prediction, MenstruBuddy empowers women to take control of their reproductive health with accurate information and community support.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Dataset](#dataset)
- [Risk Analysis](#risk-analysis)
- [Testing](#testing)


## Introduction

MenstruBuddy was developed with the goal of providing women with easy access to health information related to their menstrual cycles and PCOS. The platform leverages machine learning algorithms to predict PCOS with 84% accuracy and features intuitive period tracking. It also promotes community-driven engagement through user-generated blogs and forums, allowing women to share their experiences and knowledge.

In regions like India, where cultural norms and misinformation often cloud discussions on women's health, MenstruBuddy aims to dispel myths and empower women to make informed health decisions.

## Features

- **Period Tracking**: Allows users to track their menstrual cycles through a user-friendly interface.
- **PCOS Prediction**: Uses Logistic Regression to predict PCOS with 84% accuracy.
- **Community Blogs**: A space for users to create, read, and update blogs, promoting shared experiences and support.
- **Government Health Awareness**: Provides information on government schemes related to women's health.
- **Exercise Recommendations**: Offers exercise suggestions tailored to different phases of the menstrual cycle.
- **Dynamic Data Visualization**: Presents real-time data on period tracking and health insights through engaging visuals.

## Technology Stack

- **Backend**: Flask, Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript)
- **Database**: MongoDB for storing user and blog data
- **Machine Learning**: Python, pandas, scikit-learn for PCOS prediction using Logistic Regression
- **Visualization**: Data visualization using D3.js for period tracking
- **Testing**: Google Lighthouse for performance, accessibility, and SEO

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MenstruBuddy.git
   ```

2. Install the required dependencies:
   ```bash
   cd MenstruBuddy
   npm install
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   node app.js
   ```

4. Access the platform by visiting `http://localhost:3000`.

## Usage

- **Period Tracking**: Log your cycle data, including start and end dates, and view your history and upcoming cycles.
- **PCOS Prediction**: Fill in health-related data such as weight, BMI, and cycle details to receive a PCOS prediction.
- **Blogs**: Create a personal blog or browse through other users' contributions on menstrual health.
- **Health Info**: Access detailed information about government health initiatives and recommendations for physical exercises during different menstrual phases.

## Dataset

The dataset used for PCOS prediction is derived from [Kaggle](https://www.kaggle.com/code/karnikakapoor/pcos-diagnosis/notebook). It consists of 541 entries with 22 selected features, including age, BMI, cycle length, and more. Data was pre-processed to ensure accuracy and consistency.

## Risk Analysis

The project underwent rigorous testing to mitigate risks related to system integration, model accuracy, and user security:
- **System Separation**: Frontend and machine learning model operate on separate ports, communicating through HTTP requests to avoid integration issues.
- **Security**: User authentication includes email and password encryption for secure login.
- **Model Performance**: Logistic Regression provided 84% accuracy for PCOS prediction, with further refinements planned.

## Testing

We used Google Lighthouse to test performance, accessibility, best practices, and SEO across the platform:
- **Performance**: 93% score, with improvements targeted for faster load times.
- **Accessibility**: Ensures ease of use for all users, including those with disabilities.
- **Best Practices**: Follows web development standards for security and maintainability.
- **SEO**: Optimized for search engines to increase visibility.

![image](https://github.com/user-attachments/assets/56059b81-1563-4a63-a342-cac44bbba89f)
![image](https://github.com/user-attachments/assets/3862f45c-a753-4de6-9cee-d0481f8851ac)
![image](https://github.com/user-attachments/assets/3f437c2f-6616-47a1-8e0a-640dda2c9aa3)
![image](https://github.com/user-attachments/assets/2f40ca2a-0baf-4f51-a041-49b3f4bf2d19)



