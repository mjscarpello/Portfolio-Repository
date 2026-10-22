/* Project descriptions, authentic figure paths, and captions. Edit here first. */
window.PORTFOLIO_DATA = {
  "projects": [
    {
      "id": "noaa",
      "number": "01",
      "category": "school",
      "page": "school/noaa.html",
      "shortTitle": "Storm damage / NOAA",
      "title": "Predicting Economic Damage from Severe Weather",
      "label": "Bellevue University · DSC 450 · Fall Capstone · Project 01",
      "status": "Milestone 3 presented",
      "role": "Data Scientist · Group 1",
      "period": "Fall 2026",
      "summary": "We tested whether recorded storm characteristics can predict any documented economic damage, rather than confusing frequent storms with costly ones.",
      "takeaway": "A grouped storm-episode split reduces leakage; event type was the strongest predictor. Random Forest reached 0.880 ROC-AUC and 0.669 Average Precision on the reported evaluation.",
      "skills": [
        "Python",
        "Logistic regression",
        "Random Forest",
        "NOAA data"
      ],
      "figures": [
        {
          "src": "figures/noaa-event-frequency.png",
          "title": "Frequency is not the same as damage",
          "alt": "Original horizontal bar chart of the 15 most frequent storm-event types, showing total events and events with reported damage.",
          "caption": "Original Group 1 figure: common events and damaging events tell different stories."
        },
        {
          "src": "figures/noaa-economic-damage.png",
          "title": "Recorded dollars by storm type",
          "alt": "Original Group 1 horizontal bar chart showing the top ten storm types by total economic damage, in billions of dollars.",
          "caption": "Hurricane events contribute the largest recorded total even though they are less frequent."
        },
        {
          "src": "figures/noaa-precision-recall.png",
          "title": "Precision–recall comparison",
          "alt": "Original model precision–recall curves for storm economic-damage classification.",
          "caption": "Average Precision is reported alongside ROC-AUC because the positive class is relatively uncommon."
        },
        {
          "src": "figures/noaa-feature-importance.png",
          "title": "What contributes to prediction",
          "alt": "Original permutation-importance chart of event type, region, storm duration, and season.",
          "caption": "Event type provided the strongest predictive signal; importance is not causation."
        }
      ]
    },
    {
      "id": "ercot",
      "number": "02",
      "category": "school",
      "page": "school/ercot.html",
      "shortTitle": "ERCOT grid demand",
      "title": "Forecasting Regional Electricity Demand",
      "label": "Bellevue University · DSC 450 · Fall Capstone · Project 02",
      "status": "Milestone 2 visual analysis",
      "role": "Data Visualizer & Presenter · Group 1",
      "period": "Fall 2026",
      "summary": "I visualized when Texas electricity demand peaks and where forecasting models succeed or struggle across season, hour, and demand level.",
      "takeaway": "Weather XGBoost was the strongest individual team model on 8,640 matched hours; the operator forecast remained more accurate. A post-hoc SARIMA/XGBoost blend provided an additional testable insight.",
      "skills": [
        "Python",
        "Time series",
        "SARIMA",
        "XGBoost",
        "Forecast evaluation"
      ],
      "figures": [
        {
          "src": "figures/ercot-demand-month-hour.png",
          "title": "Demand by month and hour",
          "alt": "Heatmap of observed ERCOT demand in thousands of MWh by month and local hour, with strong summer-afternoon peaks.",
          "caption": "F03 · Saved notebook output. Summer afternoon and evening hours consistently carry higher demand."
        },
        {
          "src": "figures/ercot-seasonal-daily-heatmaps.png",
          "title": "Daily patterns across four seasons",
          "alt": "Four-panel seasonal heatmaps of individual calendar days against local hour of day, displayed on a shared demand scale.",
          "caption": "F03A · A shared color scale reveals variation that monthly averages can hide."
        },
        {
          "src": "figures/ercot-historical-monthly-demand.png",
          "title": "The long view of electricity demand",
          "alt": "Line graph of average reported hourly ERCOT demand by month from 2022 through 2026.",
          "caption": "F01 · Historical trend and recurring seasonality suggest useful calendar structure."
        },
        {
          "src": "figures/ercot-actual-vs-operator-forecast.png",
          "title": "Observed demand versus reported forecast",
          "alt": "One-week time-series comparison of observed ERCOT demand and the published operator forecast.",
          "caption": "F11 · The forecast shown is ERCOT’s published benchmark, not a team-developed model."
        },
        {
          "src": "figures/ercot-seven-models-mae.png",
          "title": "Seven approaches, common evaluation hours",
          "alt": "Horizontal bar chart of mean absolute forecast error for seven forecast series on a matched 8,640-hour sample.",
          "caption": "F14 · ERCOT had the lowest MAE; Weather XGBoost led the team-model series. Forecast vintages require additional comparability auditing."
        },
        {
          "src": "figures/ercot-model-error-correlation.png",
          "title": "Do two models make the same mistakes?",
          "alt": "Scatterplot of signed forecasting errors from Rolling SARIMA and Weather XGBoost.",
          "caption": "F20 · Unequal error patterns motivated an exploratory combination of existing predictions."
        },
        {
          "src": "figures/ercot-blend-validation-weights.png",
          "title": "Choosing an exploratory blend weight",
          "alt": "Line chart of forecast MAE versus SARIMA blend weight on an earlier evaluation period.",
          "caption": "F21 · We explored weights using an earlier period, reserving later hours for a separate assessment."
        },
        {
          "src": "figures/ercot-later-period-blend-mae.png",
          "title": "Testing the blend on later hours",
          "alt": "Bar chart of later-period mean absolute errors for ERCOT day-ahead, a 50/50 blend, a weighted blend, Rolling SARIMA, and Weather XGBoost.",
          "caption": "F22 · On 4,320 later hours, the simple 50/50 blend lowered MAE versus its components, but still trailed ERCOT."
        },
        {
          "src": "figures/ercot-peak-week-comparison.png",
          "title": "A real high-demand week",
          "alt": "Original notebook case study showing multiple forecasts against observed hourly demand over a summer week.",
          "caption": "F24 · A real week makes timing and peak-miss patterns visible beyond one aggregate score."
        },
        {
          "src": "figures/ercot-model-error-heatmap.png",
          "title": "Where model error departs from usual",
          "alt": "Paired month-by-hour heatmaps showing where Rolling SARIMA and Weather XGBoost errors are above or below their respective overall MAE.",
          "caption": "F30 · These are relative within-model differences, not a direct ranking of the two models."
        }
      ]
    },
    {
      "id": "capstone-three",
      "number": "03",
      "category": "school",
      "page": "school/capstone-three.html",
      "shortTitle": "Capstone project three",
      "title": "DSC 450 — Project 3",
      "label": "Bellevue University · DSC 450 · Fall Capstone · Project 03",
      "status": "Project placeholder",
      "role": "Group 1 · Role to be confirmed",
      "period": "Fall 2026",
      "summary": "Reserved for the third project in Bellevue University’s DSC 450 Fall Capstone course. Topic, methods, and results will be added when confirmed.",
      "takeaway": "Project details and original figures will appear here after the project begins.",
      "skills": [
        "DSC 450",
        "Fall capstone",
        "Coming soon"
      ],
      "figures": []
    },
    {
      "id": "amazon-pick",
      "number": "04",
      "category": "school",
      "page": "school/amazon-pick-times.html",
      "shortTitle": "Amazon package pick times",
      "title": "Finding the Package: A Driver’s Data",
      "label": "Bellevue University · Applied visualization project",
      "status": "Case study in preparation",
      "role": "Researcher & Visualizer",
      "period": "Coursework / firsthand observations",
      "summary": "I turned my experience as an Amazon delivery driver into timing data, examining how package type and organization affect the time needed to find a delivery.",
      "takeaway": "The useful insight is not only average pick time, but variability: different packages and storage conditions create different levels of friction.",
      "skills": [
        "R",
        "ggplot2",
        "Observed workflow data",
        "Exploratory visualization"
      ],
      "figures": []
    },
    {
      "id": "amazon-clothing",
      "number": "05",
      "category": "school",
      "page": "school/weather-clothing.html",
      "shortTitle": "Weather → clothing predictor",
      "title": "Weather-Based Delivery Clothing Predictor",
      "label": "Bellevue University · DSC 355 · Predictive Analytics",
      "status": "Course project · prototype",
      "role": "Predictive modeling & application",
      "period": "Bellevue University coursework",
      "summary": "A classification prototype explored how weather and delivery conditions could inform clothing choices for a driver before a shift.",
      "takeaway": "The modeling workflow demonstrates feature design and evaluation, but its user-created synthetic training data cannot validate real-world accuracy.",
      "skills": [
        "Predictive analytics",
        "Classification",
        "Feature engineering",
        "Synthetic data"
      ],
      "figures": []
    },
    {
      "id": "unmc",
      "number": "01",
      "category": "work",
      "page": "work/unmc.html",
      "shortTitle": "UNMC e-learning",
      "title": "Learning Media & Collaboration at UNMC",
      "label": "University of Nebraska Medical Center · E-Learning Internship",
      "status": "Portfolio material being collected",
      "role": "E-Learning Intern",
      "period": "Professional experience",
      "summary": "A work portfolio documenting instructional animation, educational media, collaboration, and technical contributions from my UNMC internship.",
      "takeaway": "The focus is on how communication, teamwork, and technology help turn complex information into useful learning experiences.",
      "skills": [
        "Animation",
        "Instructional media",
        "Team collaboration",
        "Creative technology"
      ],
      "figures": []
    },
    {
      "id": "studio-s",
      "number": "01",
      "category": "personal",
      "page": "personal/studio-s.html",
      "shortTitle": "Studio S",
      "title": "Studio S — Code-Driven Presentation Studio",
      "label": "Personal project · Creative software",
      "status": "Active prototype development",
      "role": "Designer & Developer",
      "period": "Independent work",
      "summary": "I am building a presentation editor where code, timelines, narration, and visual elements work together to make reproducible audiovisual presentations.",
      "takeaway": "The core engineering challenge is synchronizing assets and animations to one authoritative timeline while keeping projects editable.",
      "skills": [
        "Electron",
        "JavaScript",
        "Canvas",
        "Timeline orchestration"
      ],
      "figures": []
    },
    {
      "id": "mini-bookmaker",
      "number": "02",
      "category": "personal",
      "page": "personal/mini-bookmaker.html",
      "shortTitle": "Mini Bookmaker",
      "title": "Mini Bookmaker",
      "label": "Personal project · Creative publishing",
      "status": "Work in progress",
      "role": "Creative design & prototyping",
      "period": "Independent work",
      "summary": "A personal experiment in small-format publishing, exploring how ideas, text, and imagery can become printable miniature books.",
      "takeaway": "The design problem is both visual and practical: making a small collection of pages easy to arrange, print, and share.",
      "skills": [
        "Page layout",
        "Creative tools",
        "Printable media",
        "Prototyping"
      ],
      "figures": []
    }
  ]
};
