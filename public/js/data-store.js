let instance;
class DataStore {
  constructor() {
    if (instance) {
      return instance;
    }
    this.eyeOpenDuration = 0;
    this.eyeCloseDuration = 0;
    this.resetEyeCloseDuration = () => {
      this.eyeCloseDuration = 0;
      sessionStorage.setItem("close-duration", this.eyeCloseDuration);
    };
    this.getEyeOpenScore = () => {
      return Math.ceil(this.eyeOpenDuration / 60);
    };
    this.addEyeCloseDuration = () => {
      this.eyeCloseDuration += 1;
      sessionStorage.setItem("close-duration", this.eyeCloseDuration);
      if (this.eyeCloseDuration > 30 * 60 * 60) {
        location.href = "/broken.html";
      }
    };
    this.addEyeOpenDuration = () => {
      this.eyeOpenDuration += 1;
      sessionStorage.setItem("open-score", this.getEyeOpenScore());
    };
    instance = this;
  }
}

export { DataStore };
