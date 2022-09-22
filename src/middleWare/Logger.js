/* eslint-disable */
export const logger = () => next => action => {
  try {
    if (__DEV__) {
      let color = 'black';
      if (action.type.includes('Success')) {
        color = 'green';
      }
      if (action.type.includes('Error')) {
        color = 'red';
      }
      if (action.type.includes('Skipped')) {
        color = 'orange';
      }
      console.group(`%c ${action.type}`, `color: ${color}`);
      console.info('payload', action.payload);
      console.groupEnd();
    }
  } catch (_e) {}

  return next(action);
};
