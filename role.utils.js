
// 添加一个工具类 
var roleUtils = {
    harvestSource: function(creep) {
        var sources = creep.room.find(FIND_SOURCES); 
        // creep.say(parseInt(creep.id.slice(-1), 16)); 转换为  2进制
        if(sources.length>0){
            let des_id = parseInt(creep.id.slice(-1), 16) % sources.length;
            if(creep.memory.role == 'harvester'||creep.memory.role == 'charger') {
                // creep.memory.state = "transfer";
                des_id =1;
            }
            else if(creep.memory.role == 'builder'||creep.memory.role == 'upgrader') {    
                des_id =0;
            }
            if(creep.harvest(sources[des_id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[des_id]);
            }
        }
        return 0;
    },
    transferSource: function(creep){
        // 找一个需要能量的 母巢或者扩展 
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length > 0) {
            for(let i=0;i<targets.length;i++){
                if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[i], {visualizePathStyle: {stroke: '#ffffff'}});
                    return true;
                }
            }
        }
        // 找一个 容器 进行存放
        
        // creep.say('hahahaha');
        var targetss = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)&&structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targetss.length > 0) {
            for(let i=0;i<targetss.length ;i++)
            {
                // console.log(targets.length);
                if(creep.transfer(targetss[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targetss[i], {visualizePathStyle: {stroke: '#ffffff'}});
                    return true;
                }
            }
        }
        return false;
    },
    upgradeRoom: function(creep){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            return true;
        }
        return false;
    },
    buildConstructure: function(creep){
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length > 0) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },
    transferTower:function(creep){ // 为炮台充能
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length > 0) {
            for(let i=0;i<targets.length;i++){
                if(creep.transfer(targets[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[i], {visualizePathStyle: {stroke: '#ffffff'}});
                    break;
                }
            }
            return true;
        }
        return false;
    }
};


module.exports = roleUtils;	  