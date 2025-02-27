import Volcano from "../models/Volcano.js";

const create = (volcanoData, userId) => {

    const newVolcano = Volcano.create({
        ...volcanoData,
        elevation: Number(volcanoData.elevation),
        lastEruption: Number(volcanoData.lastEruption),
        owner: userId,
    });
    return newVolcano;
};

const getAll = () => Volcano.find({});

const getOne = (volcanoId) => Volcano.findById(volcanoId);

const vote = async (volcanoId, userId) => {
    const volcano = await getOne(volcanoId);

    if (volcano.owner.equals(userId)) {
        throw new Error('The creator can not vote own volcano!')
    };

    if (volcano.voteList.includes(userId)) {
        throw new Error('You have already voted for this vocano!')
    };

    volcano.voteList.push(userId);
    return volcano.save();
};

const remove = async (volcanoId, userId) => {
    const volcano = await getOne(volcanoId).select('owner');

    if (!volcano.owner.equals(userId)) {
        throw new Error('Only owner can delete this vocano!')
    };

    return Volcano.findByIdAndDelete(volcanoId);
};

const update = async (volcanoId, userId, newData) => {
    const volcano = await getOne(volcanoId).select('owner');

    if (!volcano.owner.equals(userId)) {
        throw new Error('Only owner can modify this vocano!')
    };

    return Volcano.findByIdAndUpdate(volcanoId, newData, { runValidators: true })
};

const search = (filter = {}) => {
    let query = Volcano.find({});

    if (filter.volcanoName) {
        query = query.find({ name: { $regex: filter.volcanoName, $options: 'i' } })
    };

    if (filter.volcanoType) {
        query = query.find({ typeVolcano: { $regex: filter.volcanoType, $options: 'i' } })
    };

    return query;
};

const volcanoService = {
    create,
    getAll,
    getOne,
    vote,
    remove,
    update,
    search,
};

export default volcanoService;