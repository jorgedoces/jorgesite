import GlobalStyle from '../components/global-style';
import { Title } from '../components/styled';
import { createClient } from '../utils/contentful';
import { NextFunctionComponent } from 'next';
import { EntryCollection, Entry, Asset } from 'contentful';

interface IProduct {
  title: string;
  brand: Entry<IBrand>;
  categories: Entry<ICategory>[];
  photos: Asset[];
}
interface IBrand {
  name: string;
  url: string;
}
interface ICategory {
  title: string;
}

interface IProps {
  brands: EntryCollection<IBrand>;
  products: EntryCollection<IProduct>;
}

const Index: NextFunctionComponent<IProps> = ({ brands, products }) => {
  return (
    <>
      <GlobalStyle />
      <Title>Jorge Doces</Title>
      <h2>Brands</h2>
      <ul>
        {brands.items.map(b => (
          <li key={b.sys.id}>
            <a href={b.fields.url}>{b.fields.name}</a>
          </li>
        ))}
      </ul>
      <h2>Pruducts</h2>
      <ul>
        {products.items.map(p => (
          <li key={p.sys.id}>
            <h3>{p.fields.brand && p.fields.brand.fields.name}</h3>
            <h4>{p.fields.title}</h4>
            {p.fields.photos &&
              p.fields.photos.map(photo => (
                <img key={photo.sys.id} src={photo.fields.file.url} style={{maxWidth:'30%'}} />
              ))}
          </li>
        ))}
      </ul>
    </>
  );
};

Index.getInitialProps = async () => {
  const client = createClient();

  const brands = await client.getEntries<IBrand>({
    content_type: 'brand',
  });

  const products = await client.getEntries<IProduct>({
    content_type: 'product',
  });

  return { brands, products };
};

export default Index;
