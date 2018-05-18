import { MAP } from 'actions';

class Map {

  static FurnishClass = {
    initFurnishClass: (furnishClass) => {
      return {
        type: MAP.INIT,
        furnishClass
      };
    }
  }
}

export default Map;
