import preloaderStyles from "./preloader.module.css";

function Preloader({ pageLoader }) {
  return (
    <>
      {pageLoader ? (
        <div className={preloaderStyles.preloader}>
          <div className={preloaderStyles.initial}>
            <div className={preloaderStyles.circle}></div>
          </div>
        </div>
      ) : (
        <div className={preloaderStyles.preloaderButton}>
          <div className={preloaderStyles.initialButton}>
            <div className={preloaderStyles.circleButton}></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Preloader;
