import Document, { NextDocumentContext /*, Head, Main, NextScript*/ } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    console.log("----- args -----", arguments);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}


// export default class JorgeDocument extends Document {
//   static getInitialProps(ctx: NextDocumentContext) {
//     const sheet = new ServerStyleSheet();

//     try {
//       const page = ctx.renderPage(App => props =>
//         sheet.collectStyles(<App {...props} />)
//       );
//       const styleTags = sheet.getStyleElement();
//       return { ...page, styleTags };
//     } finally {
//       sheet.seal();
//     }

//   }

//   render() {
//     return (
//       <html>
//         <Head>
//           <meta charSet="utf-8" />
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1, shrink-to-fit=no"
//           />
//           {this.props.styleTags}
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     );
//   }
// }
