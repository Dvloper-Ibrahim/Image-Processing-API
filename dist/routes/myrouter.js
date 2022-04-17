"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var image_resizer_1 = __importDefault(require("../middlewares/image-resizer"));
var router = express_1.default.Router();
router.get('/images', function (req, res) {
    var _a = req.query, imagename = _a.imagename, width = _a.width, height = _a.height;
    // Inspect if the imagename is provided with its extension or not
    if (!imagename) {
        res.send('You should send your imagename query parameter');
    }
    else if (!imagename.split('.')[0]) {
        res.send('You should send your imagename');
    }
    else if (imagename.split('.')[1] != 'jpg') {
        res.send('Your image extension should be jpg');
    }
    else {
        var oldImagePath = path_1.default.join(__dirname, '..', '..', 'my-images', "".concat(imagename));
        var newImageName = imagename.split('.')[0] + "_".concat(width, "\u00D7").concat(height, ".jpg");
        var newImagePath_1 = path_1.default.join(__dirname, '..', '..', 'processed-images', newImageName);
        // Search if the image is processed before or not
        if (fs_1.default.existsSync(newImagePath_1)) {
            res.sendFile(newImagePath_1);
        }
        // Make sure the desired image is included in 'my imagges' folder
        else if (!fs_1.default.existsSync(oldImagePath)) {
            res.send('Sorry, invalid input for filename');
        }
        // Make sure that width & height are provided
        else if (!width && !height) {
            res.send('You should provide your width & height query parameters together');
        }
        else if (!width || !height) {
            res.send('You should provide your width or height query parameter');
        }
        else if (parseInt(width) <= 0 ||
            parseInt(height) <= 0) {
            res.send('Sorry, invalid width or height');
        }
        // Resizing the image
        else {
            (0, image_resizer_1.default)(imagename, width, height, newImagePath_1)
                .then(function () {
                res.sendFile(newImagePath_1);
            })
                .catch(function (err) { return console.log(err); });
        }
    }
});
exports.default = router;
