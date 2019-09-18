import user from './user'
import _ from 'lodash'

const target =  function () {
    const base = 'api/';
    const urls = {
        point: 'points'
    };
    return _.transform(urls,(r,v,k) => {
        r[k] = base + v;
    }, {});
}();

Object.assign(target, user);

export default target;


// export const apiAddress = p => instance.post('api/v1/users/my_address/address_edit_before', p);
