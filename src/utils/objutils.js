import _ from 'lodash';

export const getValuesFromObj = (obj) => {
    return _.first(_.values(obj));
}

export const getDescStatus = (status) => {
    switch(status) {
        case 'done':
            return "Pronto";
        case 'confirmed':
            return "Aberto";
        case 'opened':
            return "Pedindo";
        case 'canceled':
            return "Cancelado";
        case 'canceled_by_admin':
            return "Recusado";
        default:
            return "Nao contemplado";
    }
    return "";
}