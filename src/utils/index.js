import { genKeyPairFromSeed, SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

export const portal = 'https://siasky.net/';

export const secretKey = "secretkey";
export const dataKey = "skynetgram-datakey-dev";
export const dataDomain = "skynetgram-datadomain-dev";
export const imageUploadFilepath = dataDomain + "/image";

export const client = new SkynetClient(portal);

export const contentRecord = new ContentRecordDAC();

export const publicKey = genKeyPairFromSeed(secretKey).publicKey;
export const privateKey = genKeyPairFromSeed(secretKey).privateKey;

export const uploadFile = async (file) => {
  const { skylink } = await client.uploadFile(file);
  const skylinkUrl = await client.getSkylinkUrl(skylink);
  return { skylink, skylinkUrl };
}

export const noop = () => {};
