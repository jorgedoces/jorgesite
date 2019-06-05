import {
  createClient,
  CreateClientParams,
  ContentfulClientApi,
} from 'contentful';
import { IBrand, IProduct } from './interfaces';

interface IDefaultConfig {
  CTF_SPACE_ID: string;
  CTF_CDA_TOKEN: string;
  CTF_CPA_TOKEN: string;
}
const defaultConfig: IDefaultConfig = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID || '',
  CTF_CDA_TOKEN: process.env.CTF_CDA_TOKEN || '',
  CTF_CPA_TOKEN: process.env.CTF_CPA_TOKEN || '',
};

const createContentfulClient = (config = defaultConfig): ContentfulClientApi => {
  const options: CreateClientParams = {
    host: 'preview.contentful.com',
    space: config.CTF_SPACE_ID,
    accessToken: config.CTF_CPA_TOKEN,
  };

  if (process.env.NODE_ENV === 'production' && !process.env.STAGING) {
    options.host = 'cdn.contentful.com';
    options.accessToken = config.CTF_CDA_TOKEN;
  }

  return createClient(options);
}

const contentfulClient = createContentfulClient();

export function getBrandEntries() {
  return contentfulClient.getEntries<IBrand>({
    content_type: 'brand',
  });
}

export function getProductEntries() {
  return contentfulClient.getEntries<IProduct>({
    content_type: 'product',
  });
}
