import _ from 'lodash';

export const getValuesFromObj = (obj) => {
    return _.first(_.values(obj));
}