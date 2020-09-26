import React from 'react';
import './DetailsInput.scss';


export const DetailsInput = ({ type = "small" }) => {

    return (

        type == "small" ?
            <div className={'small-container'}>
                <input className={'input'} placeholder={'manat'}/>
                <button className={'help'}>?</button>
            </div>
            :
            <div className={"big-container"}>
                <p className={'title'}>City name</p>
                <input className={'input'} type={'text'} placeholder={'City'} />
            </div>
    )
}