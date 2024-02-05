/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rule.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleUtils = require('role.utils');

var roleHarvester = {
        
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getUsedCapacity()==0){
            creep.memory.state = 0 ;// 0 表示获取能量
        }else if(creep.store.getFreeCapacity() == 0 &&creep.memory.state == 0){
            creep.memory.state = 1 ; // 1 表示需要使用能量
        }
        // 开始判断工作
        // 找能量
        if(creep.memory.state == 0 ){
            roleUtils.harvestSource(creep);
        }else if(creep.memory.state == 1 ){
            if(roleUtils.transferSource(creep)){
                creep.say('h2t');
            }
            else if(roleUtils.transferTower(creep)){
                creep.say('h2c');
            }  
            else if(roleUtils.buildConstructure(creep)) {
                creep.say('h2b');
            }else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('h2u')
                creep.moveTo(creep.room.controller);
            }
           
        }
	}
};

module.exports = roleHarvester;