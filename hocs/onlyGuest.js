import React from 'react';

import User  from '../utils/User';


export default (Page, defaultRedirect = '/') =>
{
    return class OnlyGuest extends React.Component
    {   
        static async getInitialProps (ctx)
        {
            const { req, res, query, pathname } = ctx;
            const user = User.get(req);

            // if (user != null)
            // { 
            //     const href = encodeURIComponent(Route.href(req));
            //    Route.redirect(res, `${defaultRedirect}`);
            //      Route.redirect(res, `${defaultRedirect}?redirect=${href}`);
               
            // }



            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
                query,
                pathname,
                user,
            }
        }

        constructor (props)
        {
            super (props);

            this.state = 
            {
                user: this.props.user,
            }

            this.unsubscribes = [];
        }

        componentDidMount ()
        {   
            const auth = firebase.auth();
            
            this.unsubscribes[0] = auth.onIdTokenChanged (async user =>
            {
        
                 if (user)
                 {
                    const idToken = await user.getIdToken();

                    this.setState(
                        { 
                            user: 
                            {
                                idToken:            idToken,
                                uid:                user.uid,
                                displayName:        user.displayName,
                                email:              user.email,
                                photoURL:           user.photoURL,
                                role:               '',
                            } 
                        });
                        
                        User.set (idToken, user.uid, user.displayName , user.email, user.photoURL,'');
             
                }
                else
                {
                    User.unset ();
                    auth.signOut ();

                    this.setState(
                        { 
                            user: null
                        }
                    );
                    
                // const href = encodeURIComponent(Route.href(null));
                // Route.redirect(null, `${defaultRedirect}?redirect=${href}`);
                 
                }


            });
        }


        componentWillUnmount ()
        {
            this.unsubscribes.forEach(unsubscribe =>
            {
                if(unsubscribe)
                {
                    unsubscribe ();
                }
            })
        }

        render ()
        {
            return <Page {...this.props} user={this.state.user} />
        }
    }
}