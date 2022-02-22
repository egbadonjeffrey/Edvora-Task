import styles from "./NoResults.module.css";

export const NoResults = () => {
  const { no_results } = styles;

  return (
    <div className={no_results}>
      Sorry There Are No Current Rides For Your Choice...
    </div>
  );
};
