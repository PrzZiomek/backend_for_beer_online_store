import { Request, Response } from "express";
import { isAuth } from "../../middleware/isAuth";
import jwt from 'jsonwebtoken';



describe("isAuth middleware tests", () =>{

    it("should throw an error if no authorization with header occurs", () => {
         const req = {
            get:() => null,           
        } as unknown as Request;
        const res = {} as Response; 
        function expectedErr(){
            isAuth(req, res, () => {})
         } 
        expect(expectedErr).toThrowError();
    });

    it("should throw an error if authorization header is only one string", () => {
        const req = {
            get: () => "abc"
        } as unknown as Request;
        const res = {} as Response;
        function expectedErr(){
            isAuth(req, res, () => {})
        }
        expect(expectedErr).toThrowError();
    })

    it("should has a iat property", () => {
        const { verify } = jwt as jest.Mocked<typeof import("jsonwebtoken")>;
   //        verify.mockReturnValue({tokenIat: 123})
    })
})
