/// <reference types="node" />

import * as data from "./build/data.json";

export interface Figma
{
    id: string;
    file: string;
}

export interface Options
{
    "version": string;
    "width": number;
    "height": number;
    "viewBox": string;
    "class": string;
    "aria-hidden": string;
}

export interface Octicon
{
    name: string;
    figma: Figma,
    keywords: string[],
    width: number;
    height: number;
    path: string;
    symbol: string;
    options: Options;
    toSVG: () => string;
}

declare const octicons: { [key in keyof typeof data]:Octicon };
export default octicons;
