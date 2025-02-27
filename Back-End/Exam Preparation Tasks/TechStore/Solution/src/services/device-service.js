import Device from '../models/Device.js';

const create = (deviceData, creatorID) => {

    const newDevice = Device.create({
        ...deviceData,
        price: Number(deviceData.price),
        owner: creatorID
    });

    return newDevice;
};

const getAllDevices = () => Device.find({});

const getLatest = () => Device.find({}).sort({ _id: 'desc' }).limit(3); //get the last 3 added post

const getOne = (deviceId) => Device.findById(deviceId); // get details by device ID


const prefer = async (deviceId, userId) => {

    const device = await Device.findById(deviceId); // get device

    if (device.owner.equals(userId)) { // check if Owner
        throw new Error('Cannot prefer own offer!');
    };

    if (device.preferredList.includes(userId)) { // check if already preferred
        throw new Error('You have already preferred this offer!')
    };

    device.preferredList.push(userId);  // prefer action
    return device.save();
};

const removeDevice = async (deviceId, userId) => {

    const device = await getOne(deviceId);

    if (!device.owner.equals(userId)) { //check if is owner
        throw new Error('Only owner can delete this offer!')
    };

    return Device.findByIdAndDelete(deviceId);
};


const update = async (deviceId, userId, deviceData) => {

    const device = await getOne(deviceId);

    if (!device.owner.equals(userId)) {
        throw new Error('Only owner can edit this offer!')
    };

    return Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });
};


const getUserDevices = (owner) => Device.find({ owner });

// const getPreferredDevices = (owner) => Device.find({ preferredList: owner }); mongoose way
const getPreferredDevices = (preferredBy) => Device.find({}).in('preferredList', preferredBy); //mongo DB 


const deviceService = {
    create,
    getAllDevices,
    getLatest,
    getOne,
    prefer,
    removeDevice,
    update,
    getUserDevices,
    getPreferredDevices
};

export default deviceService;