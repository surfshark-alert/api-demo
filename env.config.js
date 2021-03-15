process.env.ALERT_PORT = 3000;
process.env.ALERT_API_BASE = 'https://surfsharkalert.com/api';
process.env.ALERT_X_API_KEY = process.env.ALERT_X_API_KEY || '';
process.env.ALERT_X_API_TOKEN = process.env.ALERT_X_API_TOKEN || '';

//Rate limit variables
process.env.ALERT_RL_WINDOW = process.env.ALERT_RL_WINDOW || 3600000; //1 hour window
process.env.ALERT_RL_MAX = process.env.ALERT_RL_MAX || 10;

