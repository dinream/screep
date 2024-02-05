/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rule.builder');
 * mod.thing == 'a thing'; // true
 */
var roleUtils = require('role.utils');

var getArrayIndex = require('getindex');
var roleBuilder = {


    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if(creep.memory.building) {
            // 优先找建筑
            if(roleUtils.buildConstructure(creep)) {
                creep.say('b2b');
            }else if(roleUtils.transferSource(creep)){  // 其次保存资源
                creep.say('b2t');
            }else{
                creep.say("b2u");                       // 再其次升级
                roleUtils.upgradeRoom(creep);
            }
	    }
	    else { // 拿资源
            creep.say('b2h');
	        roleUtils.harvestSource(creep);
	    }
	}
};

module.exports = roleBuilder;