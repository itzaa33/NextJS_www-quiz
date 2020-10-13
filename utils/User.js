import jsCookie from 'js-cookie'

function set (idToken, uid, displayName,  email, photoURL, role)
{
    if (!process.browser) 
    {
        return;
    }
    // Client-Side
    jsCookie.set('idToken', idToken);
    jsCookie.set('uid', uid);
    jsCookie.set('displayName', displayName);
    jsCookie.set('email', email);
    jsCookie.set('photoURL', photoURL);
    jsCookie.set('role', role);
}

function unset ()
{
    if (!process.browser) 
    {
        return;
    }

    // Client-Side
    jsCookie.remove('idToken');
    jsCookie.remove('uid');
    jsCookie.remove('displayName');
    jsCookie.remove('email');
    jsCookie.remove('photoURL');
    jsCookie.remove('role');
}

function getValue (cookies, key)
{
    const value = cookies.find(c => c.trim().startsWith(key + '='));

    if (!!value)
    {
        const actualValue = value.split('=')[1];

        if (!!actualValue && actualValue !== 'null')
        {
            return actualValue;
        }
    }

    return null;
}

function get (req)
{
    if (req)
    {
        // Server-Side
        if (!req.headers.cookie)
        {
            return null;
        }

        const cookies = req.headers.cookie.split(';');
        const idToken = getValue (cookies, 'idToken');

        if (!idToken)
        {
            return null;
        }
        
        return {
            uid:                getValue (cookies, 'uid'),
            displayName:        getValue (cookies, 'displayName') || getValue (cookies, 'email'),
            email:              getValue (cookies, 'email'),
            photoURL:           getValue (cookies, 'photoURL'),
            role:               getValue (cookies, 'role'),
        }
    }
    else
    {
        // Client-Side
        const idToken = jsCookie.get('idToken');
        
        if (!idToken)
        {
            return null;
        }

        return {
            uid:                jsCookie.get ('uid'),
            displayName:        jsCookie.get ('displayName') ,
            email:              jsCookie.get ('email'),
            photoURL:           jsCookie.get ('photoURL'),
            role:               jsCookie.get ('role'),
        }
    }
}

export default 
{
    set,
    unset,
    get,
}