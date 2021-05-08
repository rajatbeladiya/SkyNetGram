import { genKeyPairFromSeed, SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

export const secretKey = 'secretkey';
export const dataKey = 'skynetgram-datakey-prod'; 
export const likedataKey = 'skynetgram-likedatakey-prod'; 
export const dataDomain = 'skynetgram-datadomain';
export const imageUploadFilepath = dataDomain + '/image';

export const client = new SkynetClient();

export const contentRecord = new ContentRecordDAC();

export const publicKey = genKeyPairFromSeed(secretKey).publicKey;
export const privateKey = genKeyPairFromSeed(secretKey).privateKey;

export const uploadFile = async (file) => {
  const { skylink } = await client.uploadFile(file);
  const skylinkUrl = await client.getSkylinkUrl(skylink);
  return { skylink, skylinkUrl };
}

export const noop = () => {};
