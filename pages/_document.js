import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document 
{
    static getInitialProps ({ renderPage }) 
    {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags }
    }

    render () 
    {
        const { styleTags } = this.props;
        
        return (
            <html lang="th">
                <Head>

                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="theme-color" content="#ffffff" />

                    <title>MAZSA QUIZ</title>

                    <link rel="icon" type="image/png" href="/static/MAZSA-icon.png" sizes="96x96"></link>
                    {/* <!-- favicon-16x16.png - The classic favicon, displayed in the tabs. --> */}
                    <link rel="icon" type="image/png" href="/static/MAZSA-icon.png" sizes="16x16"/>
                    {/* <!-- favicon-32x32.png - For Safari on Mac OS. --> */}
                    <link rel="icon" type="image/png" href="/static/MAZSA-icon.png" sizes="32x32"/>

                    <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js"></script>
                    <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase-auth.js"></script>
                    <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase-database.js"></script>
                    <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase-firestore.js"></script>
                    <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase-functions.js"></script>
                    <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase-storage.js"></script>

                    {/* <link href="https://fonts.googleapis.com/css?family=Montserrat|Prompt" rel="stylesheet"/> */}
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:500,700|Prompt:300,500" rel="stylesheet" crossOrigin="anonymous" />
                    <link href="/static/style.css" rel="stylesheet"/>

                    <script src="/static/js/facebook.js"></script>
                    <script src="/static/js/firebase.js"></script>

                    {styleTags}

                </Head>
                <body >
               
                    <Main />
                    <NextScript />

                </body>
            </html>
        )
    }
}

export default MyDocument