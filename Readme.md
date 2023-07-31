Requirements
   .Framework & Architectures
        ..Nest or Express (Must be latest)
        .MySQL or PostgreSQL or MongoDB
        .RESTful APIs
        .Redis
        .jQuery or React [Optional]
    .[MUST] Postman collection and environments
    .[Optional] Cloud System Designs Diagram [Use AWS or Azure Based]
        [MUST] Functional Flow Diagram
        [MUST] Database Relational Diagram
    .You have to create two Microservices. 
        .eVoucher Management System
        .Promo Codes Management System
    .You will have to use Authentication to access your API as well as CMS API as well.
        .JWT Token (or)
        .Bearer Token
    .Your token expiry period is one day and a token refresh process is required.

Point System API
    Point system calculates member earning points based on incoming from POS API.
    Point System API is capable of
        1.Calculate point based on POS API incoming request’s item price only for Non Alcohol item.
          (Eg : Total Non  Alcohol item’s purchase price $100 = 10 points)
        2.Add point to member which incoming from POS API’s member code

Mobile API

    Mobile API is for the customer application, members can see their points, total purchased history, available coupon for discount and exchange coupon using.show member QR code to scan at the cashier for the POS system.
        1.Register Member via mobile number verification with OTP code
            a . [Optional] No need to send sms or email really, just save otp code in the database and verify using otp.
        2.Single login which means User A login at Device A and User A login at Device B, Device A will automatically logout.
        3.Member QR Code needs to be displayed with a QR to use at POS systems to scan member QR code.
        4.Members can see the purchase history list.
        5.Members can see total points and use redis cache for quick response points.
        6.Members can exchange points to get coupons like $5, $10 (eg : 500 points => $5 coupon).
          a. Exchange point is only belong to exchange members
        7.Members can see available limited coupons with quantity. (optional use realtime DB for qty eg: firebase realtime DB) and exchange coupon.

Notes:
    1.API is able to handle multiple concurrent requests.
    2.If point system required scheduler to calculate point, need to use due to pos api can pass thousand of request in minute
    3.If you can’t make it in time, please let the associate know. If you want to create awesome things, you need to make sure to finish in time with proper handling. This test also decides the way you develop the system, the way you do analysis of the system.

Submission:
   Have to submit Database Schema + Sample Data.



