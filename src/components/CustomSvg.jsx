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
        send: {
            viewBox:"0 0 24 24",
            d: "M19.57 4.014L4.12 9.854a.21.21 0 000 .38l6.61 2.83a.201.201 0 01.11.11l2.83 6.61a.21.21 0 00.303.088.21.21 0 00.078-.088l5.78-15.51a.2.2 0 00-.26-.26v0zM19.78 4.064l-8.98 8.98",
            strokeWidth:"1.5"
            
        },
        cross: {
            viewBox:"0 0 45 45",
            d: "M34.425 34.425l-23.85-23.85M34.425 10.575l-23.85 23.85",
            strokeWidth:"2"
            
        },
        plusCircle: {
            viewBox:"0 0 58 58",
            d: "M29 53.167c13.347 0 24.167-10.82 24.167-24.167 0-13.347-10.82-24.166-24.167-24.166C15.653 4.834 4.834 15.654 4.834 29c0 13.347 10.82 24.167 24.166 24.167zM41.543 29.314H17.376M29.459 41.398V17.23",
            strokeWidth:"1.6"
            
        },
        chervonLeft: {
            viewBox:"0 0 12 24",
            d: "M10.584 1.042L2.02 9.604a2.083 2.083 0 000 2.938l8.333 8.333",
            strokeWidth:"1.5"
            
        },
        camera: {
            viewBox:"0 0 24 24",
            d: "M19.94 6.43H4.06a2 2 0 00-2 2v10.04a2 2 0 002 2h15.88a2 2 0 002-2V8.43a2 2 0 00-2-2zM12.39 16.32a3.16 3.16 0 100-6.32 3.16 3.16 0 000 6.32zM18.45 10.82a.66.66 0 100-1.32.66.66 0 000 1.32zM4.5 3.52h3.92",
            strokeWidth:"1.5"
            
        },
        text: {
            viewBox:"0 0 24 24",
            d: "M4 2h16M12 2v20",
            strokeWidth:"1.5"
            
        },
        link: {
            viewBox:"0 0 512 512",
            d: "M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256L350.71 256",
            strokeWidth:"36"
            
        },
        // text: {
        //     viewBox:"0 0 24 24",
        //     d: "M4 2h16M12 2v20",
        //     strokeWidth:"1.5"
            
        // },
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