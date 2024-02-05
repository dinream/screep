/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.contain');
 * mod.thing == 'a thing'; // true
 */


var roleContainer = {

   /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.store.getFreeCapacity() > 0) {
            
             var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)&&
                                structure.store[RESOURCE_ENERGY] >=creep.store.getFreeCapacity();
                    }
            });
            //console.log(targets.length+'targets.length');
            //console.log(targets.length);
            if(targets.length > 0) {
                for(let i=0;i<targets.length ;)
                {
                     if(creep.withdraw(targets[i], RESOURCE_ENERGY, creep.store.getFreeCapacity())!=ERR_NOT_ENOUGH_RESOURCES) {
                       	
                        creep.moveTo(targets[i], {visualizePathStyle: {stroke: '#ffaa00'}});
                        break;
                     }
                     else i++;
                     /*creep.harvest(targets[1]);
                     creep.moveTo(targets[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                        break;*/
                    console.log('i:'+i+'xxx'+targets.length);
                    if(i<targets.length)
                     {
                        var sources = creep.room.find(FIND_SOURCES);
                        // var sources = creep.room.find.;
                        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
                
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                    // var sources = creep.room.find.;
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
            }
        }
        else {
            var targetss = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targetss.length > 0) {
                if(creep.transfer(targetss[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetss[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                 creep.memory.upgrading = false;
                creep.say('🔄 harvest');
	            }
	            if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	                creep.memory.upgrading = true;
	                creep.say('⚡ upgrade');
	            }
	           if(creep.memory.upgrading) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }


};

module.exports = roleContainer;