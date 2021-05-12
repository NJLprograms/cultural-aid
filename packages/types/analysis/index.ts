import { google } from '@google-cloud/vision/build/protos/protos';

export interface ImageAnalysisResults
  extends google.cloud.vision.v1.IWebDetection {}

export interface WebEntity
  extends google.cloud.vision.v1.WebDetection.IWebEntity {}

export interface WebImage
  extends google.cloud.vision.v1.WebDetection.IWebImage {}

export interface WebPage extends google.cloud.vision.v1.WebDetection.IWebPage {}

export interface WebLabel
  extends google.cloud.vision.v1.WebDetection.IWebLabel {}

export interface VisionWebDetectionResponse
  extends google.cloud.vision.v1.IAnnotateImageResponse {}
