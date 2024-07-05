


function readAuthData(request, response, next){
    let authData = null;
    if (request.body.auth || request.headers.authorization) {
        authData = request.body.auth || request.headers.authorization
    }

    if (authData){
        console.log("Auth data provided: " + authData);
        request.authMiddleware = {};
        request.authMiddleware.data = authData;
        

        next();
    } else {
        response.json({
            message:"Please log in to continue"
        });
    }
}

function verifyAuthData(request, response, next){
    let localCopyAuthData = request.authMiddleware.data;

    console.log(localCopyAuthData);

    next();
}

module.exports = {readAuthData, verifyAuthData};

/*

request comes into the server
match a route
run middleware on route
response once all middleware is done

    instance.verb(
        path,
        middleware01,
            next()
        middleware02,
            next()
        middleware03 ----> response.json()
            next()

        response.json()
    
    )

*/
