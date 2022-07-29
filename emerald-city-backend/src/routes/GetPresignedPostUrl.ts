import * as api from '../types/api/Core.js';

import * as s3 from '../util/aws-wrapper.js';

export async function GetPresignedPostUrl(req, res) {
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
