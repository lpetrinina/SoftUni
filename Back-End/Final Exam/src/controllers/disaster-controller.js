import { Router } from "express";

import { isAuth } from "../middlewares/auth-middleware.js";
import disasterService from "../services/disaster-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const disasterController = Router();

disasterController.get('/create', isAuth, (req, res) => {

    const disasterTypes = getDisasterTypeViewData({});

    res.render('disasters/create', { types: disasterTypes })
});

disasterController.post('/create', isAuth, async (req, res) => {
    const disasterData = req.body;
    const userId = req.user.id;

    try {
        await disasterService.create(disasterData, userId);

        res.redirect('/disasters/catalog')

    } catch (err) {
        const error = getErrorMessage(err)
        const disasterTypes = getDisasterTypeViewData(disasterData);

        res.render('disasters/create', { error, disaster: disasterData, types: disasterTypes });
    };

});

function getDisasterTypeViewData({ type }) {

    const disasterTypes = [
        "Wildfire",
        "Flood",
        "Earthquake",
        "Hurricane",
        "Drought",
        "Tsunami",
        "Other"
    ];

    const viewData = disasterTypes.map(typeDisaster => ({
        value: typeDisaster,
        label: typeDisaster,
        selected: typeDisaster === type ? 'selected' : '',
    }));

    return viewData;
};


disasterController.get('/catalog', async (req, res) => {

    const disasters = await disasterService.getAll();

    res.render('disasters/catalog', { disasters });
});

disasterController.get('/:disasterId/details', async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user?.id;
    const currentDisaster = await disasterService.getOne(disasterId);

    const isOwner = currentDisaster.owner.equals(userId);
    const isInterested = currentDisaster.interestedList.includes(userId);

    res.render('disasters/details', { disaster: currentDisaster, isOwner, isInterested });
});

disasterController.get('/:disasterId/interestedIn', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user.id;

    try {
        await disasterService.interested(disasterId, userId);

        res.redirect(`/disasters/${disasterId}/details`)

    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    }
});


disasterController.get('/:disasterId/delete', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user.id;

    try {
        await disasterService.remove(disasterId, userId);

        res.redirect('/disasters/catalog');

    } catch (err) {
        res.render('404', { error: getErrorMessage(err) })
    };

});

disasterController.get('/:disasterId/edit', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user.id;
    const currentDisaster = await disasterService.getOne(disasterId);
    const disasterTypes = getDisasterTypeViewData(currentDisaster);


    if (!currentDisaster.owner.equals(userId)) {
        return res.render('404', { error: 'Only the creator of the event can modify it!' })
    };

    res.render('disasters/edit', { disaster: currentDisaster, types: disasterTypes })
});

disasterController.post('/:disasterId/edit', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const userId = req.user.id;
    const newData = req.body;


    try {
        await disasterService.update(disasterId, userId, newData);

        res.redirect(`/disasters/${disasterId}/details`)

    } catch (err) {
        const error = getErrorMessage(err);
        const disasterTypes = getDisasterTypeViewData(newData);

        res.render('disasters/edit', { error, disaster: newData, types: disasterTypes })
    };

});

disasterController.get('/search', async (req, res) => {
    const filter = req.query;

    const filteredEvents = await disasterService.search(filter);


    res.render('disasters/search', { disasters: filteredEvents })
});

export default disasterController;