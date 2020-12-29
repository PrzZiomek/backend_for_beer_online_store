import { Request, Response } from "express";
import sinon, { SinonStub } from 'sinon';
import { expect } from "chai";
import jwt from 'jsonwebtoken';

import { isAuth } from '../middleware/isAuth';
 


it("should throw an error if no authorization with header occurs", function(){
    const req: Partial<Request> = {
         get: function(){
             return undefined;
         }
    };
    const res: Partial<Response> = {};
    expect(isAuth.bind(this, <Request>req, <Response>res, () => {})).to.throw("Not authenticated") 
});

it("should throw an error if the authorization header is only one string", function(){
    const req: Partial<Request> = {
        get: function(){
            return "abc";
        }
   };
   const res: Partial<Response> = {};
   expect(isAuth.bind(this, <Request>req, <Response>res, () => {})).to.throw()
})

it("should throw an error if the token cannot be verified", function(){
    const req: Partial<Request> = {
        get: function(){
            return "Bearer abc";
        }
   };
   const res: Partial<Response> = {};
   expect(isAuth.bind(this, <Request>req, <Response>res, () => {})).to.throw()
})

it("token should has a iat property", function(){
    const req: Partial<Request> = {
        get: function(){
            return "Bearer dfgsgtrjngcrhnjhcds";
        }
   };
   sinon.stub(jwt, "verify")
   jwt.verify.returns({tokenIat: 123}) 
   const res: Partial<Response> = {};
   isAuth(<Request>req, <Response>res, () => {});
   expect(req).to.have.property("tokenIat");
   expect(jwt.verify.called).to.be.true;
   jwt.verify.restore();
})