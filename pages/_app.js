
import React from 'react'
import App, { Container } from 'next/app'


function redirect ({ req, res })
{
  if (req && res)
  {
    const host = req.headers.host

    if (host.startsWith ('localhost-quiz.now.sh'))
    {
      
    }
    else if (host.match(/^www\..*/i))
    {

    }
    else if (host.startsWith ('localhost-quiz.com'))
    {
      res.writeHead (301, 
        {
          Location: `https://www.${host}${req.url}`
        })

      res.end ()
      res.finished = true
    }
  }
}

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) 
  {
    redirect (ctx)
    
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
     
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>

         <Component {...pageProps} />

      </Container>
    )
  }
}

