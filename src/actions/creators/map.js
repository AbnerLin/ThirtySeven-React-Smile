import { MAP } from '../index';

class Map {

  initFurnishClass(furnishClass) {
    return {
      type: MAP.INIT,
      furnishClass
    };
  }

}

export default Map;
