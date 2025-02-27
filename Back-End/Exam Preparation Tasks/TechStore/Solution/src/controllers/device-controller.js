import { Router } from "express";

import { isAuth } from "../middlewares/auth-middleware.js";
import deviceService from "../services/device-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const deviceController = Router();


// ----------------------- CREATE PAGE--------------------------- 
deviceController.get('/create', isAuth, (req, res) => {
    res.render('device/create');
});

deviceController.post('/create', isAuth, async (req, res) => {

    const deviceData = req.body;
    const creatorID = req.user.id;

    try {
        const newDevice = await deviceService.create(deviceData, creatorID);

    } catch (err) {
        const currentError = getErrorMessage(err);

        return res.render('device/create', { error: currentError, device: deviceData })
    };


    res.redirect('catalog');
});

// ----------------------- CATALOG PAGE--------------------------- 

deviceController.get('/catalog', async (req, res) => {

    const devices = await deviceService.getAllDevices();

    res.render('catalog', { devices });
});


// ----------------------- DETAILS PAGE--------------------------- 
deviceController.get('/:deviceId/details', async (req, res) => {

    const deviceId = req.params.deviceId;  //Get current device ID
    const device = await deviceService.getOne(deviceId); // Get one device

    const isOwner = req.user && req.user.id === device.owner.toString();   // if have NO user (return false), if have user and his id is equal to owner id of device (return true)
    const isPreferred = device.preferredList.includes(req.user?.id);

    res.render('device/details', { device, isOwner, isPreferred });

});


//  Prefer functionality
deviceController.get('/:deviceId/prefer', isAuth, async (req, res) => {

    const deviceId = req.params.deviceId;
    const userId = req.user.id

    try {
        await deviceService.prefer(deviceId, userId);

        res.redirect(`/devices/${deviceId}/details`)

    } catch (err) {

        res.render('404', { error: getErrorMessage(err) });
    };
});

// Delete functionality
deviceController.get('/:deviceId/delete', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id

    try {
        await deviceService.removeDevice(deviceId, userId);

        res.redirect('/devices/catalog');

    } catch (err) {

        res.render('404', { error: getErrorMessage(err) })
    };
});

// ----------------------- EDIT PAGE---------------------------
deviceController.get('/:deviceId/edit', isAuth, async (req, res) => {
    // get current device
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);

    const userId = req.user.id;
    if (!device.owner.equals(userId)) {

        return res.render('404')
    };

    // Render edit page
    res.render('device/edit', { device });
});

deviceController.post('/:deviceId/edit', isAuth, async (req, res) => {

    const deviceId = req.params.deviceId;
    const userId = req.user.id;
    const deviceData = req.body;

    try {
        await deviceService.update(deviceId, userId, deviceData);

        res.redirect(`/devices/${deviceId}/details`);

    } catch (err) {
        const error = getErrorMessage(err);

        res.render('device/edit', { device: deviceData, error })
    };


});



export default deviceController;