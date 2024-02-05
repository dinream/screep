/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('getindex');
 * mod.thing == 'a thing'; // true
 */

var getArrayIndex = {
    run: function (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -2;
}
};
module.exports = getArrayIndex;