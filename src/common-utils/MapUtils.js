import { ReduxStore } from './index';

class MapUtils {

  static get FurnishClass() {
    return ReduxStore.getState().map.furnishClass;
  }

}

export default MapUtils;
