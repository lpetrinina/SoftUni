
import { Router } from "express";

import { isAuth } from "../middlewares/auth-middleware.js";
import volcanoService from "../services/volcano-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const volcanoController = Router();

volcanoController.get('/create', isAuth, (req, res) => {
    const volcanoTypes = getVolcanoTypeViewData({});

    res.render('volcanoes/create', { volcanoTypes });
});

volcanoController.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;
    const userId = req.user.id;

    try {
        await volcanoService.create(volcanoData, userId);

        res.redirect('/volcanoes/catalog')
    } catch (err) {

        const error = getErrorMessage(err);
        const volcanoTypes = getVolcanoTypeViewData(volcanoData);

        res.render('volcanoes/create', { error, volcano: volcanoData, volcanoTypes });
    }
});

function getVolcanoTypeViewData({ typeVolcano }) {

    const volcanoTypes = [
        'Supervolcanoes',
        'Submarine',
        'Subglacial',
        'Mud',
        'Stratovolcanoes',
        'Shield'
    ];

    const viewData = volcanoTypes.map(type => ({
        value: type,
        label: type,
        selected: type === typeVolcano ? 'selected' : '',
    }));
    return viewData;
};

volcanoController.get('/catalog', async (req, res) => {

    const volcanoes = await volcanoService.getAll();

    res.render('volcanoes/catalog', { volcanoes });
});

volcanoController.get('/:volcanoId/details', async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user?.id;

    const volcano = await volcanoService.getOne(volcanoId);

    const isOwner = volcano.owner.equals(userId);
    const isVoted = volcano.voteList.includes(userId);


    res.render('volcanoes/details', { volcano, isOwner, isVoted })
});

// Vote 
volcanoController.get('/:volcanoId/vote', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user.id;

    try {
        await volcanoService.vote(volcanoId, userId);

        res.redirect(`/volcanoes/${volcanoId}/details`);
    } catch (err) {

        res.render('404', { error: getErrorMessage(err) });
    };
});

// Delete
volcanoController.get('/:volcanoId/delete', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user.id;

    try {
        await volcanoService.remove(volcanoId, userId);

        res.redirect('/volcanoes/catalog');
    } catch (err) {

        res.render('404', { error: getErrorMessage(err) });
    }

});

volcanoController.get('/:volcanoId/edit', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user.id;

    const volcano = await volcanoService.getOne(volcanoId);
    const volcanoTypes = getVolcanoTypeViewData(volcano);

    if (!volcano.owner.equals(userId)) {
        return res.render('404', { error: 'Only owner can modify this volcano!' })
    };

    res.render('volcanoes/edit', { volcano, volcanoTypes })

});

volcanoController.post('/:volcanoId/edit', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user.id;
    const newData = req.body;
    const volcanoTypes = getVolcanoTypeViewData(newData);

    try {
        await volcanoService.update(volcanoId, userId, newData);

        res.redirect(`/volcanoes/${volcanoId}/details`)
    } catch (err) {
        res.render('volcanoes/edit', { error: getErrorMessage(err), volcano: newData, volcanoTypes })
    }

});

volcanoController.get('/search', async (req, res) => {
    const filter = req.query;
    console.log(filter);

    const filteredVolcanoes = await volcanoService.search(filter);

    res.render('volcanoes/search', { volcanoes: filteredVolcanoes })
});

export default volcanoController;