import Disaster from "../models/Disaster.js";


const create = (disasterData, userId) => {

    const newDisaster = Disaster.create({
        ...disasterData,
        year: Number(disasterData.year),
        owner: userId
    });

    return newDisaster;
};

const getAll = () => Disaster.find({});
const getOne = (disasterId) => Disaster.findById(disasterId);

const interested = async (disasterId, userId) => {
    const disaster = await getOne(disasterId);

    if (disaster.owner.equals(userId)) {
        throw new Error('You can not be interested in own event!')
    };

    disaster.interestedList.push(userId);
    return disaster.save();
}

const remove = async (disasterId, userId) => {
    const currentDisaster = await getOne(disasterId);

    if (!currentDisaster.owner.equals(userId)) {
        throw new Error('Only the creator can delete this event!')
    };

    return Disaster.findByIdAndDelete(disasterId);
};

const update = async (disasterId, userId, newData) => {
    const currentDisaster = await getOne(disasterId);

    if (!currentDisaster.owner.equals(userId)) {
        throw new Error('Only the creator can modify this event!')
    };

    return Disaster.findByIdAndUpdate(disasterId, newData, { runValidators: true });
};

const search = (filter = {}) => {

    let query = Disaster.find({});

    if (filter.name) {
        query = query.find({ name: { $regex: filter.name, $options: 'i' } });
    }

    if (filter.type) {
        query = query.find({ type: { $regex: filter.type, $options: 'i' } });
    }

    return query;
};

const disasterService = {
    create,
    getAll,
    getOne,
    interested,
    remove,
    update,
    search
};

export default disasterService;