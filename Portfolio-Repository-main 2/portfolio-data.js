/*
  PORTFOLIO CONTENT — edit this file when project figures become available.
  Never add an image filename unless that exact original plot is present in figures/.
  Text and numbers are based on the cited DSC 450 work; avoid claiming pending work is completed.
*/
window.PORTFOLIO_DATA = {
  projects: [
    {
      id: 'noaa', number: '01',
      title: 'Predicting Economic Damage from Severe Weather',
      shortTitle: 'NOAA storm impact',
      label: 'Classification / NOAA Storm Events',
      status: 'Milestone 3 presented',
      role: 'Data Scientist · Group 1',
      period: 'October 2026',
      page: 'project-noaa.html',
      summary: 'Can recorded storm characteristics predict whether a weather event is associated with any recorded economic damage?',
      takeaway: 'Frequency is not a substitute for risk. Event type contained the strongest predictive signal among the tested features.',
      skills: ['Python', 'pandas', 'scikit-learn', 'Logistic regression', 'Random forest'],
      figures: [
        { src: 'figures/noaa-event-frequency.png', title: 'Event frequency versus recorded damage',
          alt: 'Original horizontal bar chart showing the 15 most frequent NOAA storm types, the total count of each type and the smaller number with recorded economic damage.',
          caption: 'Original team figure. Storm frequency and the presence of recorded damage are different measures.' },
        { src: 'figures/noaa-economic-damage.png', title: 'Total recorded damage by event type',
          alt: 'Original chart ranking the top ten NOAA storm types by total recorded property and crop economic damage, in billions of dollars.',
          caption: 'Original team figure. Less frequent hurricane events account for the largest aggregate recorded losses.' },
        { src: 'figures/noaa-precision-recall.png', title: 'Precision–recall model comparison',
          alt: 'Original precision–recall curves comparing logistic regression and random forest predictions of any recorded storm damage.',
          caption: 'Original team model-evaluation plot. Average Precision complements ROC-AUC for the imbalanced outcome.' },
        { src: 'figures/noaa-feature-importance.png', title: 'What the model used most',
          alt: 'Original random-forest permutation-importance chart comparing contributions of event type, region, duration, and season.',
          caption: 'Original team figure. Feature importance measures predictive association, not causation.' }
      ]
    },
    {
      id: 'ercot', number: '02',
      title: 'Forecasting ERCOT Electricity Demand',
      shortTitle: 'ERCOT demand forecasting',
      label: 'Time series / Electricity grid',
      status: 'Capstone analysis in progress',
      role: 'Data Visualizer & Presenter · Group 1',
      period: 'October 2026',
      page: 'project-ercot.html',
      summary: 'How do recent demand, daily and seasonal cycles, and weather relate to one-day-ahead hourly electricity forecasts?',
      takeaway: 'Useful forecasting is about the decision time, the forecast horizon, and the errors that matter during high-demand hours.',
      skills: ['Python', 'pandas', 'Time series', 'SARIMA / SARIMAX', 'XGBoost', 'Visualization'],
      // Add the actual notebook exports here AFTER placing those files in figures/.
      // Example:
      // { src: 'figures/ercot-hour-month-heatmap.png', title: 'Seasonality by hour and month',
      //   alt: 'Actual heatmap of average ERCOT electricity demand by month and hour.',
      //   caption: 'Original chart exported from the final DSC 450 Project 2 notebook.' }
      figures: []
    },
    {
      id: 'recycling', number: '03',
      title: 'Recycling Contamination Risk Predictor',
      shortTitle: 'Recycling contamination',
      label: 'Applied classification / Environmental systems',
      status: 'Planned capstone project',
      role: 'Data Wrangler · Group 1',
      period: 'Upcoming',
      page: 'project-recycling.html',
      summary: 'Investigating how available material and collection characteristics might identify contamination risk in recycling systems.',
      takeaway: 'A useful classification system needs a clear contamination definition, trustworthy source data, and measurable error trade-offs.',
      skills: ['Data quality', 'Feature preparation', 'Classification planning', 'Evaluation'],
      // Only populate when Project 3 analysis and original charts are ready.
      figures: []
    }
  ]
};
