var roleUtils = require('role.utils');

var roleCharger = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() == 0 && creep.memory.state == 0) {
            creep.memory.state = 1 ;
        }
        if(creep.store.getUsedCapacity()==0){
            creep.memory.state = 0 ;
        }
	    if(creep.memory.state == 0) { // 没有能量 先获取能量
            creep.say('c2h');
            roleUtils.harvestSource(creep);
        }
        else{
            if(roleUtils.transferTower(creep)){
                creep.say('c2c');
            }
            else if(roleUtils.transferSource(creep)){
                creep.say('c2t');
            }
            else if(roleUtils.upgradeRoom(creep)){
                creep.say('c2u');
            }
        } 
	}
};

module.exports = roleCharger;