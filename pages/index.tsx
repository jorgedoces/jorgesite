import GlobalStyle from '../components/global-style';
import { Title } from '../components/styled';
import { getBrandEntries, getProductEntries } from '../utils/contentful';
import { NextFunctionComponent } from 'next';
import { EntryCollection } from 'contentful';
import { Head } from 'next/document';
import { IBrand, IProduct } from '../utils/interfaces';



interface IProps {
  brands: EntryCollection<IBrand>;
  products: EntryCollection<IProduct>;
}

const Index: NextFunctionComponent<IProps> = ({ brands, products }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Jorge Doces</title>
        <meta key="viewport" name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
  const brands = await getBrandEntries();
  const products = await getProductEntries();

  return { brands, products };
};

export default Index;
