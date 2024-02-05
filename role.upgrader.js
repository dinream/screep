var roleUtils = require('role.utils');

// 添加新模块 role.upgrader
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() == 0 && creep.memory.state == 0) {
            creep.memory.state = 1 ;
        }
        if(creep.store.getUsedCapacity()==0){
            creep.say('u2h');
            creep.memory.state = 0 ;
        }
	    if(creep.memory.state == 0) { // 没有能量 先获取能量
            roleUtils.harvestSource(creep);
        }
        else{
            if(roleUtils.upgradeRoom(creep)){
                creep.say('u2u');
            }

        } 
	}
};



module.exports = roleUpgrader;	