import { Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import { VerificationPage } from "../components/VerificationPage";
import { VerificationWrapper } from "../components/VerificationWrapper";
import { BookView } from "../pages/BookView";

// const URLS = {
//     ROOT: '/',
//     LOGIN: '/login',
//     LOGOUT: '/logout',
//     SIGNUP: '/signup',
//     SIGNUP_VERIFICATION: '/signup/verification',
//     NOT_FOUND: '/404',
//     CALLBACK_AUTH: '/api/auth/:authtype/redirect'
// };


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <><App /></>,
        children: [
            {
                path: `/books/categories/:category`,
                element: <BookView></BookView>
            }
        ]
    },
    {
        path: '/verify',
        element: <VerificationPage></VerificationPage>
    }
]