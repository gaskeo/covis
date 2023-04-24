import {WithContext} from "./context";
import {WithRouter} from "./router";
import React from "react";

type hoc = (Component: React.ElementType) => React.ElementType;
const compose = (...rest: hoc[]) => {
    return (x: React.ElementType): React.ElementType => {
        return rest.reduceRight((y, f) => f(y), x)
    }

}

export {WithRouter, WithContext, compose};