exports.handler = function(event, context) {
    var AWS = require('aws-sdk');
    AWS.config.region = process.env['REGION'];
    var ec2 = new AWS.EC2();
    
    var params = {
        DryRun: false
    };
    
    var stop_instances = [];
    stop_instances = process.env['STOP_INSTANCES_NAME'].split(",");
    console.log(`stop instances : ${stop_instances}`);

    ec2.describeInstances(params, function (err, data) {
        if (err) {
            console.log("Error", err.stack);
        } else {
            //console.log(data.Reservations[1].Instances[0].Tags[0].Key);
            data.Reservations.forEach(function (reservations, index) {
                reservations.Instances.forEach(function (instances, index) {
                    instances.Tags.forEach(function (tags, index) {
                        stop_instances.forEach(function (instance, index) {
                            if (tags.Key === "Name" && tags.Value === instance) {
                                console.log(`search instance :${instance} instanceId : ${instances.InstanceId}`);
                                var params = {
                                    InstanceIds: [
                                        instances.InstanceId
                                    ]
                                };
                                 ec2.stopInstances(params, function (err, data) {
                                     if (err) console.log(err, err.stack);
                                     else return data;
                                 });
                            }
                        });
                    });
                });
            });
        }
    });
    return 0;
};