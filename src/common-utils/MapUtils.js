import { ReduxStore } from './index';
import _ from 'lodash';

class MapUtils {

  static FurnishClass = {
    getAll: () => {
      return ReduxStore.getState().map.furnishClass;
    },
    getByName: (name) => {
      return _.find(ReduxStore.getState().map.furnishClass, (o) => {
        return name === o.name;
      });
    },
    getById: (id) => {
      return _.find(ReduxStore.getState().map.furnishClass, (o) => {
        return id === o.classid;
      });
    }
  }
}

export default MapUtils;
