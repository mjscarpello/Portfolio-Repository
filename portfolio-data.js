/* Project descriptions, authentic media, and captions. This file also includes the Lab Rat Revolt playable-game entry. */
window.PORTFOLIO_DATA = {
  "projects": [
    {
      "id": "noaa",
      "number": "01",
      "category": "school",
      "page": "school/noaa.html",
      "shortTitle": "Storm damage / NOAA",
      "title": "Predicting Economic Damage from Historical Storm Data",
      "label": "Bellevue University · DSC 450 · Fall Capstone · Project 01",
      "status": "Milestone 3 presented",
      "role": "Data Scientist",
      "period": "Fall 2026",
      "summary": "We tested whether recorded storm characteristics can predict any documented economic damage, rather than confusing frequent storms with costly ones.",
      "takeaway": "Grouping by storm episode reduces leakage. Event type was the strongest predictor, and Random Forest modestly improved on a competitive Logistic Regression model.",
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
      "status": "Milestone 3 complete · recorded presentation",
      "role": "Data Visualizer & Presenter · Group 1",
      "period": "Fall 2026",
      "summary": "I examined where the team’s forecasts worked and where they struggled, then brought the model comparisons, original figures, and research connections together in an educational presentation and interactive reference website.",
      "takeaway": "The fixed 50/50 hybrid led our team models overall (2,006 MWh MAE), but it struggled at peak demand; ERCOT remained the stronger overall benchmark (1,135 MWh MAE). The research website links each conclusion to figures, metrics, sources, and limitations.",
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
          "title": "When demand peaks",
          "alt": "ERCOT mean hourly demand heatmap by month, Central Time.",
          "caption": "Summer afternoons and evenings reach the highest demand; seasonal and hour features are important."
        },
        {
          "src": "figures/ercot-seven-models-mape.png",
          "title": "Benchmark before complexity",
          "alt": "Matched-sample forecast MAPE for ERCOT and six approaches, with operator benchmark at 2.00%.",
          "caption": "F15 · ERCOT day-ahead led at 2.00% MAPE; Weather XGBoost led team models at 4.18%. This is a retrospective comparison."
        },
        {
          "src": "figures/ercot-accuracy-by-demand.png",
          "title": "Accuracy under high demand",
          "alt": "Grouped model mean absolute errors across demand percentile bands, showing large errors for XGBoost at top demand levels.",
          "caption": "F17 · The best model changes with demand conditions. The operator forecast remained most consistent."
        },
        {
          "src": "figures/ercot-mae-by-hour.png",
          "title": "The hourly error pattern",
          "alt": "Bar chart of ERCOT forecast MAE in thousand MWh by local hour.",
          "caption": "F11 · Even the operator forecast has a clear daily pattern in absolute error."
        },
        {
          "src": "figures/ercot-model-error-correlation.png",
          "title": "Why try a blend?",
          "alt": "Scatterplot of signed Weather XGBoost and Rolling SARIMA forecast errors.",
          "caption": "F20 · Error differences motivated an exploratory hybrid rather than assuming the models make identical mistakes."
        },
        {
          "src": "figures/ercot-later-period-blend-mae.png",
          "title": "Test the hybrid on later hours",
          "alt": "Later-period mean absolute errors for simple and weighted blends versus component models and ERCOT.",
          "caption": "F22 · A 50/50 blend beat its components on this retrospective period, but did not surpass ERCOT."
        },
        {
          "src": "figures/ercot-blend-by-demand.png",
          "title": "Where the blend helps",
          "alt": "Comparative MAE of Rolling SARIMA, Weather XGBoost, and two blends across later-period demand bins.",
          "caption": "F23 · A blend trades strengths across load levels; the benefit is not uniform."
        },
        {
          "src": "figures/ercot-hourly-model-mae.png",
          "title": "Different weaknesses at different hours",
          "alt": "Two-panel within-model MAE by hour for Weather XGBoost and Rolling SARIMA.",
          "caption": "F26 · Weather XGBoost and Rolling SARIMA have different time-of-day performance patterns."
        },
        {
          "src": "figures/ercot-season-hour-improvement.png",
          "title": "Season meets time of day",
          "alt": "Paired heatmaps of improvement relative to each model’s own overall error by season and hour.",
          "caption": "F31 · These are within-model deviations, not a direct cross-model scorecard."
        },
        {
          "src": "figures/ercot-actual-vs-operator-forecast.png",
          "title": "Measured demand versus published forecast",
          "alt": "ERCOT observed load and operator predicted load through a week.",
          "caption": "Original notebook output · A close look at the official benchmark and actual hourly demand."
        }
      ],
      "heatmaps": [
        {
          "src": "figures/ercot-seasonal-daily-heatmaps.png",
          "id": "F03A",
          "title": "Daily demand within each season",
          "alt": "Collection of seasonal day-by-hour ERCOT observed-demand heatmaps.",
          "caption": "Observed demand by individual day and local hour. Descriptive, not a model-accuracy result.",
          "kind": "Observed demand"
        },
        {
          "src": "figures/ercot-model-error-heatmap.png",
          "id": "F30",
          "title": "Forecast error by month and hour",
          "alt": "Heatmap of relative forecasting mean absolute error by month and local hour.",
          "caption": "Each model is compared with its own overall error level.",
          "kind": "Forecast error"
        },
        {
          "src": "figures/ercot-season-hour-improvement.png",
          "id": "F31",
          "title": "Forecast error by season and hour",
          "alt": "Paired model-specific relative-error heatmaps grouped by season and local hour.",
          "caption": "Within-model error differences, not a direct cross-model ranking.",
          "kind": "Forecast error"
        }
      ]
    },
    {
      "id": "capstone-three",
      "number": "03",
      "category": "school",
      "page": "school/capstone-three.html",
      "shortTitle": "NYC dry recycling",
      "title": "NYC Dry Recycling Across Communities",
      "label": "Bellevue University · DSC 450 · Fall Capstone · Project 03",
      "status": "Completed team project",
      "role": "Data Wrangler · Group 1",
      "period": "Fall 2026",
      "summary": "Our team analyzed community characteristics and dry recycling collection share across New York City. I prepared and reconciled collection and neighborhood datasets, validating coverage and consistent target definitions.",
      "takeaway": "2025 collection share ranged from 5.1% to 28.4% across districts. Historical performance identified 14 of the 15 lowest-share districts; district-level associations do not establish causation.",
      "skills": [
        "Python",
        "Data wrangling",
        "Data validation",
        "Geographic reconciliation"
      ],
      "figures": [
        {
          "src": "figures/nyc-original-district-map.png",
          "title": "District collection share across NYC",
          "alt": "Original choropleth of 2025 dry recycling collection share, highlighting Bronx CD 2 at 5.1% and Brooklyn CD 6 at 28.4%.",
          "caption": "Original team visualization notebook · Geography across 59 community districts."
        },
        {
          "src": "figures/nyc-original-borough-share.png",
          "title": "Collection share by borough",
          "alt": "Original bar chart comparing dry recycling collection share across five NYC boroughs.",
          "caption": "Original team visualization notebook · Tonnage-weighted borough comparison."
        },
        {
          "src": "figures/nyc-original-income-scatter.png",
          "title": "Income and dry recycling share",
          "alt": "Original scatterplot of median household income versus dry recycling collection share, colored by borough.",
          "caption": "Original team visualization notebook · District-level association, not causation."
        },
        {
          "src": "figures/nyc-original-income-gaps.png",
          "title": "Below income-based expectations",
          "alt": "Original negative residual bar chart identifying ten districts with low actual share relative to income-predicted share.",
          "caption": "Original team visualization notebook · A starting point for further investigation."
        }
      ]
    },
    {
      "id": "amazon-pick",
      "number": "04",
      "category": "school",
      "page": "school/amazon-pick-times.html",
      "shortTitle": "Amazon pick-time analysis",
      "title": "Amazon Package Pick-Time Efficiency",
      "label": "Bellevue University · Applied visualization project",
      "status": "Completed visual report",
      "role": "Researcher & Visualizer",
      "period": "January 2026 analysis",
      "summary": "I used firsthand delivery experience to motivate a simulated workflow, then visualized modeled package search times across package types, bags and routes.",
      "takeaway": "The report’s simulated outputs average 4.2 seconds for boxes and 5.6 for envelopes; the workflow generator encodes bag progress and other assumptions. These are not measured field results.",
      "skills": [
        "R & ggplot2",
        "Violin plots",
        "Rolling averages",
        "Operational data"
      ],
      "figures": [
        {
          "src": "figures/amazon-pick-weekly-comparison.png",
          "title": "How searches changed by week",
          "alt": "Original four-panel mirrored histograms of box and envelope pick-time counts in weeks one to four.",
          "caption": "Original simulation report · Weekly distributions visualize the modeled changes in workflow conditions."
        },
        {
          "src": "figures/amazon-pick-distribution.png",
          "title": "Boxes versus envelopes",
          "alt": "Original violin plots with raw points of pick times, one for boxes and one for envelopes.",
          "caption": "Original simulation report · Modeled mean box pick 4.2 s; envelope 5.6 s, with wider variability for envelopes."
        },
        {
          "src": "figures/amazon-pick-rolling-dashboard.png",
          "title": "A route-level performance signal",
          "alt": "Original line chart of rolling mean pick time over one delivery route, with a 6-second reference and 3.9-second final rolling mean.",
          "caption": "Original simulation report · A twelve-pick rolling mean reached 3.9 s on the modeled route versus a 6 s reference."
        }
      ]
    },
    {
      "id": "amazon-clothing",
      "number": "05",
      "category": "school",
      "page": "school/weather-clothing.html",
      "shortTitle": "Weather-based driver gear",
      "title": "Driver Gear Performance Lab",
      "label": "Bellevue University · DSC 355 · Predictive Analytics",
      "status": "Streamlit prototype · Milestone 5",
      "role": "End-to-end model & app developer",
      "period": "DSC 355 · Spring 2026",
      "summary": "I deployed a tuned Random Forest in Streamlit to recommend a driver shirt category from route and weather conditions, with a transparent explanation of the prediction.",
      "takeaway": "The saved model uses 34 engineered features and reached 0.682 accuracy and 0.662 macro F1 on its held-out evaluation. The synthetic training sample limits real-world claims.",
      "skills": [
        "Python",
        "Streamlit",
        "Random Forest",
        "Weather APIs",
        "Model deployment"
      ],
      "figures": [
        {
          "src": "figures/driver-gear-recommendation.jpg",
          "title": "Clothing recommendation in context",
          "alt": "Screenshot of Driver Gear Performance Lab showing live weather and a Short Sleeve clothing recommendation.",
          "caption": "Actual Streamlit prototype · Prediction, confidence, and a practical gear match."
        },
        {
          "src": "figures/driver-gear-route-weather.jpg",
          "title": "Enter route and live weather",
          "alt": "Screenshot showing ZIP code, delivery area, date, and weather condition inputs in Streamlit.",
          "caption": "Actual interface · Users can load weather or test a manual scenario."
        },
        {
          "src": "figures/driver-gear-probabilities.jpg",
          "title": "What the model considered",
          "alt": "Screenshot of multiclass probabilities and an explanation for a recommended shirt type.",
          "caption": "Prototype · Probability output supports transparent, inspectable model recommendations."
        },
        {
          "src": "figures/driver-gear-feature-check.jpg",
          "title": "Leakage and feature verification",
          "alt": "Screenshot of feature coverage, ordering checks, and evaluation metrics in the app.",
          "caption": "Validation · 34 model inputs are checked; post-outcome clothing fields are excluded."
        },
        {
          "src": "figures/driver-gear-historical-lookup.jpg",
          "title": "Historical route lookup",
          "alt": "Screenshot of filters and bar chart showing comparable route and clothing-choice records.",
          "caption": "Explore training context with route, season, comfort-risk, and clothing filters."
        }
      ]
    },
    {
      "id": "unmc",
      "number": "01",
      "category": "work",
      "page": "work/unmc.html",
      "shortTitle": "UNMC e-learning",
      "title": "Learning Media & Collaboration at UNMC",
      "label": "University of Nebraska Medical Center · E-Learning Internship",
      "status": "Internship project samples",
      "role": "E-Learning Intern",
      "period": "Professional experience",
      "summary": "At UNMC, I worked with educational animation and interactive learning media, combining visual communication, feedback, teamwork, and technical problem-solving.",
      "takeaway": "The goal was clear educational experiences: ideas need to be understandable, interactive when helpful, and usable by real learners.",
      "skills": [
        "Vyond & animation",
        "Articulate 360",
        "Learning media",
        "Team collaboration"
      ],
      "figures": [
        {
          "src": "figures/unmc-animated-analytics.jpg",
          "title": "Animated data storytelling",
          "alt": "Still from a UNMC-branded educational animation featuring charts and an animated presenter.",
          "caption": "Work sample · Educational animation combining narration-friendly visuals and data storytelling."
        },
        {
          "src": "figures/unmc-occupational-therapy.jpg",
          "title": "Occupational therapy animation",
          "alt": "Animated occupational therapy scene showing an instructor and child.",
          "caption": "Work sample · Complex health topics explained through approachable visual sequences."
        },
        {
          "src": "figures/unmc-lymph-node-animation.jpg",
          "title": "Lymph node locations",
          "alt": "UNMC instructional animation explaining lymph node locations through labeled diagrams.",
          "caption": "Work sample · Visual simplification for medical and health-science learning."
        },
        {
          "src": "figures/unmc-lab-rat-interface.jpg",
          "title": "Lab Rat Escape learning game",
          "alt": "Screenshot of an interactive medical terminology game menu titled Lab Rat Escape.",
          "caption": "Work sample · A game interface designed around medical terminology practice."
        },
        {
          "src": "figures/unmc-lab-rat-question.jpg",
          "title": "Practice through interaction",
          "alt": "Screenshot of Lab Rat Escape multiple-choice question explaining anemia.",
          "caption": "Work sample · Feedback and quiz interaction inside a game-like scenario."
        },
        {
          "src": "figures/unmc-lab-rat-gameplay.jpg",
          "title": "Game-based learning scene",
          "alt": "Screenshot of a rat and human character in a medical-themed arcade gameplay environment.",
          "caption": "Work sample · Interactive gameplay introduces a different way to approach memorization."
        }
      ]
    },
    {
      "id": "lab-rat",
      "number": "02",
      "category": "work",
      "page": "work/lab-rat-revolt.html",
      "shortTitle": "Lab Rat Revolt",
      "title": "Lab Rat Revolt — Medical Terminology Game",
      "label": "UNMC · Interactive Learning Media",
      "status": "Playable game export",
      "role": "E-learning development",
      "period": "2024–2025 project materials",
      "summary": "An interactive medical terminology game combining assessment, game state, and object-based interaction logic.",
      "takeaway": "My first experience thinking about how named objects, variables, and event-driven logic can organize a larger interactive system.",
      "skills": [
        "Storyline 360",
        "Interactive learning",
        "Game-state logic",
        "JavaScript animations",
        "Medical education"
      ],
      "figures": [
        {
          "src": "figures/unmc-lab-rat-gameplay.jpg",
          "title": "Game-based learning scene",
          "alt": "Gameplay screen featuring an animated rat and human character with game elements.",
          "caption": "Original game frame · Character-based interaction in the medical terminology adventure."
        },
        {
          "src": "figures/unmc-lab-rat-question.jpg",
          "title": "Terminology challenge",
          "alt": "Game screen displaying a multiple-choice question about anemia.",
          "caption": "Original game frame · Medical terminology question with interactive answer options."
        },
        {
          "src": "figures/unmc-lab-rat-interface.jpg",
          "title": "Game menu and progression",
          "alt": "Game interface with level and objectives displayed.",
          "caption": "Original game frame · Progress-oriented interface for a learning adventure."
        }
      ]
    },
    {
      "id": "mini-bookmaker",
      "number": "01",
      "category": "personal",
      "page": "personal/mini-bookmaker.html",
      "shortTitle": "Mini Bookmaker",
      "title": "Mini Bookmaker",
      "label": "Personal project · Creative publishing",
      "status": "Working prototype · v2.1 · Source available",
      "role": "Independent software developer & maker",
      "period": "Independent work",
      "summary": "I developed a native Swift macOS tool that turns PDFs into printable, ring-bound miniature books. Physical prototypes inspired a cut-and-stack imposition algorithm and adaptive binding guides.",
      "takeaway": "Automating reading order, duplex sheet layout and adaptive punch geometry makes a physical production workflow easier to inspect and repeat.",
      "skills": [
        "Swift / SwiftUI",
        "PDFKit",
        "Page imposition",
        "Computational geometry",
        "Regression testing",
        "Print workflow"
      ],
      "figures": [
        {
          "src": "figures/minibook-photo-0555.jpg",
          "title": "Color diagrams in a miniature book",
          "alt": "Open miniature book with printed text and colored diagrams on both pages.",
          "caption": "Original project photograph · The printed interior preserves diagrams as well as text."
        },
        {
          "src": "figures/minibook-photo-0540.jpg",
          "title": "Handmade illustrated cover",
          "alt": "The miniature ring-bound Data Science for Business book lying on a wooden table, with an illustrated handmade cover.",
          "caption": "Original project photograph · A finished book makes the digital layout problem tangible."
        },
        {
          "src": "figures/minibook-photo-0548.jpg",
          "title": "Ring binding up close",
          "alt": "Close side view of the metal rings and miniature book cover.",
          "caption": "Original project photograph · Ring binding lets individual leaves turn independently; hole alignment matters."
        },
        {
          "src": "figures/minibook-imposition-preview.jpg",
          "title": "Print-ready sheet preview",
          "alt": "MiniBook Maker 2.1 shows a front sheet with four mini pages arranged for printing, cutting, and assembly.",
          "caption": "Working prototype · A physical imposition preview with front/back sheet navigation."
        },
        {
          "src": "figures/minibook-photo-0541.jpg",
          "title": "A book in hand",
          "alt": "The illustrated miniature book held in a hand, with the rings visible.",
          "caption": "Original project photograph · The original photograph gives a sense of the physical scale."
        },
        {
          "src": "figures/minibook-photo-0545.jpg",
          "title": "Reading the finished book",
          "alt": "The project author holding and looking at a miniature book.",
          "caption": "Original project photograph · An actual use of the completed physical prototype."
        },
        {
          "src": "figures/minibook-photo-0552.jpg",
          "title": "The closed book and leaf stack",
          "alt": "A closed plain-card-covered miniature book showing two metal rings and a stack of leaves.",
          "caption": "Original project photograph · The book's thickness creates a binding constraint, not just a page-layout constraint."
        },
        {
          "src": "figures/minibook-photo-0557.jpg",
          "title": "Technical diagrams in print",
          "alt": "Open miniature book containing technical diagrams and printed text, held flat by a hand.",
          "caption": "Original project photograph · Technical material in a compact physical format."
        },
        {
          "src": "figures/minibook-photo-3861.jpg",
          "title": "Two physical book examples",
          "alt": "Two finished ring-bound miniature books on a work surface.",
          "caption": "Original project photograph · Different physical examples document the personal experiment."
        },
        {
          "src": "figures/minibook-photo-3648.jpg",
          "title": "Four pages on a printed sheet",
          "alt": "A printed letter-size sheet with four miniature page areas before cutting.",
          "caption": "Original project photograph · A photograph of the printed intermediate output before the individual leaves are assembled."
        },
        {
          "src": "figures/minibook-page-selector.jpg",
          "title": "Select and arrange pages",
          "alt": "MiniBook Maker 2.1 shows a visual page picker with selected PDF page thumbnails.",
          "caption": "Working prototype · Page selection and order control before building the booklet."
        }
      ]
    },
    {
      "id": "studio-s",
      "number": "02",
      "category": "personal",
      "page": "personal/studio-s.html",
      "shortTitle": "Studio S",
      "title": "Studio S — Code-Driven Presentation Studio",
      "label": "Personal project · Creative software",
      "status": "Active prototype development",
      "role": "Designer & Developer",
      "period": "Independent work",
      "summary": "I am developing a desktop presentation editor that coordinates code-defined scenes, visuals, narration, captions, and a shared timeline.",
      "takeaway": "Real prototype screenshots show a multitrack timeline, editable scene inspector, and graph-backed presentation design. More ambitious AI orchestration remains in development.",
      "skills": [
        "Electron",
        "JavaScript",
        "Canvas",
        "Timeline orchestration"
      ],
      "figures": [
        {
          "src": "figures/studio-s-timeline.jpg",
          "title": "Visual editor and timeline",
          "alt": "Studio S application interface showing a scene composition, named cues, multitrack timeline, and scene inspector.",
          "caption": "Working prototype · Scenes, named cues, and audiovisual timing share one timeline."
        },
        {
          "src": "figures/studio-s-forecast-scene.jpg",
          "title": "A real ERCOT presentation scene",
          "alt": "Studio S editing interface showing a forecasting model comparison slide within a multitrack timeline.",
          "caption": "Working prototype · The editor is used to assemble visuals from the DSC 450 ERCOT project."
        }
      ]
    }
  ],
  "pillars": [
    {
      "id": "school",
      "number": "01",
      "name": "School",
      "heading": "Testing ideas",
      "description": "Models, data preparation, and visual explanations developed through coursework and practical questions.",
      "collection": "school/index.html",
      "featured": "ercot"
    },
    {
      "id": "work",
      "number": "02",
      "name": "Work",
      "heading": "Learning from people",
      "description": "Healthcare learning media, interactive education, and hands-on experience with how people use systems.",
      "collection": "work/index.html",
      "featured": "unmc"
    },
    {
      "id": "personal",
      "number": "03",
      "name": "Personal",
      "heading": "Building for curiosity",
      "description": "Independent software and creative tools developed through building, testing, and revising.",
      "collection": "personal/index.html",
      "featured": "mini-bookmaker"
    }
  ]
};
