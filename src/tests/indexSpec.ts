import app from '../index';
import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import imageResizer from '../middlewares/image-resizer';

const request = supertest(app);

describe('testing the endpoint is responsing', () => {
  it('if there are no errors and the new resized image is created in (processed-images) folder, test succeeds', (done: (
    error?: unknown
  ) => void) => {
    const imageURL = path.join(
      __dirname,
      '..',
      '..',
      'processed-images',
      'encenadaport_300×200.jpg'
    );

    request
      .get('/api/images?imagename=encenadaport.jpg&width=300&height=200')
      .expect(200)
      .end((error) => {
        if (error) {
          return done(error);
        }
        expect(fs.existsSync(imageURL)).toBeTruthy();
        return done();
      });
  });
});

describe('testing if the image is resied to the new dimensions or not', () => {
  it('After resizing you should see the resized image in (processed-images) folder ', () => {
    const imageName = 'fjord.jpg';
    const imageWidth = 400;
    const imageHeight = 300;
    const newURL = path.join(
      __dirname,
      '..',
      '..',
      'processed-images',
      `${imageName}_${imageWidth}×${imageHeight}.jpg`
    );

    expect(async () => {
      await imageResizer(
        imageName,
        (imageWidth as unknown) as string,
        (imageHeight as unknown) as string,
        newURL
      );
    }).not.toThrow();
  });
});
