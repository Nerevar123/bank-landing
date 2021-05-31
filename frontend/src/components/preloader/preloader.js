import preloaderStyles from "./preloader.module.css";

function Preloader() {
  return (
    <div className={preloaderStyles.preloader}>
      <div className={preloaderStyles.initial}>
        <div className={preloaderStyles.circle}></div>
      </div>
    </div>
  );
}

export default Preloader;
