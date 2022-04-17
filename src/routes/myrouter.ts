import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import imageResizer from '../middlewares/image-resizer';

const router = express.Router();

router.get('/images', (req: Request, res: Response): void => {
  const { imagename, width, height } = req.query;

  // Inspect if the imagename is provided with its extension or not
  if (!imagename) {
    res.send('You should send your imagename query parameter');
  } else if (!(imagename as string).split('.')[0]) {
    res.send('You should send your imagename');
  } else if ((imagename as string).split('.')[1] != 'jpg') {
    res.send('Your image extension should be jpg');
  } else {
    const oldImagePath = path.join(
      __dirname,
      '..',
      '..',
      'my-images',
      `${imagename}`
    );
    const newImageName =
      (imagename as string).split('.')[0] + `_${width}×${height}.jpg`;
    const newImagePath = path.join(
      __dirname,
      '..',
      '..',
      'processed-images',
      newImageName
    );

    // Search if the image is processed before or not
    if (fs.existsSync(newImagePath)) {
      res.sendFile(newImagePath);
    }

    // Make sure the desired image is included in 'my imagges' folder
    else if (!fs.existsSync(oldImagePath)) {
      res.send('Sorry, invalid input for filename');
    }

    // Make sure that width & height are provided
    else if (!width && !height) {
      res.send(
        'You should provide your width & height query parameters together'
      );
    } else if (!width || !height) {
      res.send('You should provide your width or height query parameter');
    } else if (
      parseInt(width as string) <= 0 ||
      parseInt(height as string) <= 0
    ) {
      res.send('Sorry, invalid width or height');
    }

    // Resizing the image
    else {
      imageResizer(
        imagename as string,
        width as string,
        height as string,
        newImagePath
      )
        .then(() => {
          res.sendFile(newImagePath);
        })
        .catch((err) => console.log(err));
    }
  }
});

export default router;
