import { Collections, UserSubcollection } from '@cultural-aid/types/firestore';
import type {
  ImageAnalysisResults,
  VisionWebDetectionResponse,
} from '@cultural-aid/types';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { ImageAnnotatorClient } from '@google-cloud/vision';
import { firebase } from './utils/firebase';

const GCPVision = new ImageAnnotatorClient({
  credentials: {
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

const processFile: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ImageAnalysisResults>
) => {
  const { bucketObject, userId } = req.body;

  const documentPayload = {
    ...bucketObject,
    timeCreated: firebase.firestore.Timestamp.fromMillis(
      bucketObject.timeCreated
    ),
    updated: firebase.firestore.Timestamp.fromMillis(bucketObject.updated),
  };

  const userUploadsSubcollection = firebase
    .firestore()
    .collection(Collections.Users)
    .doc(userId)
    .collection(UserSubcollection.Uploads);

  const request = {
    image: {
      source: {
        imageUri: `gs://${bucketObject.bucket}/${bucketObject.fullPath}`,
      },
    },
    imageContext: {
      webDetectionParams: {
        includeGeoResults: true,
      },
    },
  };

  try {
    const [{ webDetection }]: [
      VisionWebDetectionResponse
    ] = await GCPVision.webDetection(request);

    await userUploadsSubcollection.add({ ...documentPayload, webDetection });

    process.env.NODE_ENV !== 'production' && console.log(webDetection);

    res.status(200).send(webDetection);
  } catch (error) {
    res.status(400).send({ ...error });
  }
};

export default processFile;
