import { api } from '../types/api/Core.js';
import { s3 } from '../util/aws-wrapper.js';

export async function GetPresignedPostUrls(req, res) {
  const { bucket, key }: api.GetPresignedPostUrls =
    req.body as api.GetPresignedPostUrls;

  const result = await s3.getPresignedPostUrl(
    bucket,
    'ap-south-1',
    key,
    10 * 60,
  );

  res.send(result);
}
