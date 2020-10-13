import React from 'react'
import Router from 'next/router'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) 
  {
    if(res)
    {

      res.writeHead(302, {
        Location: '/'
      })
      res.end()
      res.finished = true
      // if(res.statusCode == 404 || res.statusCode == 500)
      // {
         
      // }
      
      // const statusCode = res ? res.statusCode : err ? err.statusCode : null;
      // return { statusCode }
    }
    else{
        Router.replace('/');
    }
  
    return {}
  }

  render() {
    return null
  }
}