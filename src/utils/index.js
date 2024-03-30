//@ts-nocheck
export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const getDaysRemaining = (timestamp) => {
  const currentDate = new Date();

  const milliseconds = timestamp * 1000;

  const targetDate = new Date(milliseconds);

  const difference = targetDate.getTime() - currentDate.getTime();

  const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return daysRemaining;
};
