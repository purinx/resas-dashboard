import * as classes from './ErrorScreen.css';

export const ErrorScreen = () => {
  return (
    <div className={classes.errorScreen}>
      <h1 className={classes.oops}>Oops!</h1>
      <p className={classes.message}>Something went wrong.</p>
    </div>
  );
};
