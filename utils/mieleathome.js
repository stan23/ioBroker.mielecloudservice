
var request = require("request");

var BaseURL = 'https://api.mcs3.miele.com/';

class mieleathome {
    
    log (msg) {
        console.log(msg);
    }
    
    GetToken (Password,Username,Client_ID,Client_Secret,callback) {
        var options = {
        url: 'https://api.mcs3.miele.com/thirdparty/token/',
        method: 'POST',
        form: {grant_type:'password',password:Password,username:Username,client_id:Client_ID,client_secret:Client_Secret,vg:'de-DE'},
        headers: {accept: 'application/json'}
        };
        
        request(options, function (error,response,body) {
                if (response.statusCode==200) {
                var P = JSON.parse(body);
                console.log(P.access_token);
                return callback(false,P.access_token,P.refresh_token);
                }
                else {
                console.warn(response.statusCode+' Login Error !');
                console.warn(response.status);
                return callback(true,null,null);
                }
                }
                )
        
    }
    
    SendRequest (Endpoint,Method,Token,Send_Body,callback){
        
        var options = {
        url: BaseURL+Endpoint,
        method: Method,
        headers: {Authorization: 'Bearer '+Token},
        form:Send_Body
        };
        
        request(options,function (error, response, body){
                console.log(response.statusCode);
                console.log(body);
                switch (response.statusCode){
                case 200: // OK
                return callback(false,JSON.parse(body));
                case 202: //Accepted, processing has not been completed.
                break;
                case 204: // OK, No Content
                return callback(false,null);
                case 400: //Bad Request, message body will contain more information
                return callback(true,null);
                case 401: //Unauthorized
                
/*                var Username = getState('javascript.0.Miele.Authorization.Username').val;
                var Password = getState('javascript.0.Miele.Authorization.Password').val;

                RefreshToken(Username,Password,Token,Application.refresh_token,function(err,access_token,refresh_token){
                             if(!err){
                             Application.Token=access_token;
                             Application.refresh_token=refresh_token;
                             setState('javascript.0.Miele.Authorization.Token',access_token);
                             setState('javascript.0.Miele.Authorization.RefreshToken',refresh_token);
                             console.log('Token erneuert !');
                             SendRequest(Endpoint,Method,Send_Body,function(err,data){
                                         if(!err){return callback(false,data)}
                                         else{return callback(true,null)}
                                         });
                             }
                             else{return callback(true,null);}
                             });
 */
                break;
                default:
                return callback(true,null);
                }
                });
    }
    }

module.exports = mieleathome;

