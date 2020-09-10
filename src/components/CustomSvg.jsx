import React from 'react'

export const CustomSvg = ({ name="plus", width = "50", height = "50", color = "#000" }) => {

    const data = {
        home: {
            viewBox:"0 0 512 512",
            d:"M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179L400 64 352 64 352 133",
            strokeWidth:"32"
        },
        timer: {
            viewBox:"0 0 24 24",
            d: "M12 21.5a8 8 0 100-16 8 8 0 000 16zM10 2.5h4M12 9v5l3 2",
            strokeWidth:"1.5"
        },
        search: {
            viewBox:"0 0 512 512",
            d: "M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64zM338.29 338.29L448 448",
            strokeWidth:"32"
        },
        star: {
            viewBox:"0 0 24 24",
            d:"M11 3.19a1.08 1.08 0 012.06 0l1.86 5.72h6a1.09 1.09 0 01.64 2l-4.87 3.53 1.86 5.73a1.08 1.08 0 01-1.67 1.21L12 17.81l-4.87 3.54a1.08 1.08 0 01-1.67-1.21l1.86-5.73-4.87-3.53a1.09 1.09 0 01.64-2h6L11 3.19z",
            strokeWidth:"1.5"
            
        },
        signIn: {
            viewBox:"0 0 512 512",
            strokeWidth:"32",
            d: "M192 176v-40a40 40 0 0140-40h160a40 40 0 0140 40v240a40 40 0 01-40 40H240c-22.09 0-48-17.91-48-40v-40M288 336L368 256 288 176M80 256L352 256",
            
        },
        register: {
            viewBox:"0 0 24 24",
            d: "M3 21l.79-2.88C5.1 13.39 8.55 11 12 11M12 10.98a5 5 0 100-10 5 5 0 000 10zM17 23a5 5 0 100-10 5 5 0 000 10zM15 18h4M17 16v4",
            strokeWidth:"1.5"
            
        },
        plus: {
            viewBox:"0 0 24 24",
            d: "M20 12H4M12 20V4",
            strokeWidth:"1.5"
            
        },
        fingerPrint: {
            viewBox:"0 0 24 24",
            d: "M22 16.6V18M2 18v-6A10 10 0 0112 2v0a10 10 0 0110 10v1.55M7 16.32V12a5 5 0 015-5v0a5 5 0 015 5v9M7 21v-2.17M12 11v5M12 19v3",
            strokeWidth:"1.5"
            
        },
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={data[`${name}`].viewBox}
        >
            <path
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={data[`${name}`].strokeWidth}
                d={data[`${name}`].d}
            ></path>
        </svg>
    );
}