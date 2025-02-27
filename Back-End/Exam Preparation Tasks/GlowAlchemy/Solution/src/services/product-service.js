import Product from "../models/Product.js";


const create = (productData, creatorId) => {

    const newProduct = Product.create({
        ...productData,
        price: Number(productData.price),
        owner: creatorId
    });

    return newProduct;
};

const getLatest = () => {

    const latestProducts = Product.find({}).sort({ createdAt: 'desc' }).limit(3);
    return latestProducts
};

const getAll = () => Product.find({});

const getOne = (productId) => Product.findById(productId);

const recommed = async (productId, userId) => {
    const product = await getOne(productId);

    if (product.owner.equals(userId)) {
        throw new Error('The creator cannot recommend own product!')
    };

    if (product.recommendList.includes(userId)) {
        throw new Error('You have already recommended this product!')
    };

    product.recommendList.push(userId);
    return product.save();
};

const remove = async (productId, userId) => {
    const product = await getOne(productId);

    if (!product.owner.equals(userId)) {
        throw new Error('Only creator can delete this product!')
    };

    return Product.findByIdAndDelete(productId);
};

const update = async (productId, newData, userId) => {
    const product = await getOne(productId);

    if (!product.owner.equals(userId)) {
        throw new Error('Only creator can modify this product!')
    };

    return Product.findByIdAndUpdate(productId, newData, { runValidators: true })
};

const search = async (filter = {}) => {

    let query = await getAll();

    if (filter.productName) {
        query = await Product.find({ name: { $regex: filter.productName, $options: 'i' } });
    };

    return query;
};

const productService = {
    create,
    getLatest,
    getAll,
    getOne,
    recommed,
    remove,
    update,
    search
};

export default productService;